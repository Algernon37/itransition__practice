import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import style from "./DataTable.module.scss";

const DataTable = ({ seed, region, errors }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [prevParams, setPrevParams] = useState({ seed, region, errors });

  useEffect(() => {
    if (prevParams.seed !== seed || prevParams.region !== region || prevParams.errors !== errors) {
      setPage(1);
      setData([]);
      setPrevParams({ seed, region, errors });
    }
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, [seed, region, errors, page]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://31.128.32.128:3000/generate-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
        body: JSON.stringify({ seed, region, errors, pageNumber: page })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newData = await response.json();
      setData(prevData => (page > 1 ? [...prevData, ...newData] : newData));
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
      loader={<div style={{ textAlign: 'center' }}>Loading...</div>} 
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
            {loading && data.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading data...</td></tr>
            ) : (
              data.map((item) => (
                <tr key={`${item.id}_${page}`}>
                  <td>{item.id}</td>
                  <td>{item.identifier}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
};

export default DataTable;
