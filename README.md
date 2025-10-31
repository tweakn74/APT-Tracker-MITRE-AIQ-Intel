# 🛡️ APT Tracker - MITRE ATT&CK Intelligence Aggregator

Production-ready threat intelligence aggregator and trends dashboard that merges multiple threat sources, normalizes data, tags items with CVE and MITRE ATT&CK technique IDs, and provides real-time trends analysis.

**Live Demo:** [https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel](https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel)

## 🎯 Features

- **Serverless Aggregator API** - Cloudflare Worker that merges RSS/Atom/JSON feeds
- **Intelligent Tagging** - Automatically extracts CVE IDs, MITRE ATT&CK techniques (T####), CWE IDs, and keywords
- **Trends Engine** - Hourly bucketing with 7-day retention for source and tag analytics
- **Discovery Scraper** - Finds new threat intel sources from curated directories
- **Real-time Dashboard** - GitHub Pages frontend with live updates every 3 minutes
- **Full CI/CD Pipeline** - Automated testing, deployment, backups, and versioning
- **Security Hardening** - Input validation, XSS prevention, CORS, CSP headers, rate limiting

## 📋 Table of Contents

- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Embedding Widgets](#embedding-widgets)
- [Development](#development)
- [Testing](#testing)
- [Backups & Versioning](#backups--versioning)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## 🏗️ Architecture

```
┌─────────────────┐
│  GitHub Pages   │  Frontend (HTML/JS/CSS)
│   Dashboard     │  - Current Threats List
└────────┬────────┘  - Trends Charts
         │           - New Sources Widget
         │ HTTPS
         ▼
┌─────────────────┐
│ Cloudflare      │  Serverless API
│    Worker       │  - /api/threats
└────────┬────────┘  - /api/trends
         │           - /api/sources
         │           - /api/discovery/refresh
         ▼
┌─────────────────┐
│  Cloudflare KV  │  Storage
│   Namespace     │  - Approved sources
└─────────────────┘  - Candidates
                     - Trends buckets
                     - Settings
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Cloudflare account (free tier works)
- GitHub account

### 1. Clone and Install

```bash
git clone https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel.git
cd APT-Tracker-MITRE-AIQ-Intel
npm install
```

### 2. Create Cloudflare KV Namespace

```bash
# Login to Cloudflare
npx wrangler login

# Create KV namespace
npx wrangler kv:namespace create NEWS_KV

# Copy the namespace ID from output and update wrangler.toml
```

### 3. Configure Environment

Copy `.env.example` to `.dev.vars` for local development:

```bash
cp .env.example .dev.vars
```

Edit `.dev.vars` and set your values. Update `wrangler.toml` with your KV namespace ID.

### 4. Deploy Worker

```bash
npm run deploy
```

### 5. Update Frontend API URL

Edit `app.js` and replace `YOUR_WORKER_URL` with your deployed worker URL:

```javascript
const API_BASE = 'https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev';
```

### 6. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Save

Your dashboard will be live at: `https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel`

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEWS_KV` | Yes | KV namespace binding (set in wrangler.toml) |
| `ALLOWED_ORIGIN` | Yes | CORS origin (e.g., `https://tweakn74.github.io`) |
| `DEFAULT_FEEDS` | Yes | Comma-separated list of RSS/Atom/JSON feed URLs |
| `BLOCKLIST` | No | Comma-separated list of blocked domains |
| `TW_BEARER` | No | Twitter/X API bearer token (optional) |
| `TW_LIST_ID` | No | Twitter/X List ID (optional) |

### Default Feed Sources

The following sources are pre-configured:

- CISA News & KEV (Known Exploited Vulnerabilities)
- Microsoft Security Response Center
- Google Project Zero
- The Record
- BleepingComputer
- Krebs on Security
- US-CERT
- NCSC UK
- Microsoft Security Blog
- Cisco Talos
- Mandiant

### Adding Custom Feeds

Edit `wrangler.toml` and add URLs to `DEFAULT_FEEDS`:

```toml
DEFAULT_FEEDS = "https://example.com/feed.xml,https://another.com/rss"
```

Or use the discovery API to find and approve new sources.

## 📡 API Endpoints

### GET /api/threats

Returns merged, normalized, and tagged threat intelligence items.

**Query Parameters:**
- `limit` (default: 60, max: 100) - Number of items to return
- `after` (ISO-8601) - Only items published after this date
- `tag` - Filter by tag (e.g., `CVE-2024-1234`, `RANSOMWARE`, `T1059`)
- `q` - Search query (matches title and description)

**Response:**
```json
{
  "updated": "2024-10-31T12:00:00Z",
  "count": 60,
  "items": [
    {
      "title": "Critical RCE in Apache Struts (CVE-2024-1234)",
      "link": "https://example.com/article",
      "pubDate": "2024-10-31T11:30:00Z",
      "description": "...",
      "source": "CISA",
      "tags": ["CVE-2024-1234", "HIGH-PRIORITY", "EXPLOIT"]
    }
  ]
}
```

### GET /api/trends

Returns hourly trend buckets for the last 24 hours.

**Response:**
```json
{
  "buckets": [
    {
      "bucket": "2024-10-31T11:00:00Z",
      "data": {
        "sources": {
          "CISA": 15,
          "MSRC": 8
        },
        "tags": {
          "CVE-2024-1234": 5,
          "RANSOMWARE": 3
        }
      }
    }
  ],
  "period": "24h"
}
```

### GET /api/sources

Returns approved and candidate sources.

**Response:**
```json
{
  "approved": [
    {
      "url": "https://example.com/feed.xml",
      "approvedAt": "2024-10-25T10:00:00Z"
    }
  ],
  "candidates": [
    {
      "url": "https://newsite.com/rss",
      "title": "New Security Blog",
      "discoveredAt": "2024-10-30T15:00:00Z"
    }
  ],
  "recentlyApproved": []
}
```

### POST /api/sources/approve

Approve a candidate source.

**Request:**
```json
{
  "url": "https://newsite.com/rss"
}
```

### POST /api/sources/block

Block a domain.

**Request:**
```json
{
  "domain": "spam.com"
}
```

### POST /api/discovery/refresh

Run the discovery scraper to find new sources.

**Response:**
```json
{
  "success": true,
  "candidatesFound": 12,
  "candidates": [...]
}
```

### GET /api/healthz

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-10-31T12:00:00Z",
  "checks": {
    "kv": "ok",
    "feeds": "ok",
    "feedCount": 12
  }
}
```

## 🚢 Deployment

### Cloudflare Worker

```bash
# Deploy to production
npm run deploy

# Deploy with specific environment
npx wrangler deploy --env production
```

### GitHub Pages

Automatically deployed via GitHub Actions on push to `main`.

Manual deployment:
1. Ensure `index.html` and `app.js` are in the repository root
2. Enable GitHub Pages in repository settings
3. Select `main` branch and `root` directory

### CI/CD Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers and KV permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## 🎨 Embedding Widgets

### Full Dashboard

```html
<iframe 
  src="https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="APT Tracker Dashboard">
</iframe>
```

### Custom Integration

```html
<div id="threat-feed"></div>

<script>
async function loadThreats() {
  const response = await fetch('https://YOUR_WORKER_URL/api/threats?limit=10');
  const data = await response.json();
  
  const html = data.items.map(item => `
    <div>
      <a href="${item.link}">${item.title}</a>
      <span>${item.source} - ${new Date(item.pubDate).toLocaleString()}</span>
    </div>
  `).join('');
  
  document.getElementById('threat-feed').innerHTML = html;
}

loadThreats();
setInterval(loadThreats, 3 * 60 * 1000); // Update every 3 minutes
</script>
```

## 💻 Development

### Local Development

```bash
# Start local dev server
npm run dev

# The worker will be available at http://localhost:8787
```

### Project Structure

```
.
├── worker/
│   ├── index.js           # Main worker entry point
│   └── lib/
│       ├── feeds.js       # Feed parsing and normalization
│       ├── trends.js      # Trends tracking
│       ├── sources.js     # Source management
│       ├── discovery.js   # Discovery scraper
│       └── utils.js       # Utilities and logging
├── tests/
│   ├── feeds.test.js      # Feed parser tests
│   └── trends.test.js     # Trends tests
├── scripts/
│   ├── kv_export.mjs      # KV export script
│   └── backup.mjs         # Backup script
├── index.html             # Frontend dashboard
├── app.js                 # Frontend JavaScript
├── package.json
├── wrangler.toml          # Cloudflare Worker config
└── README.md
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Run type check
npm run type-check
```

### Test Coverage

- ✅ Tag extraction (CVE, MITRE ATT&CK, CWE, keywords)
- ✅ HTML sanitization and XSS prevention
- ✅ Deduplication logic
- ✅ Trends aggregation
- ✅ Feed parsing (RSS, Atom, JSON)

## 💾 Backups & Versioning

### Automatic Backups

- **On Deploy:** Git tag + artifact bundle + KV export
- **Nightly:** Scheduled KV export at 2 AM UTC

### Manual Backup

```bash
# Export KV data
npm run kv:export

# Full backup (code + KV)
npm run backup
```

### Restore from Backup

```bash
# Download artifact from GitHub Actions
# Extract and deploy

# Restore KV data
node scripts/kv_restore.mjs backups/kv-dump-TIMESTAMP.json
```

## 🔒 Security

### Implemented Protections

- ✅ Input validation and sanitization
- ✅ XSS prevention (HTML escaping)
- ✅ CORS with strict origin checking
- ✅ Content Security Policy headers
- ✅ Rate limiting per host
- ✅ Timeout and retry with jitter
- ✅ No secrets in code (environment variables only)
- ✅ Structured logging with secret redaction

### Security Headers

All API responses include:
- `Content-Security-Policy: default-src 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`

## 🐛 Troubleshooting

### Worker not deploying

- Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set
- Check KV namespace ID in `wrangler.toml`
- Run `npx wrangler whoami` to verify authentication

### No data showing in dashboard

- Check browser console for errors
- Verify `API_BASE` in `app.js` points to your worker URL
- Test API directly: `curl https://YOUR_WORKER_URL/api/threats`
- Check CORS settings in `wrangler.toml`

### Feeds not updating

- Check `/api/healthz` endpoint
- Verify feed URLs are accessible
- Check Cloudflare Worker logs: `npx wrangler tail`

### KV export failing

- Ensure `CLOUDFLARE_API_TOKEN` has KV read permissions
- Verify namespace exists: `npx wrangler kv:namespace list`

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/issues)
- **Discussions:** [GitHub Discussions](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/discussions)

---

Built with ❤️ for the cybersecurity community

