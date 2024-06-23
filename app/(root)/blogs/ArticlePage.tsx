"use client";

import React, { Key, useState } from "react"
import { ArticleWidget, Category, Tag } from "@/interfaces";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleWidgetCard from "@/components/ArticleWidgetCard";
import SearchInputCard from "@/components/SearchInputCard";
import CategoryListCard from "@/components/CategoryListCard";
import TagListCard from "@/components/TagListCard";

interface ArticlePageProps {
  articles: ArticleWidget[],
  categories: Category[],
  tags: Tag[]
}


const ArticlePage: React.FC<ArticlePageProps> = ({ articles, tags, categories }) => {
  const [articlesList, setArticleList] = useState<Array<any>>(articles);
  const [searchValue, setSearchValue] = useState<String>("");

  const filterArticles = (value: string) => {
    if (value !== "") {
      const filteredData = articles.filter((article: ArticleWidget) =>
        Object.values(article).join("").toLowerCase().includes(value.toLowerCase())
      );
      setArticleList(filteredData);
    } else {
      setArticleList(articles);
    }
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    filterArticles(value);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.search
    setSearchValue(value);
    filterArticles(value);
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 md:gap-4`}>
      <div className={`col-span-2`}>
        {articlesList && articlesList.map((article: ArticleWidget, index: Key) => (
          <ArticleListCard article={article} key={index} />
        ))}
      </div>
      <div>
        <SearchInputCard value={searchValue} onSearch={onSearch} onSubmit={onSubmit} />
        <ArticleWidgetCard />
        <CategoryListCard categories={categories} />
        <TagListCard tags={tags} />
      </div>
    </div>
  )
}

export default ArticlePage