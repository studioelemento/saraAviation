export function getSeoWarnings({ title, description }, duplicateTitle = false) {
  const warnings = [];
  if (!title) warnings.push('Add a title for the search preview.');
  if (!description) warnings.push('Add a description for the search preview.');
  if (title?.length > 60) warnings.push('The title may be cut off in search results.');
  if (description?.length > 160) warnings.push('The description may be cut off in search results.');
  if (duplicateTitle) warnings.push('Another page uses this search title.');
  return warnings;
}

export function matchesSeoHtml(document, expected) {
  return document.title === expected.title
    && document.querySelector('meta[name="description"]')?.content === expected.description
    && document.querySelector('meta[property="og:image"]')?.content === expected.image;
}
