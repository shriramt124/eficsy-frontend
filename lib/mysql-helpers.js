
import { randomBytes } from 'crypto';

export function generateId() {
  return randomBytes(16).toString('hex');
}

export function formatDateForMySQL(date) {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}

export function parseMySQL Row(row) {
  if (!row) return null;
  const parsed = { ...row };
  // Convert JSON strings back to objects/arrays
  if (parsed.services && typeof parsed.services === 'string') {
    try {
      parsed.services = JSON.parse(parsed.services);
    } catch (e) {
      parsed.services = [];
    }
  }
  return parsed;
}
