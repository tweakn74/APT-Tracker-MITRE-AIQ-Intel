/**
 * E2E Tests for Executive Metrics Landing Page (Dashboard 2)
 * Verifies the 4-metric card grid on the main landing page
 */

import { test, expect } from '@playwright/test';

test.describe('Executive Metrics Landing Page - Dashboard 2', () => {
  test('Landing page loads and displays all metric cards', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('.executive-metrics-grid', { timeout: 10000 });

    // Verify page title
    await expect(page).toHaveTitle(/WatchLockAI.*Executive Dashboard/);

    // Verify header
    const header = page.locator('h1');
    await expect(header).toContainText('WatchLockAI');

    const subtitle = page.locator('.subtitle');
    await expect(subtitle).toContainText('Enterprise Threat Intelligence Platform');

    // Verify Executive Metrics Grid exists
    const metricsGrid = page.locator('.executive-metrics-grid');
    await expect(metricsGrid).toBeVisible();

    // Verify all 4 metric cards are present
    const metricCards = page.locator('.metric-card');
    await expect(metricCards).toHaveCount(4);
  });

  test('APT Groups metric displays correct data', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Wait for data to load
    await page.waitForFunction(() => {
      const metric = document.getElementById('aptGroupsMetric');
      return metric && metric.textContent !== '-';
    }, { timeout: 10000 });

    // Verify APT Groups card
    const aptCard = page.locator('.metric-card.metric-gradient-blue');
    await expect(aptCard).toBeVisible();
    await expect(aptCard.locator('.metric-icon')).toHaveText('🎯');
    await expect(aptCard.locator('.metric-label')).toContainText('Total APT Groups Tracked');
    
    const aptCount = await aptCard.locator('.metric-large').textContent();
    expect(parseInt(aptCount)).toBe(8);

    const aptTrend = aptCard.locator('.metric-trend');
    await expect(aptTrend).toBeVisible();
    await expect(aptTrend).toHaveClass(/trend-up/);
  });

  test('Active Threat Actors metric displays correct data', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Wait for data to load
    await page.waitForFunction(() => {
      const metric = document.getElementById('activeActorsMetric');
      return metric && metric.textContent !== '-';
    }, { timeout: 10000 });

    // Verify Active Actors card
    const actorsCard = page.locator('.metric-card.metric-gradient-green');
    await expect(actorsCard).toBeVisible();
    await expect(actorsCard.locator('.metric-icon')).toHaveText('⚡');
    await expect(actorsCard.locator('.metric-label')).toContainText('Active Threat Actors');
    
    const actorsCount = await actorsCard.locator('.metric-large').textContent();
    expect(parseInt(actorsCount)).toBeGreaterThan(0);
    expect(parseInt(actorsCount)).toBeLessThanOrEqual(8);

    const actorsTrend = actorsCard.locator('.metric-trend');
    await expect(actorsTrend).toBeVisible();
  });

  test('Detection Rules metric displays correct data', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Wait for data to load
    await page.waitForFunction(() => {
      const metric = document.getElementById('detectionsMetric');
      return metric && metric.textContent !== '-';
    }, { timeout: 10000 });

    // Verify Detections card
    const detectionsCard = page.locator('.metric-card.metric-gradient-purple');
    await expect(detectionsCard).toBeVisible();
    await expect(detectionsCard.locator('.metric-icon')).toHaveText('🛡️');
    await expect(detectionsCard.locator('.metric-label')).toContainText('Detection Rules Deployed');
    
    const detectionsCount = await detectionsCard.locator('.metric-large').textContent();
    expect(parseInt(detectionsCount)).toBe(15);

    const detectionsTrend = detectionsCard.locator('.metric-trend');
    await expect(detectionsTrend).toBeVisible();
    await expect(detectionsTrend).toHaveClass(/trend-up/);
  });

  test('MITRE Techniques metric displays correct data', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Wait for data to load
    await page.waitForFunction(() => {
      const metric = document.getElementById('techniquesMetric');
      return metric && metric.textContent !== '-';
    }, { timeout: 10000 });

    // Verify Techniques card
    const techniquesCard = page.locator('.metric-card.metric-gradient-orange');
    await expect(techniquesCard).toBeVisible();
    await expect(techniquesCard.locator('.metric-icon')).toHaveText('📊');
    await expect(techniquesCard.locator('.metric-label')).toContainText('MITRE Techniques Covered');
    
    const techniquesCount = await techniquesCard.locator('.metric-large').textContent();
    expect(parseInt(techniquesCount)).toBeGreaterThan(0);

    const techniquesTrend = techniquesCard.locator('.metric-trend');
    await expect(techniquesTrend).toBeVisible();
    await expect(techniquesTrend).toHaveClass(/trend-up/);
  });

  test('Metric cards have hover effects', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Get the first metric card
    const firstCard = page.locator('.metric-card').first();

    // Hover over the card
    await firstCard.hover();

    // Verify the card has a transform applied
    const transform = await firstCard.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });

    expect(transform).not.toBe('none');
  });

  test('Navigation links are present and functional', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.nav-links');

    // Verify navigation section
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();

    // Verify APT Profiles link
    const aptLink = page.locator('.nav-card').filter({ hasText: 'APT Profiles' });
    await expect(aptLink).toBeVisible();
    await expect(aptLink).toHaveAttribute('href', 'apt-profiles.html');

    // Verify Detection Engineering link
    const detectionsLink = page.locator('.nav-card').filter({ hasText: 'Detection Engineering' });
    await expect(detectionsLink).toBeVisible();
    await expect(detectionsLink).toHaveAttribute('href', 'detections.html');
  });

  test('Clicking metric cards navigates to correct pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Click APT Groups card
    const aptCard = page.locator('.metric-card.metric-gradient-blue');
    await aptCard.click();

    // Verify navigation to APT Profiles page
    await expect(page).toHaveURL(/apt-profiles\.html/);
    await page.goBack();

    // Click Detections card
    const detectionsCard = page.locator('.metric-card.metric-gradient-purple');
    await detectionsCard.click();

    // Verify navigation to Detections page
    await expect(page).toHaveURL(/detections\.html/);
  });

  test('Page is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Verify grid is visible
    const metricsGrid = page.locator('.executive-metrics-grid');
    await expect(metricsGrid).toBeVisible();

    // Verify all cards are still visible
    const metricCards = page.locator('.metric-card');
    await expect(metricCards).toHaveCount(4);

    // Verify navigation links are visible
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();
  });

  test('Page handles data loading errors gracefully', async ({ page }) => {
    // Intercept data requests and return errors
    await page.route('**/data/apt-profiles.json', route => route.abort());
    await page.route('**/data/detections.json', route => route.abort());

    await page.goto('/');
    await page.waitForSelector('.executive-metrics-grid');

    // Wait a bit for the error handling to kick in
    await page.waitForTimeout(2000);

    // Verify error state (metrics should show '?')
    const aptMetric = await page.locator('#aptGroupsMetric').textContent();
    expect(aptMetric).toBe('?');
  });

  test('Footer is present with correct information', async ({ page }) => {
    await page.goto('/');

    // Verify footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('WatchLockAI');
    await expect(footer).toContainText('Enterprise Threat Intelligence Platform');
    await expect(footer).toContainText('MITRE ATT&CK Framework');
  });
});

