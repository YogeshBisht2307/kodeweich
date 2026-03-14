import { addTagAction } from "@/actions";
import AddModal from "@/components/AddModal";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Posts() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect("/admin/sign-in");
    }

    return (
        <div className="max-w-4xl px-8 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Tags</h1>
                <AddModal 
                    title="Add Tag"
                    description="Add tag here. Click save when you're done."
                    action={addTagAction}
                />
            </div>
        </div>
    )
}