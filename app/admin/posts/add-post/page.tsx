import Script from "next/script";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AddArticleForm from "./add-form";


export const metadata: Metadata = {
  title: "Kodeweich: Add Post",
  description: "Add Post"
}


export default async function Page() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/sign-in");
  }

  if (!session.user.email) {
    redirect("/admin/sign-in");
  }

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" />
      <div className={`max-w-4xl px-8 mx-auto`}>
        <h1 className={`mb-8 text-4xl sm:text-3xl font-extrabold md:text-4xl`}>
          Create Article
        </h1>
        <ul className={`list-disc sm:mb-8 ml-4 mb-4`}>
          <li className={`font-med md:text-md lg:text-md`}>Use a clear and engaging writing style. Write in a way that is easy to understand, while also using descriptive language to bring your ideas to life</li>
          <li className={`font-med md:text-md lg:text-md`}>Use short paragraphs and subheadings to break up the text and make it easy to read.</li>
          <li className={`font-med md:text-md lg:text-md`}>Write a strong headline that accurately reflects the content of the article and grabs the reader&apos;s attention.</li>
        </ul>
        <AddArticleForm userEmail={session.user.email.toString()} />
      </div>
    </>
  );
};