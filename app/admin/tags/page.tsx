import { addTagAction } from "@/actions";
import AddModal from "@/components/AddModal";
import { getAllTags } from "@/prisma/queries/tags";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TagTable } from "./tag-table";


export default async function Posts() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/admin/sign-in");
    }

    const tags = await getAllTags();

    return (
        <div className="max-w-6xl px-8 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Tags</h1>
                <AddModal 
                    title="Add Tag"
                    description="Add tag here. Click save when you're done."
                    triggerText="Add Tag"
                    triggerVariant="default"
                    action={addTagAction}
                />
            </div>
            <TagTable tags={tags} />
        </div>
    )
}