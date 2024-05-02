import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from "./DataTable.module.scss";

const DataTable = ({ seed, region, errors }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [seed, region, errors, page]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/generate-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seed, region, errors, pageNumber: page })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newData = await response.json();
      if (page > 1) {
        setData(prevData => [...prevData, ...newData]);
      } else {
        setData(newData);
      }
      setHasMore(newData.length === 20);
    } catch (error) {
      console.error("Fetch error: " + error.message);
    }
  };

  return (
    <InfiniteScroll 
      dataLength={data.length}
      next={() => setPage(prevPage => prevPage + 1)}
      hasMore={hasMore}
      endMessage={<p style={{ textAlign: 'center' }}><b>You have seen all records</b></p>}
      scrollableTarget="scrollableDiv"
    >
      <div className={style.wrapper} id="scrollableDiv">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={`${item.id}_${page}`}>
                <td>{item.id}</td>
                <td>{item.identifier}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    </InfiniteScroll>
  );
};
export default DataTable;
