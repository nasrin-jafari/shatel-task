import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomTable from "./CustomTable";
import { ColumnDef } from "@tanstack/react-table";

const mockData = [
  { id: 1, title: "Test 1", content: "Content 1" },
  { id: 2, title: "Test 2", content: "Content 2" },
  { id: 3, title: "Test 3", content: "Content 3" },
];

const columns: ColumnDef<(typeof mockData)[0]>[] = [
  {
    accessorKey: "id",
    header: "شناسه",
  },
  {
    accessorKey: "title",
    header: "عنوان",
  },
  {
    accessorKey: "content",
    header: "محتوا",
  },
];

describe("CustomTable Component", () => {
  test("renders 'دیتایی یافت نشد' if data is empty", () => {
    render(<CustomTable data={[]} columns={columns} />);
    expect(screen.getByText("دیتایی یافت نشد!😥")).toBeInTheDocument();
  });

  test("renders table headers and rows correctly", () => {
    render(<CustomTable data={mockData} columns={columns} />);

    expect(screen.getByText("شناسه")).toBeInTheDocument();
    expect(screen.getByText("عنوان")).toBeInTheDocument();
    expect(screen.getByText("محتوا")).toBeInTheDocument();

    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
    expect(screen.getByText("Test 3")).toBeInTheDocument();
  });

  test("calls onEdit and onDelete callbacks if provided", () => {
    const onEditMock = jest.fn();
    const onDeleteMock = jest.fn();

    const smallData = [{ id: "10", title: "Post 10", content: "bla" }];

    render(<CustomTable data={smallData} columns={columns} onEdit={onEditMock} onDelete={onDeleteMock} />);

    const editBtn = screen.getByRole("button", { name: /ویرایش/i });
    const deleteBtn = screen.getByRole("button", { name: /حذف/i });

    fireEvent.click(editBtn);
    expect(onEditMock).toHaveBeenCalledWith(smallData[0]);

    fireEvent.click(deleteBtn);
    expect(onDeleteMock).toHaveBeenCalledWith("10");
  });

  test("handles pagination: next and previous page", () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Title ${i + 1}`,
      content: `Content ${i + 1}`,
    }));

    render(<CustomTable data={data} columns={columns} />);

    const prevBtn = screen.getByRole("button", { name: /صفحه قبلی/i });
    const nextBtn = screen.getByRole("button", { name: /صفحه بعدی/i });
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();
    fireEvent.click(nextBtn);
    expect(prevBtn).not.toBeDisabled();
  });
});
