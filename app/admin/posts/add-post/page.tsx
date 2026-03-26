import Script from "next/script";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getAllCategories } from "@/prisma/queries/categories";
import { getAllTags } from "@/prisma/queries/tags";
import AddArticleForm from "./add-form";


export const metadata: Metadata = {
  title: "Kodeweich: Add Post",
  description: "Add Post"
}


export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/sign-in");
  }

  if (!user.email) {
    redirect("/admin/sign-in");
  }

  const categories = await getAllCategories();
  const tags = await getAllTags();
  const categoryOptions = categories.map((cat) => cat.slug);
  const tagOptions = tags.map((tag) => tag.slug);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" defer />
      <div className={`max-w-4xl px-8 mx-auto`}>
        <h1 className={`mb-8 text-4xl sm:text-3xl font-extrabold md:text-4xl`}>
          Create Article
        </h1>
        <ul className={`list-disc sm:mb-8 ml-4 mb-4`}>
          <li className={`font-med md:text-md lg:text-md`}>Use a clear and engaging writing style. Write in a way that is easy to understand, while also using descriptive language to bring your ideas to life</li>
          <li className={`font-med md:text-md lg:text-md`}>Use short paragraphs and subheadings to break up the text and make it easy to read.</li>
          <li className={`font-med md:text-md lg:text-md`}>Write a strong headline that accurately reflects the content of the article and grabs the reader&apos;s attention.</li>
        </ul>
        <AddArticleForm userEmail={user.email.toString()} categoryOptions={categoryOptions} tagOptions={tagOptions} />
      </div>
    </>
  );
};