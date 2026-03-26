import { addCategoryAction } from "@/actions";
import AddModal from "@/components/AddModal";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CategoryTable } from "./category-table";
import { getAllCategories } from "@/prisma/queries/categories";

export default async function Categories() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        redirect("/admin/sign-in");
    }

    const categories = await getAllCategories();

    return (
        <div className="max-w-6xl px-8 mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold pb-4">Categories</h1>
                <AddModal 
                    title="Add Category"
                    description="Add category here. Click save when you're done."
                    triggerText="Add Category"
                    triggerVariant="default"
                    action={addCategoryAction}
                />
            </div>
            <CategoryTable categories={categories} />
        </div>
    )
}