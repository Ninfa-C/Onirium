const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (   <div className="flex justify-center items-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-dark-light text-white border border-gray-600 hover:bg-dark disabled:opacity-40"
        >
          ←
        </button>
        <span className="text-sm text-white">
          Pagina {currentPage} di {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-dark-light text-white border border-gray-600 hover:bg-dark disabled:opacity-40"
        >
          →
        </button>
      </div> );
}
 
export default Pagination;