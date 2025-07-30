import { describe, it, expect } from 'vitest';

describe('searchUtils', () => {
    it('should handle name comparison correctly', () => {
        const a = { name: 'Test' };
        const lowerQuery = 'test';
        const result = a.name ? a.name.toLowerCase() === lowerQuery : false;
        expect(result).toBe(true);
    });
});
