import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  title: '',
  experience: '',
  location: '',
  type: 'Full-Time',
  responsibilities: [],
  skills: [],
  published: true,
  sort_order: 0,
};

const AdminJobs = () => (
  <AdminContentManager
    title="Jobs"
    description="Job openings shown on the Careers page."
    table="jobs"
    folder="jobs"
    emptyForm={emptyForm}
    toForm={(row) => ({
      title: row.title || '',
      experience: row.experience || '',
      location: row.location || '',
      type: row.type || 'Full-Time',
      responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
      skills: Array.isArray(row.skills) ? row.skills : [],
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      title: form.title,
      experience: form.experience,
      location: form.location,
      type: form.type,
      responsibilities: form.responsibilities || [],
      skills: form.skills || [],
      published: Boolean(form.published),
      sort_order: Number(form.sort_order) || 0,
    })}
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type' },
      {
        key: 'published',
        label: 'Status',
        render: (row) => (row.published ? 'Published' : 'Draft'),
      },
    ]}
    fields={[
      { key: 'title', label: 'Job title', required: true },
      { key: 'experience', label: 'Experience' },
      { key: 'location', label: 'Location' },
      { key: 'type', label: 'Type', hint: 'e.g. Full-Time' },
      { key: 'responsibilities', label: 'Responsibilities', type: 'lines', hint: 'One per line' },
      { key: 'skills', label: 'Skills', type: 'lines', hint: 'One per line' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminJobs;
