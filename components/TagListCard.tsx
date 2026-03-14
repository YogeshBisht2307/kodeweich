import Link from "next/link";
import { Tag } from "@/interfaces";

interface TagListCardProps {
    tags: Tag[]
}

const TagListCard: React.FC<TagListCardProps> = ({tags}) => {
  return (
    <div className={`p-6 mb-8 rounded-lg border-2 border-y-secondary border-x-primary bg-card text-card-foreground`}>
        <h3 className={`text-medium sm:text-2xl font-bold w-full pb-4`}>
          Popular Tags
        </h3>
        <div className={`flex justify-start flex-wrap`}>
          {tags.map((tag, index) => (
            <Link 
              href={`/blogs/tags/${tag.slug}`} key={index}
              className={`p-1 text-sm m-1 rounded text-muted-foreground bg-muted hover:text-card-foreground transition`}
            >
              {tag.title}
            </Link>
          ))}
        </div>
    </div>
  )
}

export default TagListCard