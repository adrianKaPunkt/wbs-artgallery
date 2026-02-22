import React from "react";

type PaginationComponentProps = {
  pagination: {
    total: number;
    limit: number;
    current_page: number;
    total_pages: number;
  };
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

const PaginationComponent = ({
  pagination,
  page,
  limit,
  setPage,
  setLimit,
}: PaginationComponentProps) => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div>
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={pagination.current_page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-4">
          Page
          <input
            type="text"
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="ml-2 w-16 p-1 border border-gray-300 rounded"
          />
        </span>
        <button
          disabled={
            pagination
              ? page >= Math.ceil(pagination.total / pagination.limit)
              : false
          }
          onClick={() =>
            setPage(Math.min(page + 1, pagination?.total_pages || page + 1))
          }
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {pagination && (
        <>
          <div className="mt-2 text-sm text-gray-600">
            Page {pagination.current_page} of {pagination.total_pages}
          </div>
          <div>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="mt-2 w-20 p-1 border border-gray-300 rounded"
              min={0}
              max={100}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationComponent;
