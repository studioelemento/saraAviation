import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  name: '',
  role: '',
  experience: '',
  bio: '',
  image_url: '',
  published: true,
  sort_order: 0,
};

const AdminTeam = () => (
  <AdminContentManager
    title="Team"
    description="Team members shown on the Team page."
    table="team"
    folder="team"
    emptyForm={emptyForm}
    toForm={(row) => ({
      name: row.name || '',
      role: row.role || '',
      experience: row.experience || '',
      bio: row.bio || '',
      image_url: row.image_url || '',
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      name: form.name,
      role: form.role,
      experience: form.experience,
      bio: form.bio,
      image_url: form.image_url || null,
      published: Boolean(form.published),
      sort_order: Number(form.sort_order) || 0,
    })}
    columns={[
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'experience', label: 'Experience' },
      {
        key: 'published',
        label: 'Status',
        render: (row) => (row.published ? 'Published' : 'Draft'),
      },
    ]}
    fields={[
      { key: 'name', label: 'Name', required: true },
      { key: 'role', label: 'Role' },
      { key: 'experience', label: 'Experience', hint: 'e.g. 12+ Years' },
      { key: 'bio', label: 'Bio', type: 'textarea', rows: 4 },
      { key: 'image_url', label: 'Photo', type: 'image' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminTeam;
