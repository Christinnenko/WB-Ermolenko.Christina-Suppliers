import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import arrowHorizontLeft from "../../../src/icons/arrow-horisont-left.svg";
import arrowHorizontRight from "../../../src/icons/arrow-horisont-right.svg";
import { PaginationProps } from "../../store/interfaces";

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onChange,
  currentPage,
}) => {
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
    onChange({ selected });
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName="pagination"
      activeClassName="active"
      forcePage={page}
      previousLabel={<img src={arrowHorizontLeft} alt="Назад" />}
      nextLabel={<img src={arrowHorizontRight} alt="Вперед" />}
      previousClassName={`prev ${page === 0 ? "hidden" : ""}`}
      nextClassName={`next ${page === pageCount - 1 ? "hidden" : ""}`}
      disabledClassName="hidden"
    />
  );
};

export default Pagination;
