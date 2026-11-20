import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  title: '',
  category: 'Industry',
  date_label: '',
  excerpt: '',
  image_url: '',
  published: true,
  sort_order: 0,
};

const AdminNews = () => (
  <AdminContentManager
    title="News"
    description="Blog / news articles shown on the News page and homepage."
    table="news"
    folder="news"
    emptyForm={emptyForm}
    toForm={(row) => ({
      title: row.title || '',
      category: row.category || 'Industry',
      date_label: row.date_label || '',
      excerpt: row.excerpt || '',
      image_url: row.image_url || '',
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      title: form.title,
      category: form.category,
      date_label: form.date_label,
      excerpt: form.excerpt,
      image_url: form.image_url || null,
      published: Boolean(form.published),
      sort_order: Number(form.sort_order) || 0,
    })}
    columns={[
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'date_label', label: 'Date' },
      {
        key: 'published',
        label: 'Status',
        render: (row) => (row.published ? 'Published' : 'Draft'),
      },
    ]}
    fields={[
      { key: 'title', label: 'Title', required: true },
      { key: 'category', label: 'Category', hint: 'e.g. Industry, Careers, Admissions' },
      { key: 'date_label', label: 'Display date', hint: 'e.g. 08 Apr 2026' },
      { key: 'excerpt', label: 'Article body / excerpt', type: 'textarea', rows: 8, required: true },
      { key: 'image_url', label: 'Image', type: 'image' },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminNews;
