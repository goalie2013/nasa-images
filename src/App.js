import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import QueryForm from "./components/QueryForm";
import SpaceImages from "./components/SpaceImages";

function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}

function App() {
  const axios = require("axios");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("https://images-api.nasa.gov/search?q=");
  const [dataArr, setDataArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;
  let page = dataArr;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(url);
        console.log(result.data.collection.items[0]);
        setDataArr(result.data.collection.items);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, [url, currentPage]);

  const handlePageChange = (e) => setCurrentPage(Number(e.target.textContent));

  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }

  return (
    <div>
      <h2 className="page-title">NASA Images</h2>
      <QueryForm updateUrl={setUrl} />
      {isLoading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <SpaceImages data={page} />
      )}
      {/* {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        page.map((item) => <SpaceImages data={item} />)
      )} */}
      {isLoading ? null : (
        <Pagination
          items={dataArr}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        ></Pagination>
      )}
    </div>
  );
}

export default App;
