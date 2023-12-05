import { useState, useEffect, useRef } from "react";
import ErrorBoundary from "./errorBoundery";
import { useRouter } from "next/router";

function SearchBar({ categories }) {
  const [categorie, setCategorie] = useState("All categories");
  const router = useRouter();
  console.log(categorie)
  const HandleSearch = (e) => {
    e.preventDefault();
    router.push(`/searchPage?searchPhrase=${e.target.searchDropdown.value}&categorie=${encodeURIComponent(categorie)}&page=1`);
  };

  return (
    <ErrorBoundary>
      <form onSubmit={HandleSearch} className="w-full md:w-3/4 lg:w-1/2 mx-12">
        <div className="flex flex-wrap relative">
          <label htmlFor="categoryDropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Categories</label>
          <div className="relative flex-shrink-0 z-10 w-full sm:w-auto mb-2 sm:mb-0">
            <select
              id="categoryDropdown"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="block appearance-none py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-full md:rounded-r-none rounded-r-lg"
            >
              <option value="All categories">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.293 9.293a1 1 0 0 1 1.414 0L10 11.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"/></svg>
            </div>
          </div>

          <div className="relative w-full sm:w-auto flex-grow mb-2 sm:mb-0">
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
  );
}

export default SearchBar;
