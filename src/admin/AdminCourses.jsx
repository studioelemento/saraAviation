import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  title: '',
  image_url: '',
  duration: '',
  description: '',
  eligibility: [],
  accreditation: [],
  what_you_can_learn: [],
  is_govt: false,
  published: true,
  sort_order: 0,
};

const AdminCourses = () => (
  <AdminContentManager
    title="Courses"
    description="Course cards and details on the Courses page."
    table="courses"
    folder="courses"
    emptyForm={emptyForm}
    toForm={(row) => ({
      title: row.title || '',
      image_url: row.image_url || '',
      duration: row.duration || '',
      description: row.description || '',
      eligibility: Array.isArray(row.eligibility) ? row.eligibility : [],
      accreditation: Array.isArray(row.accreditation) ? row.accreditation : [],
      what_you_can_learn: Array.isArray(row.what_you_can_learn) ? row.what_you_can_learn : [],
      is_govt: Boolean(row.is_govt),
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      title: form.title,
      image_url: form.image_url || null,
      duration: form.duration,
      description: form.description,
      eligibility: form.eligibility || [],
      accreditation: form.accreditation || [],
      what_you_can_learn: form.what_you_can_learn || [],
      is_govt: Boolean(form.is_govt),
      published: Boolean(form.published),
      sort_order: Number(form.sort_order) || 0,
    })}
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'duration', label: 'Duration' },
      {
        key: 'published',
        label: 'Status',
        render: (row) => (row.published ? 'Published' : 'Draft'),
      },
    ]}
    fields={[
      { key: 'title', label: 'Title', required: true },
      { key: 'duration', label: 'Duration' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'eligibility', label: 'Eligibility', type: 'lines', hint: 'One line per eligibility item' },
      { key: 'accreditation', label: 'Accreditation', type: 'lines', hint: 'e.g. SARA, IATA — one per line' },
      {
        key: 'what_you_can_learn',
        label: 'What you can learn',
        type: 'learn',
        hint: 'One module per line: Title | Description',
      },
      { key: 'image_url', label: 'Image', type: 'image' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'is_govt', label: 'Govt flag', type: 'checkbox', checkboxLabel: 'Mark as government related' },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminCourses;
