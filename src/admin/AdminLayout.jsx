import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  GraduationCap, 
  Image as ImageIcon, 
  UserCheck, 
  Briefcase, 
  Search, 
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { checkStaffAccess, isLocalAdminSession, logoutAdmin } from './adminAuth';
import { supabase } from '../lib/supabase';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true, ready: true },
  { to: '/admin/leads', label: 'Leads', icon: Users, ready: true },
  { to: '/admin/news', label: 'News', icon: Newspaper, ready: true },
  { to: '/admin/courses', label: 'Courses', icon: GraduationCap, ready: true },
  { to: '/admin/gallery', label: 'Gallery', icon: ImageIcon, ready: true },
  { to: '/admin/team', label: 'Team', icon: UserCheck, ready: true },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase, ready: true },
  { to: '/admin/seo', label: 'SEO', icon: Search, ready: true },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [allowed, setAllowed] = useState(null);
  const [signOutError, setSignOutError] = useState('');

  useEffect(() => {
    let active = true;
    let revision = 0;
    const subscription = supabase?.auth.onAuthStateChange((event, session) => {
      if (!isLocalAdminSession() && (event === 'SIGNED_OUT' || !session)) {
        revision += 1;
        setAllowed(false);
      }
    }).data.subscription;

    const initialRevision = revision;
    checkStaffAccess().then(
      (result) => { if (active && revision === initialRevision) setAllowed(result); },
      () => { if (active && revision === initialRevision) setAllowed(false); },
    );

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (allowed === null) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Checking staff access...
      </div>
    </div>
  );
  if (!allowed) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      setSignOutError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0a192f] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#081426]">
          <Link to="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo/SaraAviationLogoWhiteOrangeAvif.avif" 
              alt="Sara Aviation Logo" 
              className="h-9 w-auto object-contain"
            />
            <div className="leading-none">
              <span className="block text-[10px] tracking-[0.2em] uppercase font-bold text-accent">Sara Aviation</span>
              <span className="block text-sm font-black text-white tracking-wide mt-0.5">Admin Portal</span>
            </div>
          </Link>
          <button 
            type="button" 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/60 hover:text-white p-1 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links (Scrollable area) */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return item.ready ? (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-[#e59217] text-white shadow-lg shadow-accent/25'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110 text-white/50 group-hover:text-white'}`} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="shrink-0 text-white/80" />}
                  </>
                )}
              </NavLink>
            ) : (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/30 cursor-not-allowed"
                title="Coming soon"
              >
                <div className="flex items-center gap-3.5">
                  <Icon size={18} className="shrink-0 text-white/20" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wide bg-white/5 px-2 py-0.5 rounded text-white/40">Soon</span>
              </div>
            );
          })}
        </div>

        {/* Bottom User & Sign Out Section (Sticky to bottom of sidebar) */}
        <div className="p-4 border-t border-white/10 bg-[#081426] shrink-0 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              Visit Public Website
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-red-300 hover:text-red-200 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 rounded-xl text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div>
              <p className="text-base font-bold text-primary font-heading leading-tight">Sara Aviation Admin</p>
              <p className="text-xs text-slate-500 font-medium">Content Management & Analytics System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {signOutError && (
            <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
              {signOutError}
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
