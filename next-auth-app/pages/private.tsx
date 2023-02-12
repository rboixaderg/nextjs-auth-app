import { Header } from "@/components/Header";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authOptions } from "./api/auth/[...nextauth]";

export default function PrivatePage() {
  return (
    <>
      <Head>
        <title>Private page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1> Private Page </h1>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
};
