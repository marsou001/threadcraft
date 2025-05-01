import type { History } from "@/types";
import { getAllGeneratedContentForUser } from "@/drizzle/db/actions";

export default async function getUserHistory(userId: string): Promise<History> {
  let history: History;

  try {
    history = await getAllGeneratedContentForUser(userId);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user history", error.message);
    }
    throw new Error("Error fetching user history");
  }

  return history;
}