# 🚀 Deployment Guide

Step-by-step guide to deploy APT Tracker from scratch.

## Prerequisites Checklist

- [ ] Node.js 20+ installed
- [ ] Git installed
- [ ] Cloudflare account (free tier works)
- [ ] GitHub account
- [ ] 15 minutes of time

## Step 1: Cloudflare Setup

### 1.1 Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for a free account
3. Verify your email

### 1.2 Get API Token

1. Go to [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Add these permissions:
   - Account → Workers Scripts → Edit
   - Account → Workers KV Storage → Edit
5. Click "Continue to summary" → "Create Token"
6. **Save this token securely** - you'll need it later

### 1.3 Get Account ID

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click on "Workers & Pages"
3. Your Account ID is shown on the right sidebar
4. **Copy and save this ID**

## Step 2: Local Setup

### 2.1 Clone Repository

```bash
git clone https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel.git
cd APT-Tracker-MITRE-AIQ-Intel
```

### 2.2 Install Dependencies

```bash
npm install
```

### 2.3 Login to Cloudflare

```bash
npx wrangler login
```

This will open a browser window. Authorize Wrangler.

## Step 3: Create KV Namespace

### 3.1 Create Namespace

```bash
npx wrangler kv:namespace create NEWS_KV
```

You'll see output like:

```
🌀 Creating namespace with title "apt-tracker-mitre-aiq-intel-NEWS_KV"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "NEWS_KV", id = "abc123def456..." }
```

### 3.2 Update wrangler.toml

Copy the `id` from the output above and update `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "NEWS_KV"
id = "YOUR_NAMESPACE_ID_HERE"  # Replace with your actual ID
```

## Step 4: Configure Environment

### 4.1 Create Local Config

```bash
cp .env.example .dev.vars
```

### 4.2 Update wrangler.toml

Edit `wrangler.toml` and update:

```toml
[vars]
ALLOWED_ORIGIN = "https://YOUR_GITHUB_USERNAME.github.io"
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Step 5: Deploy Worker

### 5.1 Deploy

```bash
npm run deploy
```

### 5.2 Note Your Worker URL

After deployment, you'll see:

```
Published apt-tracker-mitre-aiq-intel (X.XX sec)
  https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev
```

**Copy this URL** - you'll need it for the frontend.

### 5.3 Test the API

```bash
curl https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev/api/healthz
```

You should see a JSON response with `"status": "healthy"`.

## Step 6: Update Frontend

### 6.1 Edit app.js

Open `app.js` and find this line:

```javascript
const API_BASE = 'https://YOUR_WORKER_URL';
```

Replace with your actual worker URL:

```javascript
const API_BASE = 'https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev';
```

### 6.2 Commit Changes

```bash
git add app.js
git commit -m "Update API URL for production"
git push origin main
```

## Step 7: Enable GitHub Pages

### 7.1 Configure Pages

1. Go to your GitHub repository
2. Click "Settings" tab
3. Click "Pages" in the left sidebar
4. Under "Source":
   - Select "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### 7.2 Wait for Deployment

GitHub will build and deploy your site. This takes 1-2 minutes.

You'll see a message: "Your site is live at https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel"

## Step 8: Configure GitHub Actions

### 8.1 Add Secrets

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

**CLOUDFLARE_API_TOKEN**

- Name: `CLOUDFLARE_API_TOKEN`
- Value: The API token from Step 1.2

**CLOUDFLARE_ACCOUNT_ID**

- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: The Account ID from Step 1.3

### 8.2 Trigger First Deployment

```bash
git commit --allow-empty -m "Trigger CI/CD"
git push origin main
```

Go to the "Actions" tab in GitHub to watch the deployment.

## Step 9: Verify Everything Works

### 9.1 Check API

```bash
curl https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev/api/threats
```

Should return JSON with threat items.

### 9.2 Check Dashboard

Open: `https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel`

You should see:

- ✅ Current Threats list populated
- ✅ Trends charts (may be empty initially)
- ✅ No console errors

### 9.3 Check Health

```bash
curl https://apt-tracker-mitre-aiq-intel.YOUR_SUBDOMAIN.workers.dev/api/healthz
```

Should return `"status": "healthy"`.

## Step 10: Optional - Twitter/X Integration

### 10.1 Get Twitter API Access

1. Apply for Twitter Developer account
2. Create a new app
3. Get Bearer Token

### 10.2 Create Twitter List

1. Go to Twitter/X
2. Create a new List called "threat-intel"
3. Add accounts: @CISAgov, @FBI, @MSFTSecResponse, etc.
4. Get the List ID from the URL

### 10.3 Update Configuration

Edit `wrangler.toml`:

```toml
[vars]
TW_BEARER = "YOUR_TWITTER_BEARER_TOKEN"
TW_LIST_ID = "YOUR_LIST_ID"
```

Redeploy:

```bash
npm run deploy
```

## Troubleshooting

### "Namespace not found" error

Make sure you updated the namespace ID in `wrangler.toml` correctly.

### CORS errors in browser

1. Check `ALLOWED_ORIGIN` in `wrangler.toml` matches your GitHub Pages URL exactly
2. Redeploy the worker: `npm run deploy`

### No data showing

1. Check browser console for errors
2. Verify API URL in `app.js` is correct
3. Test API directly with curl
4. Check worker logs: `npx wrangler tail`

### GitHub Actions failing

1. Verify secrets are set correctly
2. Check the Actions tab for error messages
3. Ensure you have write permissions for the repository

## Next Steps

- [ ] Run discovery scraper: `POST /api/discovery/refresh`
- [ ] Review and approve candidate sources
- [ ] Customize feed sources in `wrangler.toml`
- [ ] Set up monitoring and alerts
- [ ] Share your dashboard!

## One-Line Deploy Command

After initial setup, deploy everything with:

```bash
npm run deploy && git add app.js && git commit -m "Deploy" && git push
```

## Embed Snippet

Add this to any webpage:

```html
<iframe
  src="https://YOUR_USERNAME.github.io/APT-Tracker-MITRE-AIQ-Intel"
  width="100%"
  height="800"
  frameborder="0"
  title="APT Tracker Dashboard"
>
</iframe>
```

---

🎉 **Congratulations!** Your threat intelligence dashboard is now live!
