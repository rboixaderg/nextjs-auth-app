import { GetServerSidePropsContext } from "next";
import { getSessionSSR } from "./getSessionSSR";
export async function securePage(
  context: GetServerSidePropsContext,
  redirect: string
) {
  const sessionData = await getSessionSSR(context);
  if (sessionData === null) {
    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: sessionData,
    },
  };
}
