"use strict";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";

export default function Pagination({ items, pageSize, onPageChange }) {
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num + 1);
  const list = pages.map((page) => {
    return (
      <Button key={page} onClick={onPageChange} className="pagination-btn">
        {page}
      </Button>
    );
  });

  return (
    <nav>
      <ul className="pagination">{list}</ul>
    </nav>
  );
}

const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};
