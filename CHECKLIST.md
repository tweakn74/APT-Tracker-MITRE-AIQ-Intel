# ✅ Will It Work? Checklist

Quick verification checklist to ensure everything is working correctly.

## Pre-Deployment

- [ ] Node.js 20+ installed (`node --version`)
- [ ] Dependencies installed (`npm install` completed without errors)
- [ ] Cloudflare account created
- [ ] Cloudflare API token obtained
- [ ] Cloudflare Account ID obtained
- [ ] KV namespace created
- [ ] `wrangler.toml` updated with KV namespace ID
- [ ] `wrangler.toml` updated with correct `ALLOWED_ORIGIN`
- [ ] Tests pass (`npm test`)
- [ ] Linter passes (`npm run lint`)
- [ ] Type check passes (`npm run type-check`)

## Worker Deployment

- [ ] Worker deployed successfully (`npm run deploy`)
- [ ] Worker URL obtained and saved
- [ ] Health check returns healthy: `curl https://YOUR_WORKER_URL/api/healthz`
- [ ] Threats endpoint returns data: `curl https://YOUR_WORKER_URL/api/threats`
- [ ] No errors in worker logs (`npx wrangler tail`)

## Frontend Deployment

- [ ] `app.js` updated with correct `API_BASE` URL
- [ ] Changes committed and pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] GitHub Pages deployment successful
- [ ] Dashboard loads without errors
- [ ] No mixed content warnings (all HTTPS)
- [ ] No console errors in browser DevTools
- [ ] Current Threats list shows items
- [ ] Trends charts render (may be empty initially)
- [ ] New Sources widget displays
- [ ] Status indicators show "Live" (green)

## Data Flow

- [ ] `/api/threats` returns items from default feeds
- [ ] Items have proper tags (CVE, MITRE ATT&CK, keywords)
- [ ] Items are deduplicated correctly
- [ ] Items are sorted by date (most recent first)
- [ ] `/api/trends` returns buckets for last 24 hours
- [ ] Trends data updates after fetching threats
- [ ] `/api/sources` returns approved and candidate sources

## Optional Features

- [ ] Twitter/X List integration working (if configured)
- [ ] Discovery scraper finds candidates (`POST /api/discovery/refresh`)
- [ ] Source approval flow works (`POST /api/sources/approve`)
- [ ] Domain blocking works (`POST /api/sources/block`)

## CI/CD Pipeline

- [ ] GitHub Actions secrets configured:
  - [ ] `CLOUDFLARE_API_TOKEN`
  - [ ] `CLOUDFLARE_ACCOUNT_ID`
- [ ] CI pipeline runs on PR (lint, type-check, test)
- [ ] CD pipeline runs on merge to main (deploy, backup, tag)
- [ ] Worker deploys automatically
- [ ] GitHub Pages deploys automatically
- [ ] Backup artifacts created
- [ ] Git tags created with format `threats-vYYMMDD-HHMM`

## Performance

- [ ] Build completes in < 2 minutes
- [ ] `/api/threats` responds in < 500ms (cached)
- [ ] `/api/trends` responds in < 500ms
- [ ] Dashboard loads in < 3 seconds
- [ ] No memory leaks in browser (check DevTools Performance)
- [ ] Lighthouse score >= 90 for Performance
- [ ] Lighthouse score >= 90 for Accessibility

## Security

- [ ] No secrets hardcoded in code
- [ ] All config via environment variables
- [ ] CORS restricted to allowed origin only
- [ ] CSP headers present in API responses
- [ ] `X-Content-Type-Options: nosniff` header present
- [ ] HTML sanitization working (no XSS in titles)
- [ ] Rate limiting enforced
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info

## Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] `aria-live` regions update correctly
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Screen reader friendly
- [ ] No accessibility errors in Lighthouse

## Monitoring

- [ ] Structured logs visible in Cloudflare dashboard
- [ ] Error tracking working
- [ ] Health check endpoint accessible
- [ ] Feed health tracking working
- [ ] Can view worker metrics in Cloudflare dashboard

## Backups

- [ ] KV export script works (`npm run kv:export`)
- [ ] Backup script works (`npm run backup`)
- [ ] Artifacts stored in GitHub Actions
- [ ] Nightly backup scheduled (check `.github/workflows/ci.yml`)

## Documentation

- [ ] README is complete and accurate
- [ ] API endpoints documented
- [ ] Configuration options explained
- [ ] Deployment guide clear
- [ ] Troubleshooting section helpful
- [ ] Embed snippet provided

## Final Verification

Run these commands and verify output:

```bash
# 1. Health check
curl https://YOUR_WORKER_URL/api/healthz
# Expected: {"status":"healthy",...}

# 2. Get threats
curl https://YOUR_WORKER_URL/api/threats?limit=5
# Expected: {"updated":"...","count":5,"items":[...]}

# 3. Get trends
curl https://YOUR_WORKER_URL/api/trends
# Expected: {"buckets":[...],"period":"24h"}

# 4. Get sources
curl https://YOUR_WORKER_URL/api/sources
# Expected: {"approved":[...],"candidates":[...],"recentlyApproved":[]}
```

## Browser Checks

Open dashboard in browser and verify:

1. **Console (F12)**
   - [ ] No errors
   - [ ] No warnings (except Chart.js SRI if not updated)
   - [ ] API calls succeed (200 status)

2. **Network Tab**
   - [ ] All requests HTTPS
   - [ ] API responses cached (check headers)
   - [ ] No 404s or 500s

3. **Application Tab**
   - [ ] No localStorage errors
   - [ ] No cookie warnings

4. **Lighthouse Audit**
   - [ ] Performance >= 90
   - [ ] Accessibility >= 90
   - [ ] Best Practices >= 90
   - [ ] SEO >= 90

## Interview Ready?

- [ ] Dashboard is live and accessible
- [ ] Data is updating automatically
- [ ] No errors or warnings
- [ ] Professional appearance
- [ ] Fast load times
- [ ] Mobile responsive
- [ ] Can explain architecture
- [ ] Can explain security measures
- [ ] Can explain CI/CD pipeline
- [ ] Can demonstrate live updates

## Common Issues

### ❌ CORS errors
**Fix:** Update `ALLOWED_ORIGIN` in `wrangler.toml` and redeploy

### ❌ No data showing
**Fix:** Check `API_BASE` in `app.js` matches worker URL

### ❌ 404 on API calls
**Fix:** Verify worker is deployed and URL is correct

### ❌ KV errors
**Fix:** Verify namespace ID in `wrangler.toml` is correct

### ❌ GitHub Actions failing
**Fix:** Check secrets are set correctly in repository settings

---

## Quick Test Script

Save this as `test-deployment.sh`:

```bash
#!/bin/bash

WORKER_URL="https://YOUR_WORKER_URL"

echo "Testing APT Tracker deployment..."
echo ""

echo "1. Health check..."
curl -s "$WORKER_URL/api/healthz" | jq .status

echo ""
echo "2. Threats endpoint..."
curl -s "$WORKER_URL/api/threats?limit=1" | jq '.count'

echo ""
echo "3. Trends endpoint..."
curl -s "$WORKER_URL/api/trends" | jq '.buckets | length'

echo ""
echo "4. Sources endpoint..."
curl -s "$WORKER_URL/api/sources" | jq '.approved | length'

echo ""
echo "✅ All tests passed!"
```

Run with: `bash test-deployment.sh`

---

**If all items are checked, you're ready to go! 🚀**

