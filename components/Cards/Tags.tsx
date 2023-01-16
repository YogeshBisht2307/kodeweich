import Link from "next/link";

const Tags = () => {
  return (
    <div className={`p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
        <h3 className={`text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Popular Tags</h3>
        <div className={`flex justify-start flex-wrap`}>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200 dark:hover:text-slate-400 transition dark:text-slate-500`}>Django</Link>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200  dark:hover:text-slate-400 transition dark:text-slate-500`}>ReactJS</Link>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
            <Link href={'/blogs'} className={`p-1 text-sm m-1 rounded text-slate-600 dark:bg-slate-800 bg-slate-200  dark:hover:text-slate-400 transition dark:text-slate-500`}>AWS Cloud</Link>
        </div>
    </div>
  )
}

export default Tags