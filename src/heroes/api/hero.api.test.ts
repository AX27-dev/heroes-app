import { describe, expect, test } from 'vitest';
import { BASE_URL, heroApi } from './hero.api';

describe('HeroApi', () => {
  test('should be configured to point to the testing server', () => {
    expect(heroApi).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(BASE_URL).toContain('3001');
  });
});
