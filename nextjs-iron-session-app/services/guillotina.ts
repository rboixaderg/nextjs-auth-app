import { IndexSignature } from "@/types/global";
import { checkError as checkErrorFn } from "./error";

interface IfetchGuillotina {
  path?: string;
  method?: string;
  token?: string;
  data?: IndexSignature;
}

export const fetchGuillotina = async ({
  path,
  method,
  data,
  token,
}: IfetchGuillotina) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GUILLOTINA}${
      process.env.NEXT_PUBLIC_GUILLOTINA_DB_ACCOUNT
    }${path ?? ""}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: method ?? "get",
      body: data ? JSON.stringify(data) : null,
    }
  );

  const error = await checkErrorFn(res);
  if (error) {
    throw error;
  }
  return res.status === 204 ? {} : res.json();
};
