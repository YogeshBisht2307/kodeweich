import Link from "next/link"
import { Category } from "@/interfaces";

interface CategoryListCardProps {
    categories: Category[]
}

const CategoryListCard: React.FC<CategoryListCardProps> = ({categories}) => {
  return (
    <div className={`p-6 mb-8 rounded-lg border-2 border-y-secondary border-x-primary bg-card text-card-foreground`}>
        <h3 className={`text-medium sm:text-2xl font-bold w-full pb-4`}>
          Category
        </h3>
        <div className={`flex flex-col`}>
          {categories.map((category, index) => (
              <Link href={`/blogs/categories/${category.slug}`} key={index} className={`max-w-xl py-2 font-sm text-muted-foreground hover:text-card-foreground transition`}>{category.title}</Link>
          ))}
        </div>
    </div>
  )
}

export default CategoryListCard;