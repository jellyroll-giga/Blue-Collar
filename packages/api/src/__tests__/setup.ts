import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/bluecollar_test';
process.env.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379/1';
process.env.APP_URL = 'http://localhost:3000';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Connect to test database
  await prisma.$connect();
  console.log('Test database connected');
});

afterAll(async () => {
  // Disconnect from test database
  await prisma.$disconnect();
  console.log('Test database disconnected');
});

beforeEach(async () => {
  // Clear all tables before each test
  const tables = [
    'Review',
    'Message',
    'Notification',
    'Job',
    'Worker',
    'Location',
    'User',
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    } catch (error) {
      // Table might not exist, ignore
    }
  }
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();
});

// Export prisma instance for tests
export { prisma };
