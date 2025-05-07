import type { History } from "@/types";
import { getAllGeneratedContentForUser } from "@/drizzle/db/actions";
import assertIsError from "@/utils/assertIsError";

export default async function getUserHistory(id: number): Promise<History> {
  let history: History;

  try {
    history = await getAllGeneratedContentForUser(id);
  } catch (error) {
    assertIsError(error);
    console.log("Error fetching user history", error.message);
    throw new Error("We couldn't get your history, please refresh the page");
  }

  return history;
}