import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  title: '',
  category: 'Industry',
  date_label: '',
  excerpt: '',
  seo_title: '',
  seo_description: '',
  seo_image_url: '',
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
      seo_title: row.seo_title || '',
      seo_description: row.seo_description || '',
      seo_image_url: row.seo_image_url || '',
      image_url: row.image_url || '',
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      title: form.title,
      category: form.category,
      date_label: form.date_label,
      excerpt: form.excerpt,
      seo_title: form.seo_title.trim(),
      seo_description: form.seo_description.trim(),
      seo_image_url: form.seo_image_url.trim(),
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
      { key: 'seo', label: 'Post SEO', type: 'heading', hint: 'Blank fields use the post title, excerpt, and image.' },
      { key: 'seo_title', label: 'Search title', maxLength: 120 },
      { key: 'seo_description', label: 'Search description', type: 'textarea', rows: 3, maxLength: 320 },
      { key: 'seo_image_url', label: 'Share image URL', maxLength: 2048 },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminNews;
