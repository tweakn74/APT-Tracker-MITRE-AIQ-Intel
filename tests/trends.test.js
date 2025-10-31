/**
 * Tests for trends tracking
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { getTopN } from '../worker/lib/trends.js';

test('getTopN - should return top N items sorted by count', () => {
  const counts = {
    'Source A': 10,
    'Source B': 25,
    'Source C': 5,
    'Source D': 15,
    'Source E': 30,
  };
  
  const result = getTopN(counts, 3);
  const keys = Object.keys(result);
  
  assert.strictEqual(keys.length, 3);
  assert.strictEqual(keys[0], 'Source E');
  assert.strictEqual(keys[1], 'Source B');
  assert.strictEqual(keys[2], 'Source D');
});

test('getTopN - should handle empty counts', () => {
  const result = getTopN({}, 5);
  
  assert.strictEqual(Object.keys(result).length, 0);
});

test('getTopN - should handle N larger than available items', () => {
  const counts = {
    'Item 1': 10,
    'Item 2': 5,
  };
  
  const result = getTopN(counts, 10);
  
  assert.strictEqual(Object.keys(result).length, 2);
});

test('getTopN - should preserve count values', () => {
  const counts = {
    'A': 100,
    'B': 200,
    'C': 50,
  };
  
  const result = getTopN(counts, 2);
  
  assert.strictEqual(result['B'], 200);
  assert.strictEqual(result['A'], 100);
});

