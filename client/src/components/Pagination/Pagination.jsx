import './pagination.css'
const Pagination = ({
    itemsPerPage,
    totalItems,
    paginate,
    currentPage,
}) => {
    const pageNumbers = []
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const maxPageNumbersToShow = 5 // Number of page numbers to display

    // Calculate the starting and ending page numbers based on the current page
    let startPage = Math.max(
        1,
        currentPage - Math.floor(maxPageNumbersToShow / 2)
    )
    let endPage = startPage + maxPageNumbersToShow - 1

    if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className='pagination'>
            {currentPage > 1 && (
                <div
                    className='arrow'
                    onClick={() => paginate(currentPage - 1)}>
                    &#8249;
                </div>
            )}
            {startPage > 1 && <div className='ellipsis'>...</div>}
            {pageNumbers.map((number) => (
                <div
                    key={number}
                    className={
                        number === currentPage
                            ? 'page-number active'
                            : 'page-number'
                    }
                    onClick={() => paginate(number)}>
                    {number}
                </div>
            ))}
            {endPage < totalPages && <div className='ellipsis'>...</div>}
            {currentPage < totalPages && (
                <div
                    className='arrow'
                    onClick={() => paginate(currentPage + 1)}>
                    &#8250;
                </div>
            )}
        </div>
    )
}

export default Pagination
