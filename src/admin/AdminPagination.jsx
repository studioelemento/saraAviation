import React from 'react';

export const ADMIN_PAGE_SIZE = 10;

/**
 * Simple table pagination controls shared by all admin list pages.
 */
const AdminPagination = ({ page, pageSize = ADMIN_PAGE_SIZE, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const from = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(safePage * pageSize, total);

  if (total === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 bg-slate-50/80">
      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{from}-{to}</span> of{' '}
        <span className="font-medium text-slate-700">{total}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-50"
        >
          Previous
        </button>
        <span className="text-xs text-slate-500 min-w-[4.5rem] text-center">
          Page {safePage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export function paginateItems(items, page, pageSize = ADMIN_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    page: safePage,
    totalPages,
    pageItems: items.slice(start, start + pageSize),
  };
}

export default AdminPagination;
