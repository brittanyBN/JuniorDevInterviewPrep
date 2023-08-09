import React from "react";

export const ButtonGroup = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="button-group">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button aria-label={`Page ${currentPage} of ${totalPages}`} disabled>
        {`${currentPage}/${totalPages}`}
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
