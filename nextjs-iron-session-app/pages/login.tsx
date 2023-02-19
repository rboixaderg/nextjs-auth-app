import { Header } from "@/components/Header";
import { LoginErrorResponse } from "@/errors/errors";
import { useAuth } from "@/hooks/useAuth";
import { getSessionSSR } from "@/lib/getSessionSSR";
import { withSessionSsr } from "@/lib/withSession";
import pageStyles from "@/styles/Home.module.css";
import styles from "@/styles/Login.module.css";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

export const getServerSideProps = withSessionSsr(async function (context) {
  const sessionData = await getSessionSSR(context);
  if (sessionData) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: null,
    },
  };
});
