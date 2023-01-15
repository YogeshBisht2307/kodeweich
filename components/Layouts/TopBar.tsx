import { useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import Link from "next/link";
import Image from "next/image";
import companyLogo from '../../assets/images/logo.png';
import compnayLogoDark from '../../assets/images/logodark.png'


const inter = Inter({ subsets: ['latin'] })

export interface ITopBar {}


const TopBar: React.FC<ITopBar> = () => {
    const [theme, setTheme] = useState("dark")
    const handleThemeToggle = () => {
        document.documentElement.classList.toggle("dark");
        if(!document.documentElement.classList.contains("dark")){
            window.localStorage.setItem("mode" , "light");
            setTheme('light');
        }else{
            window.localStorage.setItem("mode" , "dark");
            setTheme('dark');
        }
    }
    useEffect(() => {
        let getMode = window.localStorage.getItem("mode");
        if(getMode && getMode === "dark"){
          document.documentElement.classList.add("dark");
        }
    }, [])

    return (
        <header className={'max-w-4xl mx-auto px-4 py-4'}>
            <nav className={'flex flex-row items-center justify-between'}>
                <div className='w-[45px] sm:w-[50px] transform hover:scale-[1.1] transition-all'>
                    <Link href='/'><Image src={theme == 'light' ? companyLogo : compnayLogoDark} height={40} alt={"Kodeweich Logo"}/></Link>
                </div>
                <ul className={'flex flex-row md:space-x-8'}>
                    <li>
                        <Link className={`
                            ${inter.className}
                            dark:text-slate-300
                            text-slate-800
                            font-medium
                            text-xs
                            sm:text-sm
                            dark:hover:bg-slate-800
                            hover:bg-slate-200
                            rounded
                            transform hover:scale-[1.05]
                            transition-all
                            py-1 px-2 sm:px-4
                        `} href="/about">ABOUT</Link>
                    </li>
                    <li>
                        <Link className={`
                            ${inter.className}
                            dark:text-slate-300
                            text-slate-800
                            font-medium
                            text-xs
                            sm:text-sm
                            dark:hover:bg-slate-800
                            hover:bg-slate-200
                            rounded
                            transform hover:scale-[1.05]
                            transition-all
                            py-1 px-2 sm:px-4
                        `} href="/connect">CONNECT</Link>
                    </li>
                </ul>
                <div className={`${inter.className} flex flex-row justify-around space-x-2 md:space-x-4`}>
                    <button
                        id="theme-toggle"
                        type="button"
                        aria-label="Toggle Dark Mode"
                        onClick={handleThemeToggle}
                        className="rounded-lg text-sm bg-gray-300 dark:bg-gray-700 transform hover:scale-[1.05]
                        transition-all p-2"
                        >
                        {
                            theme == 'light'
                            ?
                            <svg
                                id="theme-toggle-dark-icon"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                                ></path>
                            </svg>
                            :
                            <svg
                                id="theme-toggle-light-icon"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                ></path>
                            </svg>
                        }
                    </button>
                    <Link 
                        className={
                            `${inter.className}
                            rounded-md 
                            dark:bg-slate-300 
                            bg-slate-800
                            text-xs
                            sm:text-sm
                            font-sm
                            sm:font-medium
                            dark:text-slate-800
                            text-slate-200
                            transform hover:scale-[1.03]
                            transition-all
                            sm:py-2 sm:px-6 px-3 pt-2.5
                        `}
                        href="/blogs"
                    >Blog</Link>
                </div>
            </nav>
        </header>
    );
};

export default TopBar;