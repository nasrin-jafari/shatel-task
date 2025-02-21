import React, { useState, useMemo } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, Row, ColumnDef } from "@tanstack/react-table";
import { CustomTableProps } from "../../../types";
import { rowsPerPageOptions } from "../../../constants";

const CustomTable = <T extends object>({ data, columns, onEdit, onDelete }: CustomTableProps<T>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const finalColumns = useMemo<ColumnDef<T>[]>(() => {
    if (!onEdit && !onDelete) return columns;
    return [
      ...columns,
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }: { row: Row<T> }) => (
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={() => onEdit(row.original)} className="bg-blue-600 text-white px-3 py-2 rounded cursor-pointer">
                ویرایش
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete?.((row.original as any).id)} className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer">
                حذف
              </button>
            )}
          </div>
        ),
      },
    ];
  }, [columns, onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[#007bff] text-white text-left">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-3 py-3 font-bold uppercase border-b-2 border-gray-300">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={`border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={finalColumns.length} className="text-center py-4 text-gray-500 italic">
                دیتایی یافت نشد!😥
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {data?.length > 1 && (
        <div className="mt-4 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-3 py-2 bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              صفحه قبلی
            </button>
            <span>
              صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
            </span>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-3 py-2 bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              صفحه بعدی
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="rowsPerPage">صفحه بعدی</label>
            <select
              id="rowsPerPage"
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                }))
              }
              className="px-2 py-1 border border-gray-300 rounded"
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
