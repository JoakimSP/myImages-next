import { useRouter } from 'next/router';

export default function Pagination({ totalPages, currentPage }) {
    const router = useRouter();

    const goToPage = (page) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('page', page);
        router.push(`/searchPage?${currentParams.toString()}`);
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-4">
        {currentPage > 1 && (
            <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => goToPage(currentPage - 1)}
            >
                Previous
            </button>
        )}
    
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
                key={page} 
                onClick={() => goToPage(page)} 
                className={`px-3 py-1 text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${page === currentPage ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'}`}
                disabled={page === currentPage}
            >
                {page}
            </button>
        ))}
    
        {currentPage < totalPages && (
            <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => goToPage(currentPage + 1)}
            >
                Next
            </button>
        )}
    </div>
    
    );
}
