import React from "react";

const Table = ({ rows, columns, heading }) => {
  return (
    <div className="">
        <div className="flex items-center justify-between py-3 px-4">
          <h2 className="text-2xl font-semibold">{heading}</h2>
        </div>
      <table className="table">
        <thead className="bg-black text-white uppercase text-sm sticky top-0">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold tracking-wide"
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody >
          {rows.length > 0 ? (
            rows?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-gray-200 ${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                {columns?.map((column, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-gray-700 ">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>

        {/* Table Footer */}
        <tfoot className="bg-gray-200 text-gray-700 text-sm uppercase sticky bottom-0">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 text-left">
                {column.title}
              </th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
