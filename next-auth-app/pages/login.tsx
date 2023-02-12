import { Header } from "@/components/Header";
import { LoginErrorResponse } from "@/errors/errors";
import { useAuth } from "@/hooks/useAuth";
import pageStyles from "@/styles/Home.module.css";
import styles from "@/styles/Login.module.css";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authOptions } from "./api/auth/[...nextauth]";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<{
    username: string;
    password: string;
  }>();

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await login({ ...data });
    } catch (err) {
      if (err instanceof LoginErrorResponse) {
        setError(err.message);
      }
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={pageStyles.center}>
          <h1> Login Page </h1>
        </div>
        <div className={styles.signin}>
          <div className={styles.card}>
            <div className={styles.provider}>
              {error && (
                <div className={styles.error}>
                  <p>
                    Sign in failed. Check the details you provided are correct.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div>
                  <label className={styles["section-header"]}>Username</label>
                  <input
                    id="input-username-for-credentials-provider"
                    {...register("username", { required: true })}
                  />
                </div>
                <div>
                  <label className={styles["section-header"]}>Password</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>

                <button id="submitButton">Login</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};
