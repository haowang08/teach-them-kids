// Local-only photo storage for activity topics.
// Photos are stored as compressed JPEG data URLs in localStorage under a
// per-topic key, never synced to the server or cloud.

const KEY_PREFIX = 'learnToDraw:photos:';
export const MAX_PHOTOS_PER_TOPIC = 12;
const MAX_PHOTO_WIDTH = 1000;
const JPEG_QUALITY = 0.78;

export interface StoredPhoto {
  id: string;
  dataUrl: string;
  createdAt: number;
}

function keyFor(topicId: string): string {
  return `${KEY_PREFIX}${topicId}`;
}

export function loadPhotos(topicId: string): StoredPhoto[] {
  try {
    const raw = localStorage.getItem(keyFor(topicId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is StoredPhoto =>
        p &&
        typeof p.id === 'string' &&
        typeof p.dataUrl === 'string' &&
        typeof p.createdAt === 'number'
    );
  } catch {
    return [];
  }
}

export function savePhotos(topicId: string, photos: StoredPhoto[]): void {
  try {
    localStorage.setItem(keyFor(topicId), JSON.stringify(photos));
  } catch (e) {
    console.error('Failed to save photos:', e);
    throw new Error('STORAGE_FULL');
  }
}

export function deletePhoto(topicId: string, photoId: string): StoredPhoto[] {
  const next = loadPhotos(topicId).filter((p) => p.id !== photoId);
  savePhotos(topicId, next);
  return next;
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function compressImage(file: File): Promise<string> {
  const dataUrl = await readFileAsDataUrl(file);
  const img = await loadImage(dataUrl);

  const scale = Math.min(1, MAX_PHOTO_WIDTH / img.width);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = src;
  });
}

export async function addPhoto(topicId: string, file: File): Promise<StoredPhoto[]> {
  const existing = loadPhotos(topicId);
  if (existing.length >= MAX_PHOTOS_PER_TOPIC) {
    throw new Error('PHOTO_LIMIT');
  }
  const dataUrl = await compressImage(file);
  const photo: StoredPhoto = {
    id: makeId(),
    dataUrl,
    createdAt: Date.now(),
  };
  const next = [...existing, photo];
  savePhotos(topicId, next);
  return next;
}

export function downloadPhoto(photo: StoredPhoto, filename = 'my-drawing.jpg'): void {
  const link = document.createElement('a');
  link.href = photo.dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
