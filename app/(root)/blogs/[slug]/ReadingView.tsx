import Link from "next/link";

import ArticleWidgetCard from "@/components/ArticleWidgetCard";
import CategoryListCard from "@/components/CategoryListCard";
import TagListCard from "@/components/TagListCard";
import { Button } from "@/components/ui/button";
import { Article, ArticleWidget, Category, Tag } from "@/interfaces";

import ArticleDetail from "./ArticleDetail";

interface ReadingViewProps {
  article: Article;
  relatedArticles: ArticleWidget[];
  categories: Category[];
  tags: Tag[];
  slug: string;
  showSidebar: boolean;
}

const ReadingView = ({ article, relatedArticles, categories, tags, slug, showSidebar }: ReadingViewProps) => {
  const toggleHref = showSidebar ? `/blogs/${slug}?reading_mode=1` : `/blogs/${slug}`;

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button type="button" variant="secondary" asChild>
          <Link href={toggleHref}>{showSidebar ? "Reading Mode On" : "Reading Mode Off"}</Link>
        </Button>
      </div>

      <div className={`grid grid-cols-1 ${showSidebar ? "md:grid-cols-3 md:gap-6" : ""}`}>
        <div className={`${showSidebar ? "col-span-2" : "col-span-1"} relative min-h-screen`}>
          <ArticleDetail article={article} />
        </div>

        {showSidebar && (
          <div className="sticky top-0 h-full">
            <ArticleWidgetCard slug={slug} relatedArticles={relatedArticles} />
            <CategoryListCard categories={categories} />
            <TagListCard tags={tags} />
          </div>
        )}
      </div>
    </>
  );
};

export default ReadingView;
