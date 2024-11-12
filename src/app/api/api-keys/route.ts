import { KeyController } from './keyController';

// GET /api/api-keys - Get all keys
export async function GET() {
  return await KeyController.getAllKeys();
} 