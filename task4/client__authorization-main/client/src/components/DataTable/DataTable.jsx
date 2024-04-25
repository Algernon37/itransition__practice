import React from 'react';
import style from './DataTable.module.scss';

const DataTable = ({ data, selectedRows, toggleRowSelection }) => {
    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th></th>
                    {data && data.length > 0 && Object.keys(data[0]).map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id} className={selectedRows.includes(item.id) ? style.selected : ''}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => toggleRowSelection(item.id)}
                                />
                            </td>
                            {Object.entries(item).map(([key, value], subIndex) => {
                                if (key === 'is_blocked') {
                                    return <td key={subIndex}>{value ? 'True' : 'False'}</td>;
                                } else {
                                    return <td key={subIndex}>{value}</td>;
                                }
                            })}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td  className={style.tableTitle} colSpan={data && data.length > 0 ? Object.keys(data[0]).length + 1 : 1}>
                            Нажмите кнопку, чтобы увидеть данные
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
export default DataTable;
