# 🚀 Getting Started - 5 Minute Setup

This guide will get your APT Tracker dashboard live in about 5 minutes.

## Prerequisites

- ✅ Node.js 20+ installed
- ✅ GitHub account
- ✅ Cloudflare account (free tier works)

## Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

## Step 2: Cloudflare Setup (2 minutes)

### Login to Cloudflare

```bash
npx wrangler login
```

This opens a browser window. Click "Allow" to authorize.

### Create KV Namespace

```bash
npx wrangler kv:namespace create NEWS_KV
```

**Copy the namespace ID** from the output. It looks like:
```
{ binding = "NEWS_KV", id = "abc123def456..." }
```

### Update Configuration

Edit `wrangler.toml` and replace `YOUR_KV_NAMESPACE_ID` with your actual ID:

```toml
[[kv_namespaces]]
binding = "NEWS_KV"
id = "abc123def456..."  # Your actual ID here
```

Also update the allowed origin with your GitHub username:

```toml
[vars]
ALLOWED_ORIGIN = "https://YOUR_GITHUB_USERNAME.github.io"
```

## Step 3: Deploy Worker (1 minute)

```bash
npm run deploy
```

**Save your worker URL** from the output:
```
Published apt-tracker-mitre-aiq-intel (X.XX sec)
  https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev
```

### Test It

```bash
curl https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev/api/healthz
```

You should see: `{"status":"healthy",...}`

## Step 4: Update Frontend (30 seconds)

Edit `app.js` and replace `YOUR_WORKER_URL`:

```javascript
const API_BASE = 'https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev';
```

## Step 5: Deploy to GitHub Pages (1 minute)

### Commit and Push

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

Wait 1-2 minutes for deployment.

## Step 6: Verify (30 seconds)

### Check Your Dashboard

Open: `https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel`

You should see:
- ✅ Current Threats list with items
- ✅ Trends charts
- ✅ New Sources widget
- ✅ No console errors (press F12)

### Test the API

```bash
# Get threats
curl https://YOUR_WORKER_URL/api/threats?limit=5

# Get trends
curl https://YOUR_WORKER_URL/api/trends

# Get sources
curl https://YOUR_WORKER_URL/api/sources
```

## Step 7: Set Up CI/CD (Optional, 1 minute)

### Add GitHub Secrets

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Get from [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
4. Add:
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: Get from [Cloudflare Dashboard](https://dash.cloudflare.com)

Now every push to `main` will automatically deploy!

## 🎉 You're Done!

Your threat intelligence dashboard is now live at:
**https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel**

## What's Next?

### Customize Feed Sources

Edit `wrangler.toml` to add more feeds:

```toml
DEFAULT_FEEDS = "https://example.com/feed.xml,https://another.com/rss"
```

Then redeploy:

```bash
npm run deploy
```

### Discover New Sources

Run the discovery scraper:

```bash
curl -X POST https://YOUR_WORKER_URL/api/discovery/refresh
```

Then check candidates:

```bash
curl https://YOUR_WORKER_URL/api/sources
```

Approve a source:

```bash
curl -X POST https://YOUR_WORKER_URL/api/sources/approve \
  -H "Content-Type: application/json" \
  -d '{"url":"https://newsource.com/feed.xml"}'
```

### Add Twitter/X Integration (Optional)

1. Get Twitter API access and create a List
2. Edit `wrangler.toml`:
   ```toml
   TW_BEARER = "YOUR_BEARER_TOKEN"
   TW_LIST_ID = "YOUR_LIST_ID"
   ```
3. Redeploy: `npm run deploy`

### Embed on Your Website

Add this to any page:

```html
<iframe 
  src="https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel" 
  width="100%" 
  height="800" 
  frameborder="0">
</iframe>
```

## Troubleshooting

### "Namespace not found" error

Make sure you updated the namespace ID in `wrangler.toml` correctly.

### CORS errors in browser

1. Check `ALLOWED_ORIGIN` in `wrangler.toml` matches your GitHub Pages URL exactly
2. Redeploy: `npm run deploy`

### No data showing

1. Open browser console (F12) and check for errors
2. Verify `API_BASE` in `app.js` is correct
3. Test API directly: `curl https://YOUR_WORKER_URL/api/threats`

### Worker not deploying

```bash
# Check authentication
npx wrangler whoami

# Check KV namespaces
npx wrangler kv:namespace list
```

## Useful Commands

```bash
# Local development
npm run dev

# Run tests
npm test

# View worker logs
npx wrangler tail

# Export KV data
npm run kv:export

# Full backup
npm run backup
```

## Documentation

- 📖 [README.md](README.md) - Full documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- ✅ [CHECKLIST.md](CHECKLIST.md) - Verification checklist
- 📋 [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

## Support

- **Issues**: [GitHub Issues](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/discussions)

---

**Need help?** Check the [troubleshooting section](#troubleshooting) or open an issue!

**Ready for your interview?** Your dashboard is live and production-ready! 🎯

