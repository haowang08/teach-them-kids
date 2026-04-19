'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addPhoto,
  deletePhoto,
  downloadPhoto,
  loadPhotos,
  MAX_PHOTOS_PER_TOPIC,
  type StoredPhoto,
} from '../../lib/photoStorage';
import { useProgress } from '../../hooks/useProgress';
import { useSound } from '../../hooks/useSound';
import ConfettiEffect from '../common/ConfettiEffect';
import type { ActivityPrompt } from '../../data/types';

interface PhotoGalleryProps {
  topicId: string;
  prompt: ActivityPrompt;
  filenamePrefix: string;
}

export default function PhotoGallery({ topicId, prompt, filenamePrefix }: PhotoGalleryProps) {
  const { recordActivityCompletion } = useProgress();
  const { playComplete } = useSound();

  const [photos, setPhotos] = useState<StoredPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<StoredPhoto | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  // Load photos on mount and sync progress flag.
  useEffect(() => {
    const initial = loadPhotos(topicId);
    setPhotos(initial);
    recordActivityCompletion(topicId, initial.length > 0, initial.length);
    hasInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setUploading(true);
      setError(null);
      try {
        let next = photos;
        let addedAny = false;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file.type.startsWith('image/')) continue;
          if (next.length >= MAX_PHOTOS_PER_TOPIC) {
            setError(`You can save up to ${MAX_PHOTOS_PER_TOPIC} drawings here. Delete one to add more!`);
            break;
          }
          next = await addPhoto(topicId, file);
          addedAny = true;
        }
        if (addedAny) {
          setPhotos(next);
          const wasEmpty = photos.length === 0;
          recordActivityCompletion(topicId, next.length > 0, next.length);
          if (wasEmpty && next.length > 0) {
            setCelebrate(true);
            playComplete();
          }
        }
      } catch (e) {
        if (e instanceof Error && e.message === 'STORAGE_FULL') {
          setError("Your browser ran out of space for photos. Try deleting some, or save them to your device first.");
        } else if (e instanceof Error && e.message === 'PHOTO_LIMIT') {
          setError(`You can save up to ${MAX_PHOTOS_PER_TOPIC} drawings. Delete one to add more!`);
        } else {
          setError("Something went wrong adding that photo. Try a different one?");
        }
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    },
    [photos, topicId, recordActivityCompletion, playComplete]
  );

  const handleDelete = useCallback(
    (photoId: string) => {
      const next = deletePhoto(topicId, photoId);
      setPhotos(next);
      recordActivityCompletion(topicId, next.length > 0, next.length);
      if (lightbox?.id === photoId) setLightbox(null);
    },
    [topicId, recordActivityCompletion, lightbox]
  );

  const handleDownload = useCallback(
    (photo: StoredPhoto, index: number) => {
      downloadPhoto(photo, `${filenamePrefix}-${index + 1}.jpg`);
    },
    [filenamePrefix]
  );

  // Close lightbox on Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const hasPhotos = photos.length > 0;
  const atLimit = photos.length >= MAX_PHOTOS_PER_TOPIC;

  return (
    <section id="gallery" className="my-8">
      <div className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-5 md:p-8 shadow-sm overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: 'var(--topic-section-border-gradient)' }}
        />

        <ConfettiEffect trigger={celebrate} onComplete={() => setCelebrate(false)} />

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl" aria-hidden="true">&#128247;</span>
          <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)]">
            {prompt.title}
          </h2>
        </div>

        <p className="text-base text-[var(--topic-dark-brown)] mb-5 leading-relaxed">
          {prompt.description}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading || atLimit}
        />

        {/* Add photo button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || atLimit}
          className={`w-full rounded-xl border-2 border-dashed py-6 px-4 flex flex-col items-center justify-center gap-2 transition-colors ${
            atLimit
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-[var(--topic-gold)]/60 bg-[var(--topic-cream)]/60 hover:bg-[var(--topic-gold-light)]/40 cursor-pointer'
          }`}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--topic-gold)] border-t-transparent" />
              <span className="text-sm font-semibold text-[var(--topic-dark-brown)]">Saving your drawing…</span>
            </>
          ) : atLimit ? (
            <>
              <span className="text-2xl" aria-hidden="true">&#128190;</span>
              <span className="text-sm font-semibold text-gray-600">Gallery full — delete one to add more</span>
            </>
          ) : (
            <>
              <span className="text-3xl" aria-hidden="true">&#128444;&#65039;</span>
              <span className="text-base font-bold text-[var(--topic-primary)]">
                {hasPhotos ? prompt.completionLabel : 'Add a photo of your drawing'}
              </span>
              <span className="text-xs text-[var(--topic-dark-brown)]/70">
                Tap to use your camera or pick a photo from your device
              </span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Completion banner */}
        {hasPhotos && (
          <div className="mt-5 rounded-xl bg-gradient-to-r from-[var(--topic-gold-light)] to-[var(--topic-sand)] px-4 py-3 flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">&#127881;</span>
            <p className="text-sm font-bold text-[var(--topic-dark-brown)]">
              Nice work! You&rsquo;ve saved {photos.length}{' '}
              {photos.length === 1 ? 'drawing' : 'drawings'} in your gallery.
            </p>
          </div>
        )}

        {/* Photo grid */}
        {hasPhotos && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(photo)}
                  className="absolute inset-0 block w-full h-full"
                  aria-label={`View drawing ${i + 1}`}
                >
                  <img
                    src={photo.dataUrl}
                    alt={`Your drawing ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(photo, i);
                    }}
                    className="rounded-full bg-white/90 hover:bg-white p-1.5 shadow"
                    aria-label="Download drawing"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this drawing?')) {
                        handleDelete(photo.id);
                      }
                    }}
                    className="rounded-full bg-white/90 hover:bg-red-50 p-1.5 shadow text-red-600"
                    aria-label="Delete drawing"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs text-[var(--topic-dark-brown)]/60 italic text-center">
          Your drawings stay on this device only &mdash; nothing gets uploaded anywhere.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <img
            src={lightbox.dataUrl}
            alt="Your drawing"
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 rounded-full bg-white/90 hover:bg-white p-2 shadow-lg"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
