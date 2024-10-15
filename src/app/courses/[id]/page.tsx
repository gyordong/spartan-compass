import { db } from "@/lib/db";
import { coursesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, Number(params.id)));
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
