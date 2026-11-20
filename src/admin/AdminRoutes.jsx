import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminLeads from './AdminLeads';
import AdminNews from './AdminNews';
import AdminCourses from './AdminCourses';
import AdminGallery from './AdminGallery';
import AdminTeam from './AdminTeam';
import AdminJobs from './AdminJobs';

/**
 * All /admin routes live here so App.jsx only mounts this module.
 */
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="jobs" element={<AdminJobs />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
