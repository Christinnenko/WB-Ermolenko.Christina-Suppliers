import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import arrowHorizontLeft from "../../../src/icons/arrow-horisont-left.svg";
import arrowHorizontRight from "../../../src/icons/arrow-horisont-right.svg";
import { PaginationProps } from "../../store/interfaces";

const Pagination: React.FC<PaginationProps> = ({ pageCount, onChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    onChange({ selected });
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel={<img src={arrowHorizontLeft} alt="Назад" />}
      nextLabel={<img src={arrowHorizontRight} alt="Вперед" />}
      previousClassName={`prev ${currentPage === 0 ? "hidden" : ""}`}
      nextClassName={`next ${currentPage === pageCount - 1 ? "hidden" : ""}`}
      disabledClassName="hidden"
    />
  );
};

export default Pagination;
