import React, { useContext, useState } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import DataTable from '../components/DataTable/DataTable';

export default function Demo() {
  const { data, makeTable, handleLogOut, handleBlockUser, handleUnblockUser, handleDeleteUser } = useContext(AuthContext);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (userId) => {
    setSelectedRows(prevSelectedRows =>
      prevSelectedRows.includes(userId)
        ? prevSelectedRows.filter(id => id !== userId)
        : [...prevSelectedRows, userId]
    );
  };

  return (
    <div className={style.wrapper}>
      {data && data.length > 0 && (
        <div>
          <Button onClick={() => selectedRows.forEach(userId => handleBlockUser(userId))}>Block</Button>
          <Button onClick={() => selectedRows.forEach(userId => handleUnblockUser(userId))}>Unblock</Button>
          <Button onClick={() => selectedRows.forEach(userId => handleDeleteUser(userId))}>Delete</Button>
        </div>
      )}
      <div>
        <DataTable
          data={data}
          selectedRows={selectedRows}
          toggleRowSelection={toggleRowSelection}
        />
      </div>
      <Button onClick={makeTable}>
        Таблица пользователей
      </Button>
      <Button onClick={handleLogOut}>
        Выйти
      </Button>
    </div>
  );
}
