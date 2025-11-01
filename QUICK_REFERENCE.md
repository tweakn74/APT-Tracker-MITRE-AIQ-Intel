# 📋 Quick Reference Card

## Essential Commands

### Development

```bash
npm run dev              # Start local dev server
npm test                 # Run tests
npm run lint             # Run linter
npm run type-check       # TypeScript type checking
```

### Deployment

```bash
npm run deploy           # Deploy worker to Cloudflare
git push origin main     # Deploy frontend to GitHub Pages
```

### Maintenance

```bash
npm run kv:export        # Export KV data
npm run backup           # Full backup (code + KV)
npx wrangler tail        # View worker logs
npx wrangler kv:key list --binding=NEWS_KV  # List KV keys
```

## API Endpoints

| Endpoint                 | Method | Description                        |
| ------------------------ | ------ | ---------------------------------- |
| `/api/threats`           | GET    | Get threat intelligence items      |
| `/api/trends`            | GET    | Get hourly trend buckets           |
| `/api/sources`           | GET    | Get approved and candidate sources |
| `/api/sources/approve`   | POST   | Approve a candidate source         |
| `/api/sources/block`     | POST   | Block a domain                     |
| `/api/discovery/refresh` | POST   | Run discovery scraper              |
| `/api/healthz`           | GET    | Health check                       |

## Query Parameters

### /api/threats

- `limit` - Number of items (default: 60, max: 100)
- `after` - ISO-8601 date (only items after this date)
- `tag` - Filter by tag (e.g., `CVE-2024-1234`, `RANSOMWARE`)
- `q` - Search query (matches title and description)

## Environment Variables

| Variable         | Required | Description                     |
| ---------------- | -------- | ------------------------------- |
| `NEWS_KV`        | ✅       | KV namespace binding            |
| `ALLOWED_ORIGIN` | ✅       | CORS origin                     |
| `DEFAULT_FEEDS`  | ✅       | Comma-separated feed URLs       |
| `BLOCKLIST`      | ❌       | Comma-separated blocked domains |
| `TW_BEARER`      | ❌       | Twitter API bearer token        |
| `TW_LIST_ID`     | ❌       | Twitter List ID                 |

## KV Keys

| Key                           | Type        | Description                      |
| ----------------------------- | ----------- | -------------------------------- |
| `sources:approved`            | JSON array  | Approved feed sources            |
| `sources:candidates`          | JSON array  | Candidate sources from discovery |
| `trends:YYYY-MM-DDTHH:00:00Z` | JSON object | Hourly trend bucket              |
| `settings:blocked_domains`    | JSON array  | Blocked domains                  |
| `settings:x_handles`          | JSON array  | Twitter handles (future)         |

## Tag Types

| Tag          | Pattern                | Example                                    |
| ------------ | ---------------------- | ------------------------------------------ |
| CVE          | `CVE-YYYY-NNNNN`       | `CVE-2024-1234`                            |
| MITRE ATT&CK | `T####` or `T####.###` | `T1059`, `T1059.001`                       |
| CWE          | `CWE-###`              | `CWE-79`                                   |
| Keyword      | Various                | `RANSOMWARE`, `ZERO-DAY`, `APT`, `MALWARE` |
| Priority     | Auto-tagged            | `HIGH-PRIORITY` (CISA KEV items)           |

## File Structure

```
.
├── worker/              # Cloudflare Worker
│   ├── index.js        # Main entry point
│   └── lib/            # Library modules
├── tests/              # Test suite
├── scripts/            # Utility scripts
├── .github/workflows/  # CI/CD pipelines
├── index.html          # Frontend dashboard
├── app.js              # Frontend JavaScript
├── package.json        # Dependencies
├── wrangler.toml       # Worker config
└── README.md           # Documentation
```

## Common Tasks

### Add a New Feed Source

