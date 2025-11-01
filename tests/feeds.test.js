/**
 * Tests for feed parsing and normalization
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { extractTags, sanitizeHtml, deduplicateItems } from '../worker/lib/feeds.js';

test('extractTags - should extract CVE identifiers', () => {
  const text = 'Critical vulnerability CVE-2024-1234 and CVE-2023-5678 discovered';
  const tags = extractTags(text);

  assert.ok(tags.includes('CVE-2024-1234'));
  assert.ok(tags.includes('CVE-2023-5678'));
});

test('extractTags - should extract MITRE ATT&CK technique IDs', () => {
  const text = 'Attackers used T1059.001 and T1566 techniques';
  const tags = extractTags(text);

  assert.ok(tags.includes('T1059.001'));
  assert.ok(tags.includes('T1566'));
});

test('extractTags - should extract CWE identifiers', () => {
  const text = 'This is related to CWE-79 and CWE-89';
  const tags = extractTags(text);

  assert.ok(tags.includes('CWE-79'));
  assert.ok(tags.includes('CWE-89'));
});

test('extractTags - should detect ransomware keyword', () => {
  const text = 'New ransomware campaign targeting healthcare';
  const tags = extractTags(text);

  assert.ok(tags.includes('RANSOMWARE'));
});

test('extractTags - should detect zero-day variants', () => {
  const tests = [
    'zero-day exploit found',
    'zero day vulnerability',
    '0-day attack',
    '0day exploit',
  ];

  tests.forEach(text => {
    const tags = extractTags(text);
    assert.ok(tags.includes('ZERO-DAY'), `Failed for: ${text}`);
  });
});

test('extractTags - should detect APT references', () => {
  const text = 'APT29 and APT-28 linked to campaign';
  const tags = extractTags(text);

  assert.ok(tags.includes('APT'));
});

test('extractTags - should detect malware keyword', () => {
  const text = 'New malware strain discovered';
  const tags = extractTags(text);

  assert.ok(tags.includes('MALWARE'));
});

test('extractTags - should detect phishing keyword', () => {
  const text = 'Phishing campaign targets executives';
  const tags = extractTags(text);

  assert.ok(tags.includes('PHISHING'));
});

test('sanitizeHtml - should strip script tags', () => {
  const html = 'Safe text <script>alert("xss")</script> more text';
  const result = sanitizeHtml(html);

  assert.strictEqual(result, 'Safe text  more text');
});

test('sanitizeHtml - should strip style tags', () => {
  const html = 'Text <style>body{display:none}</style> more';
  const result = sanitizeHtml(html);

  assert.strictEqual(result, 'Text  more');
});

test('sanitizeHtml - should strip all HTML tags', () => {
  const html = '<p>Paragraph</p><div>Division</div><a href="#">Link</a>';
  const result = sanitizeHtml(html);

  assert.strictEqual(result, 'ParagraphDivisionLink');
});

test('sanitizeHtml - should decode HTML entities', () => {
  const html = 'AT&amp;T &lt;script&gt; &quot;test&quot;';
  const result = sanitizeHtml(html);

  assert.strictEqual(result, 'AT&T <script> "test"');
});

test('sanitizeHtml - should handle empty input', () => {
  assert.strictEqual(sanitizeHtml(''), '');
  assert.strictEqual(sanitizeHtml(null), '');
  assert.strictEqual(sanitizeHtml(undefined), '');
});

test('deduplicateItems - should remove duplicate links', () => {
  const items = [
    { title: 'Item 1', link: 'https://example.com/1', pubDate: '2024-01-01T00:00:00Z' },
    { title: 'Item 2', link: 'https://example.com/1', pubDate: '2024-01-02T00:00:00Z' },
    { title: 'Item 3', link: 'https://example.com/2', pubDate: '2024-01-01T00:00:00Z' },
  ];

  const result = deduplicateItems(items);

  assert.strictEqual(result.length, 2);

  // Should keep the most recent duplicate
  const item1 = result.find(i => i.link === 'https://example.com/1');
  assert.strictEqual(item1.title, 'Item 2');
});

test('deduplicateItems - should handle items without links using title hash', () => {
  const items = [
    { title: 'Same Title', pubDate: '2024-01-01T00:00:00Z' },
    { title: 'Same Title', pubDate: '2024-01-02T00:00:00Z' },
    { title: 'Different Title', pubDate: '2024-01-01T00:00:00Z' },
  ];

  const result = deduplicateItems(items);

  assert.strictEqual(result.length, 2);
});

test('deduplicateItems - should preserve all unique items', () => {
  const items = [
    { title: 'Item 1', link: 'https://example.com/1', pubDate: '2024-01-01T00:00:00Z' },
    { title: 'Item 2', link: 'https://example.com/2', pubDate: '2024-01-01T00:00:00Z' },
    { title: 'Item 3', link: 'https://example.com/3', pubDate: '2024-01-01T00:00:00Z' },
  ];

  const result = deduplicateItems(items);

  assert.strictEqual(result.length, 3);
});

test('extractTags - should handle mixed case', () => {
  const text = 'cve-2024-1234 and Ransomware and Zero-Day';
  const tags = extractTags(text);

  assert.ok(tags.includes('CVE-2024-1234'));
  assert.ok(tags.includes('RANSOMWARE'));
  assert.ok(tags.includes('ZERO-DAY'));
});

test('extractTags - should not duplicate tags', () => {
  const text = 'CVE-2024-1234 and CVE-2024-1234 mentioned twice';
  const tags = extractTags(text);

  const cveCount = tags.filter(t => t === 'CVE-2024-1234').length;
  assert.strictEqual(cveCount, 1);
});

test('sanitizeHtml - should prevent XSS attempts', () => {
  const xssAttempts = [
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert(1)>',
    'javascript:alert(1)',
    '<iframe src="javascript:alert(1)">',
  ];

  xssAttempts.forEach(attempt => {
    const result = sanitizeHtml(attempt);
    assert.ok(!result.includes('<script'));
    assert.ok(!result.includes('onerror'));
    assert.ok(!result.includes('onload'));
  });
});
