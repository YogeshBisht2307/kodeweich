
import {ISearchInput} from '../../interfaces'
import { poppins400, poppins600 } from '../utils'

const SearchInput = ({value, onSearch, onSubmit}: ISearchInput) => {
    return (
        <div className={`${poppins400.className} p-6 mb-8 rounded-lg border-2 border-y-slate-300 border-x-pink-500 dark:border-y-slate-500`}>
            <h3 className={`${poppins600.className} text-medium sm:text-2xl font-bold w-full text-slate-800 dark:text-slate-300 pb-4`}>Search</h3>
            <form onSubmit={onSubmit}>   
                <div className="relative">
                    <input 
                        type="search"
                        id="search"
                        name="search"
                        value={value}
                        onChange={onSearch}
                        className="block w-full p-4 text-sm text-gray-900 border rounded-lg border-slate-400 bg-slate-100 focus:outline-none dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search"
                    />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-slate-800 hover:bg-slate-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-slate-300 dark:hover:bg-slate-200">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-200 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchInput