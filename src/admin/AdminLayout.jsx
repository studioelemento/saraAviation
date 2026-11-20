import React, { useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, logoutAdmin } from './adminAuth';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true, ready: true },
  { to: '/admin/leads', label: 'Leads', ready: true },
  { to: '/admin/news', label: 'News', ready: true },
  { to: '/admin/courses', label: 'Courses', ready: true },
  { to: '/admin/gallery', label: 'Gallery', ready: true },
  { to: '/admin/team', label: 'Team', ready: true },
  { to: '/admin/jobs', label: 'Jobs', ready: true },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white flex flex-col transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold">Sara Aviation</p>
          <h1 className="mt-1 text-lg font-heading font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) =>
            item.ready ? (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-white text-primary' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-white/40 cursor-not-allowed"
                title="Coming in a later step"
              >
                <span>{item.label}</span>
                <span className="text-[10px] uppercase tracking-wide">Soon</span>
              </div>
            )
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/20 px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-primary truncate">Sara Aviation Admin</p>
            <p className="text-xs text-slate-500">Full content admin</p>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
