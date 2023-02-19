import { CustomError } from "@/types/global";

export const checkError = async (response: Response) => {
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as CustomError;
    // Attach extra info to the error object.
    error.info = await response.json();
    error.status = response.status;
    return error;
  }
  return null;
};
