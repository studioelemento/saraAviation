export default function LearningPointsEditor({ items, onChange }) {
  function updatePoint(index, key, value) {
    onChange(items.map((point, position) => position === index ? { ...point, [key]: value } : point));
  }

  const inputClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary';

  return (
    <div className="space-y-3">
      {items.map((point, index) => (
        <fieldset key={index} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <legend className="px-1 text-sm font-semibold text-primary">Point {index + 1}</legend>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Heading</span>
            <input className={inputClass} value={point.title} onChange={(event) => updatePoint(index, 'title', event.target.value)} />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea className={inputClass} rows={3} value={point.desc} onChange={(event) => updatePoint(index, 'desc', event.target.value)} />
          </label>
          <button
            type="button"
            aria-label={'Remove point ' + (index + 1)}
            onClick={() => onChange(items.filter((_, position) => position !== index))}
            className="text-sm font-medium text-red-700 hover:underline"
          >
            Remove
          </button>
        </fieldset>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { title: '', desc: '' }])}
        className="rounded-lg border border-primary/20 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5"
      >
        {items.length ? 'Add more' : 'Add first point'}
      </button>
    </div>
  );
}
