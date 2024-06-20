import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import arrowHorizontLeft from "../../../src/icons/arrow-horisont-left.svg";
import arrowHorizontRight from "../../../src/icons/arrow-horisont-right.svg";

export interface PaginationProps {
  initialPage?: number;
  marginPagesDisplayed?: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  onChange: ({ selected }: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  initialPage,
  marginPagesDisplayed,
  pageCount,
  pageRangeDisplayed,
  onChange,
}) => {
  return (
    <ReactPaginate
      initialPage={initialPage}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onChange}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel={<img src={arrowHorizontLeft} alt="Назад" />}
      nextLabel={<img src={arrowHorizontRight} alt="Вперед" />}
    />
  );
};

export default Pagination;
