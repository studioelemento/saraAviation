import { useState } from 'react';
import AdminPagination, { paginateItems } from './AdminPagination';

export default function PageViewTable({ pages }) {
  const [page, setPage] = useState(1);
  const { page: safePage, pageItems } = paginateItems(pages, page);

  return (
    <section className="border-t border-slate-100 pt-3">
      <h4 className="mb-3 text-sm font-semibold text-slate-700">Page views by page</h4>
      <table className="w-full table-fixed text-sm">
        <thead className="text-slate-500">
          <tr>
            <th scope="col" className="pb-2 text-left font-medium">Page</th>
            <th scope="col" className="w-20 pb-2 text-right font-medium">Views</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((item) => (
            <tr key={item.path} className="border-t border-slate-100">
              <td className="py-2 pr-4">
                <span className="block break-words font-medium text-primary">{item.title || item.path}</span>
                {item.title && <span className="block break-all text-xs text-slate-500">{item.path}</span>}
              </td>
              <td className="py-2 text-right font-semibold tabular-nums text-primary">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPagination page={safePage} total={pages.length} onPageChange={setPage} />
    </section>
  );
}
