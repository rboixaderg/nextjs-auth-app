import { Header } from "@/components/Header";
import { getSessionSSR } from "@/lib/getSessionSSR";
import { withSessionSsr } from "@/lib/withSession";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Auth App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1> Home Page </h1>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function (context) {
  const sessionData = await getSessionSSR(context);
  if (sessionData) {
    return {
      props: {
        session: sessionData,
      },
    };
  }
  return {
    props: {
      session: {},
    },
  };
});
