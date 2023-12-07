import { useRouter } from 'next/router';

export default function Pagination({ totalPages, currentPage }) {
    const router = useRouter();

    const goToPage = (page) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('page', page);
        router.push(`/searchPage?${currentParams.toString()}`);
    };

    // Function to calculate the range of pages to display
    const paginationRange = () => {
        const siblingCount = 5; // Number of pages to display on each side of the current page
        const totalPageNumbers = siblingCount + 5; // Total number of pages to display at a time

        // If the total pages is less or equal to the number of pages we want to show at once
        if (totalPages <= totalPageNumbers) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, '...', lastPageIndex];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPages - rightItemCount + 1, totalPages);

            return [firstPageIndex, '...', ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    };

    // Utility function to create an array of numbers between two numbers (inclusive)
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    const pages = paginationRange();

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

            {pages.map((page, index) => (
                page === '...' ? (
                    <span key={index} className="px-3 py-1 text-sm font-medium">...</span>
                ) : (
                    <button 
                        key={index} 
                        onClick={() => goToPage(page)} 
                        className={`px-3 py-1 text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${page === currentPage ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 hover:bg-blue-100'}`}
                        disabled={page === currentPage}
                    >
                        {page}
                    </button>
                )
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
