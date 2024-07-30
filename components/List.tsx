import React, { useState, useEffect, useMemo } from "react";

type ListProps<T> = {
  headers: string[];
  data: T[];
};

const List = <T extends object>({ headers, data }: ListProps<T>) => {
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (sortKey !== null) {
      const order = sortOrder === "asc" ? 1 : -1;
      const sorted = [...data].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1 * order;
        if (a[sortKey] > b[sortKey]) return 1 * order;
        return 0;
      });
      setSortedData(sorted);
    } else {
      setSortedData(data);
    }
  }, [data, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setSortKey(key);
  };

  const renderedHeaders = useMemo(
    () =>
      headers.map((header, index) => (
        <th
          className="py-2 border-r px-2 cursor-pointer bg-black text-white"
          key={index}
          onClick={() => handleSort(header.toLowerCase() as keyof T)}
        >
          {header.replace("_", " ")}
        </th>
      )),
    [headers]
  );

  const renderedRows = useMemo(
    () =>
      sortedData.map((row, rowIndex) => (
        <tr className="border" key={rowIndex}>
          {Object.values(row).map((value, cellIndex) => (
            <td
              className={`border-r p-2 ${cellIndex === 0 && "w-auto"}`}
              key={cellIndex}
            >
              {value}
            </td>
          ))}
        </tr>
      )),
    [sortedData]
  );

  return (
    <table className="text-xs text-left border w-full">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
};

export default List;
