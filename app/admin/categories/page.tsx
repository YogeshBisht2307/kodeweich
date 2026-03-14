import { addCategoryAction } from "@/actions";
import AddModal from "@/components/AddModal";
import { Button } from "@/components/ui/button";
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
                <h1 className="text-2xl font-semibold pb-4">Categories</h1>
                <AddModal 
                    title="Add Category"
                    description="Add category here. Click save when you're done."
                    action={addCategoryAction}
                />
            </div>
        </div>
    )
}