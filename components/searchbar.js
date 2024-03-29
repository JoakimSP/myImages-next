import { useState, useEffect, useRef } from "react"
import ErrorBoundary from "./errorBoundery"
import { useRouter } from "next/router"


function SearchBar({ categories }) {
  const [view, setView] = useState("hidden")
  const [categorie, setCategorie] = useState("All categories")
  const menuRef = useRef();
  const router = useRouter()
  const toggleDropDown = () => {
    setView(prev => prev === "hidden" ? "" : "hidden");
  }

  useEffect(() => {
    const handler = (e) => {

      if (menuRef.current && (menuRef.current.contains(e.target))) {
        return;
      }
      setView("hidden");
    };


    document.addEventListener('mousedown', handler);
    

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []); 
  const HandleSearch = (e) => {
    e.preventDefault()
    router.push(`/searchPage?searchPhrase=${e.target.searchDropdown.value}&categorie=${categorie}`)

  }

  return (
    <ErrorBoundary>
      <form onSubmit={HandleSearch} className="w-1/2">
        <div className="flex relative" ref={menuRef}>
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
          <button onClick={toggleDropDown} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{categorie}<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg></button>
          <div className={`z-10 absolute top-11 ${view} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              <li>
                <button onClick={() => setCategorie("All categories")} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All categories</button>
              </li>
              {categories.map((cat) => {
                return (
                  <li key={cat.id}>
                    <button onClick={() => setCategorie(cat.name)} type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{cat.name}</button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="relative w-full">
            <input type="search" name="searchDropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search photos..." />
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </ErrorBoundary>
  )
}

export default SearchBar;
