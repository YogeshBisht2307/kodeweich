import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/prisma/queries/users";
import { UsersTable } from "./users-table";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kodeweich: Posts",
    description: "Posts"
}

export default async function UsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  const userEntities = await getAllUsers();
  const users = userEntities.map(entity => ({
      ...entity,
      updatedAt: entity.updatedAt.toString(),
      createdAt: entity.createdAt.toString(),
  }));

  return (
    <div className="max-w-6xl px-8 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold pb-4">Users</h1>
      </div>
      <UsersTable users={users} />
    </div>
  );
}
