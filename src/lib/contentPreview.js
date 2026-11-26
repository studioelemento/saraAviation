import { useSyncExternalStore } from 'react';

export const contentPreviewFrame = 'cms-content-preview';
export const contentPreviewStorage = 'sara_content_preview';

function getSnapshot() {
  if (window.frameElement?.id !== contentPreviewFrame) return null;
  try {
    return sessionStorage.getItem(contentPreviewStorage);
  } catch {
    return null;
  }
}

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

export function useContentPreview(table) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  try {
    const preview = snapshot && JSON.parse(snapshot);
    return preview?.table === table ? preview.row : null;
  } catch {
    return null;
  }
}
