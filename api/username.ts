import type { VercelRequest, VercelResponse } from '@vercel/node';
import { head, put } from '@vercel/blob';
import { createHmac } from 'crypto';

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;
const AUTH_SECRET = process.env.AUTH_SECRET || 'kids-learn-default-secret-change-in-prod';

// Generate a token for a username using HMAC
function generateToken(username: string): string {
  const hmac = createHmac('sha256', AUTH_SECRET);
  hmac.update(username.toLowerCase());
  return hmac.digest('hex');
}

// Export for use in progress.ts
export { generateToken, AUTH_SECRET };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.body ?? {};

  if (typeof username !== 'string' || !USERNAME_REGEX.test(username)) {
    return res.status(400).json({
      error:
        'Username must be 3-20 characters and can only contain letters, numbers, hyphens, and underscores.',
    });
  }

  const normalizedUsername = username.toLowerCase();
  const blobPath = `progress/${normalizedUsername}.json`;
  const token = generateToken(normalizedUsername);

  try {
    // Check if user already exists
    try {
      const existing = await head(blobPath);
      if (existing) {
        // Return token for existing user (they can "log in")
        return res.status(200).json({ exists: true, username: normalizedUsername, token });
      }
    } catch {
      // head() throws if blob doesn't exist — that means new user
    }

    // Create empty progress for new user
    const emptyProgress = {
      topics: {},
      xp: 0,
      streakDays: 0,
      lastVisit: new Date().toISOString(),
    };

    await put(blobPath, JSON.stringify(emptyProgress), {
      access: 'public',
      addRandomSuffix: false,
    });
    return res.status(200).json({ created: true, username: normalizedUsername, token });
  } catch (error) {
    console.error('Blob error in /api/username:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