1. Edit `wrangler.toml`:

   ```toml
   DEFAULT_FEEDS = "https://existing.com/feed,https://new.com/feed"
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

### View Worker Logs

```bash
npx wrangler tail
```

### Test API Locally

```bash
npm run dev
# In another terminal:
curl http://localhost:8787/api/threats
```

### Export KV Data

```bash
export CLOUDFLARE_API_TOKEN="your_token"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
npm run kv:export
```

### Approve a Candidate Source

```bash
curl -X POST https://YOUR_WORKER_URL/api/sources/approve \
  -H "Content-Type: application/json" \
  -d '{"url":"https://newsource.com/feed.xml"}'
```

### Block a Domain

```bash
curl -X POST https://YOUR_WORKER_URL/api/sources/block \
  -H "Content-Type: application/json" \
  -d '{"domain":"spam.com"}'
```

### Run Discovery Scraper

```bash
curl -X POST https://YOUR_WORKER_URL/api/discovery/refresh
```

## Troubleshooting

### Worker not deploying

```bash
npx wrangler whoami  # Verify authentication
npx wrangler kv:namespace list  # Verify KV access
```

### CORS errors

1. Check `ALLOWED_ORIGIN` in `wrangler.toml`
2. Redeploy: `npm run deploy`

### No data in dashboard

1. Check browser console (F12)
2. Verify `API_BASE` in `app.js`
3. Test API: `curl https://YOUR_WORKER_URL/api/threats`

### KV errors

```bash
# List namespaces
npx wrangler kv:namespace list

# Verify binding in wrangler.toml
cat wrangler.toml | grep -A 2 kv_namespaces
```

## URLs

| Resource             | URL                                                                    |
| -------------------- | ---------------------------------------------------------------------- |
| Worker               | `https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev`       |
| Dashboard            | `https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel`          |
| Cloudflare Dashboard | `https://dash.cloudflare.com`                                          |
| GitHub Actions       | `https://github.com/YOUR_USERNAME/APT-Tracker-MITRE-AIQ-Intel/actions` |

## Performance Targets

| Metric                   | Target      |
| ------------------------ | ----------- |
| Build time               | < 2 minutes |
| API response (cached)    | < 500ms     |
| Dashboard load           | < 3 seconds |
| Lighthouse Performance   | >= 90       |
| Lighthouse Accessibility | >= 90       |

## Security Checklist

- ✅ No secrets in code
- ✅ CORS restricted
- ✅ CSP headers
- ✅ Input validation
- ✅ HTML sanitization
- ✅ Rate limiting
- ✅ HTTPS only

## Monitoring

### Check Health

```bash
curl https://YOUR_WORKER_URL/api/healthz | jq
```

### View Metrics

1. Go to Cloudflare Dashboard
2. Workers & Pages → apt-tracker-mitre-aiq-intel
3. View metrics, logs, and analytics

### GitHub Actions Status

```bash
# View latest workflow runs
gh run list

# View specific run
gh run view RUN_ID
```

## Backup & Restore

### Backup

```bash
npm run backup
# Creates:
# - artifacts/backup-TIMESTAMP.zip
# - backups/kv-dump-TIMESTAMP.json
# - backups/manifest-TIMESTAMP.json
```

### Restore

```bash
# 1. Extract artifact
unzip artifacts/backup-TIMESTAMP.zip

# 2. Deploy worker
npm run deploy

# 3. Restore KV data (manual)
# Use Cloudflare dashboard or wrangler CLI
```

## Embed Snippets

### Full Dashboard

```html
<iframe
  src="https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel"
  width="100%"
  height="800"
  frameborder="0"
>
</iframe>
```

### Custom Widget

```html
<div id="threats"></div>
<script>
  fetch('https://YOUR_WORKER_URL/api/threats?limit=5')
    .then(r => r.json())
    .then(d => {
      document.getElementById('threats').innerHTML = d.items
        .map(i => `<div>${i.title}</div>`)
        .join('');
    });
</script>
```

## Support

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- ✅ [Checklist](CHECKLIST.md)
- 🤝 [Contributing](CONTRIBUTING.md)
- 🐛 [Issues](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/issues)

---

**Quick Deploy:** `npm run deploy && git push`
