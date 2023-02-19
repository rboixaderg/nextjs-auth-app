import { Header } from "@/components/Header";
import { securePage } from "@/lib/securePage";
import { withSessionSsr } from "@/lib/withSession";
import styles from "@/styles/Home.module.css";

import Head from "next/head";

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

export const getServerSideProps = withSessionSsr(async function (context) {
  const propsSecurePage = await securePage(context, "/login");
  if ("redirect" in propsSecurePage) {
    return propsSecurePage;
  }

  // Do something to get data from our server
  return propsSecurePage;
});
