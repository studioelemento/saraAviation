import React from 'react';
import AdminContentManager from './AdminContentManager';

const emptyForm = {
  title: '',
  image_url: '',
  published: true,
  sort_order: 0,
};

const AdminGallery = () => (
  <AdminContentManager
    title="Gallery"
    description="Photos shown on the Gallery page."
    table="gallery"
    folder="gallery"
    emptyForm={emptyForm}
    toForm={(row) => ({
      title: row.title || '',
      image_url: row.image_url || '',
      published: row.published !== false,
      sort_order: row.sort_order ?? 0,
    })}
    toRow={(form) => ({
      title: form.title,
      image_url: form.image_url,
      published: Boolean(form.published),
      sort_order: Number(form.sort_order) || 0,
    })}
    columns={[
      {
        key: 'preview',
        label: 'Preview',
        render: (row) =>
          row.image_url ? (
            <img src={row.image_url} alt="" className="h-12 w-16 object-cover rounded-lg border" />
          ) : (
            '—'
          ),
      },
      { key: 'title', label: 'Title' },
      {
        key: 'published',
        label: 'Status',
        render: (row) => (row.published ? 'Published' : 'Draft'),
      },
    ]}
    fields={[
      { key: 'title', label: 'Title', required: true },
      { key: 'image_url', label: 'Image', type: 'image', required: true },
      { key: 'sort_order', label: 'Sort order', type: 'number' },
      { key: 'published', label: 'Published', type: 'checkbox', checkboxLabel: 'Show on website' },
    ]}
  />
);

export default AdminGallery;
