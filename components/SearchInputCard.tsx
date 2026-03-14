export interface SearchInputCardProps {
    value: String;
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SearchInputCard = ({value, onSearch, onSubmit}: SearchInputCardProps) => {
    return (
        <div className={`p-6 mb-8 rounded-lg border-2 border-y-secondary border-x-primary`}>
            <h3 className={`text-medium sm:text-2xl font-bold w-full pb-4`}>Search</h3>
            <form onSubmit={onSubmit}>   
                <div className="relative">
                    <input 
                        type="search"
                        id="search"
                        name="search"
                        value={value.toString()}
                        onChange={onSearch}
                        className="block w-full p-4 bg-muted text-muted-foreground border rounded-lg focus:outline-none" placeholder="Search"
                    />
                    <button type="submit" className="text-primary-foreground absolute right-2.5 bottom-2.5 bg-primary focus:outline-none font-medium rounded-lg text-sm px-4 py-2" aria-label="Search Blog">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchInputCard;