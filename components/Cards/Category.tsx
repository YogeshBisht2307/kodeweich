import Link from "next/link"

const Category = () => {
  return (
    <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
        <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Category</h3>
        <div className={`flex flex-col`}>
            <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>Django (9)</Link>
            <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS (17)</Link>
            <Link href={'/blogs'} className={`max-w-xl py-2 font-sm text-slate-600  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud (12)</Link>
        </div>
    </div>
  )
}

export default Category