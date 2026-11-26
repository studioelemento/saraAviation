export function normalizeLearningPoint(item) {
  const [title, ...description] = typeof item === 'string' ? item.split('|') : [];
  return {
    title: String(title ?? item?.title ?? '').trim().replace(/^\d+\.\s+/, ''),
    desc: String(description.length ? description.join('|') : item?.desc ?? '').trim(),
  };
}
