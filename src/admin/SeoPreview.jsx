import { useState } from 'react';

export default function SeoPreview({ title, description, canonical, image, warnings = [] }) {
  const [failedImage, setFailedImage] = useState(null);

  return (
    <section className="space-y-4" aria-label="SEO previews">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-primary">Search preview</h3>
        <p className="truncate text-xs text-slate-500">{canonical}</p>
        <p className="mt-1 line-clamp-1 break-words text-lg font-medium text-blue-800">{title}</p>
        <p className="mt-1 line-clamp-2 break-words text-sm text-slate-700">{description}</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <h3 className="px-4 py-3 text-sm font-semibold text-primary">Social preview</h3>
        {image && image !== failedImage && (
          <img src={image} alt="" className="aspect-video w-full bg-white object-cover" onError={() => setFailedImage(image)} />
        )}
        <div className="space-y-1 px-4 py-3">
          <p className="line-clamp-2 break-words font-semibold text-primary">{title}</p>
          <p className="line-clamp-2 break-words text-sm text-slate-700">{description}</p>
        </div>
      </div>
      {(warnings.length > 0 || (image && image === failedImage)) && (
        <ul className="list-disc space-y-1 rounded-xl bg-amber-50 p-4 pl-8 text-sm text-amber-900">
          {warnings.map((warning) => <li key={warning}>{warning}</li>)}
          {image && image === failedImage && <li>The share image could not be loaded.</li>}
        </ul>
      )}
    </section>
  );
}
