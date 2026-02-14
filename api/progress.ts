import type { VercelRequest, VercelResponse } from '@vercel/node';
import { head, put } from '@vercel/blob';
import { createHmac } from 'crypto';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
const AUTH_SECRET = process.env.AUTH_SECRET || 'kids-learn-default-secret-change-in-prod';

function validateUsername(username: unknown): string | null {
  if (typeof username !== 'string' || !USERNAME_REGEX.test(username)) {
    return null;
  }
  return username.toLowerCase();
}

// Validate token matches username
function validateToken(username: string, token: string): boolean {
  const hmac = createHmac('sha256', AUTH_SECRET);
  hmac.update(username.toLowerCase());
  const expectedToken = hmac.digest('hex');
  // Use timing-safe comparison to prevent timing attacks
  if (token.length !== expectedToken.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
  }
  return result === 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const normalizedUsername = validateUsername(req.query.username);
    if (!normalizedUsername) {
      return res.status(400).json({ error: 'Invalid username format.' });
    }

    // GET requests still allowed without token (for loading progress on login)
    const blobPath = `progress/${normalizedUsername}.json`;

    try {
      // Get the blob URL first, then fetch the content
      const blobInfo = await head(blobPath);
      const response = await fetch(blobInfo.url);
      const data = await response.json();
      return res.status(200).json(data);
    } catch {
      return res.status(404).json({ error: 'No progress found for this username.' });
    }
  }

  if (req.method === 'PUT') {
    const { username, progress, token } = req.body ?? {};

    const normalizedUsername = validateUsername(username);
    if (!normalizedUsername) {
      return res.status(400).json({ error: 'Invalid username format.' });
    }

    // Validate token for write operations
    if (typeof token !== 'string' || !validateToken(normalizedUsername, token)) {
      return res.status(401).json({ error: 'Invalid or missing authentication token.' });
    }

    if (
      !progress ||
      typeof progress !== 'object' ||
      typeof progress.xp !== 'number' ||
      typeof progress.topics !== 'object'
    ) {
      return res.status(400).json({ error: 'Invalid progress data.' });
    }

    const blobPath = `progress/${normalizedUsername}.json`;

    try {
      await put(blobPath, JSON.stringify(progress), {
        access: 'public',
        addRandomSuffix: false,
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Blob error in PUT /api/progress:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
