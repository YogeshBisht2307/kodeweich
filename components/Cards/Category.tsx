import Link from "next/link"
import {ICategories } from "../../interfaces"

const Category: React.FC<ICategories> = ({categories}) => {
  return (
    <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
        <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>
          Category
        </h3>
        <div className={`flex flex-col`}>
          {categories.map((category, index) => (
              <Link href={`/blog/categories/${category.slug}`} key={index} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>{category.title}</Link>
          ))}
        </div>
    </div>
  )
}

export default Category;