# WatchLockAI Operations Guide

## Prerequisites

### Required Accounts
- **Cloudflare Account** (free tier)
- **GitHub Account**
- **Node.js** 18+ installed
- **Git** installed

### Required Tools
```bash
# Install wrangler CLI
npm install -g wrangler

# Verify installation
wrangler --version
```

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/tweakn74/WatchLockAI.git
cd WatchLockAI
npm install
```

### 2. Cloudflare Setup

#### Login to Cloudflare
```bash
wrangler login
```

#### Create KV Namespaces
```bash
# Production namespace
wrangler kv:namespace create "WATCHLOCK_KV"
# Output: { binding = "WATCHLOCK_KV", id = "abc123..." }

# Preview namespace (for development)
wrangler kv:namespace create "WATCHLOCK_KV" --preview
# Output: { binding = "WATCHLOCK_KV", preview_id = "xyz789..." }
```

#### Update wrangler.toml
Edit `services/worker/wrangler.toml` and replace placeholder IDs:
```toml
[[kv_namespaces]]
binding = "WATCHLOCK_KV"
id = "YOUR_PRODUCTION_KV_ID"
preview_id = "YOUR_PREVIEW_KV_ID"
```

#### Get Account ID
```bash
wrangler whoami
# Note your Account ID
```

### 3. GitHub Setup

#### Configure Repository Secrets
Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add the following secrets:
- `CF_API_TOKEN`: Cloudflare API token (create at https://dash.cloudflare.com/profile/api-tokens)
  - Template: "Edit Cloudflare Workers"
  - Permissions: Account.Workers Scripts (Edit), Account.Workers KV Storage (Edit)
- `CF_ACCOUNT_ID`: Your Cloudflare account ID

#### Enable GitHub Pages
1. Go to `Settings` → `Pages`
2. Source: `GitHub Actions`
3. Save

## Local Development

### Run Dashboard Locally
```bash
# Install dashboard dependencies
cd apps/intel-dashboard
npm install

# Development server (with hot reload)
npm run dev
# Opens at http://localhost:3000

# Production preview
npm run build
npm run preview
# Opens at http://localhost:4173
```

### Run Worker Locally
```bash
# From root directory
npm run worker:dev

# Or from worker directory
cd services/worker
wrangler dev
# Opens at http://localhost:8787
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:8787/health

# Get top threats
curl http://localhost:8787/api/top?limit=10

# Get all threats
curl http://localhost:8787/api/threats
```

## Deployment

### Manual Deployment

#### Deploy Worker
```bash
# From root
npm run worker:deploy

# Or from worker directory
cd services/worker
wrangler deploy
```

#### Deploy Dashboard
```bash
# Build dashboard
npm run build --workspace=apps/intel-dashboard

# GitHub Pages deploys automatically on push to main
# Or manually trigger via Actions tab
```

### Automated Deployment (CI/CD)

**Triggers**:
- Push to `main` branch
- Manual workflow dispatch

**Workflows**:
1. **CI** (`.github/workflows/ci.yml`)
   - Runs on every push/PR
   - Lints code
   - Validates schemas
   - Runs Playwright tests

2. **Pages** (`.github/workflows/pages.yml`)
   - Deploys dashboard to GitHub Pages
   - Runs on push to main

3. **Worker Deploy** (`.github/workflows/worker-deploy.yml`)
   - Deploys worker to Cloudflare
   - Runs when worker files change

## Monitoring

### Cloudflare Dashboard
1. Go to https://dash.cloudflare.com
2. Navigate to `Workers & Pages`
3. Click on `watchlockai-intel-api`
4. View metrics:
   - Requests per second
   - Error rate
   - CPU time
   - Invocations

### Worker Logs
```bash
# Tail live logs
wrangler tail

# Filter by status
wrangler tail --status error
```

### KV Storage Inspection
```bash
# List all keys
wrangler kv:key list --namespace-id=YOUR_KV_ID

# Get specific key
wrangler kv:key get "unified-threats" --namespace-id=YOUR_KV_ID

# Delete key (force refresh)
wrangler kv:key delete "unified-threats" --namespace-id=YOUR_KV_ID
```

### GitHub Pages Status
- Check deployment status: `Actions` tab
- View live site: https://tweakn74.github.io/WatchLockAI/

## Troubleshooting

### Worker Issues

#### Worker Not Updating
```bash
# Clear KV cache
wrangler kv:key delete "unified-threats" --namespace-id=YOUR_KV_ID
wrangler kv:key delete "top-threats" --namespace-id=YOUR_KV_ID

# Redeploy
wrangler deploy
```

#### 500 Errors
```bash
# Check logs
wrangler tail --status error

# Common causes:
# - KV namespace not configured
# - Feed source down
# - Invalid data format
```

#### Cron Not Running
1. Check Cloudflare dashboard → Workers → Triggers
2. Verify cron schedule: `*/15 * * * *`
3. Manually trigger: `wrangler deploy` (resets cron)

### Dashboard Issues

#### Dashboard Not Loading
1. Check GitHub Pages deployment status
2. Verify build succeeded in Actions tab
3. Check browser console for errors
4. Verify API endpoint is accessible

#### API Connection Failed
- Dashboard falls back to demo data automatically
- Check worker deployment status
- Verify CORS headers in worker response

#### Stale Data
- Dashboard auto-refreshes every 60 seconds
- Force refresh: Clear browser cache (Ctrl+Shift+R)
- Check worker cron is running

### CI/CD Issues

#### Workflow Failing
```bash
# Check workflow logs in Actions tab

# Common fixes:
# 1. Update secrets (CF_API_TOKEN, CF_ACCOUNT_ID)
# 2. Verify KV namespace IDs in wrangler.toml
# 3. Check Node.js version compatibility
```

#### Playwright Tests Failing
```bash
# Run locally
npm install
npx playwright install chromium
npm run build --workspace=apps/intel-dashboard
npx playwright test

# Debug mode
npx playwright test --debug
```

## Maintenance

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm update <package-name>
```

### Add New Feed Source
1. Edit `services/worker/src/sources.js`
2. Add feed URL and configuration
3. Test locally: `npm run worker:dev`
4. Deploy: `npm run worker:deploy`

### Adjust Cron Schedule
Edit `services/worker/wrangler.toml`:
```toml
[triggers]
crons = ["*/15 * * * *"]  # Every 15 minutes
# crons = ["0 * * * *"]   # Every hour
# crons = ["0 */6 * * *"] # Every 6 hours
```

### Backup KV Data
```bash
# Export all threats
wrangler kv:key get "unified-threats" --namespace-id=YOUR_KV_ID > backup-$(date +%Y%m%d).json
```

### Monitor Costs
- Cloudflare Workers Free Tier: 100,000 requests/day
- KV Free Tier: 100,000 reads/day, 1,000 writes/day
- GitHub Pages: Free for public repos

**Current Usage** (estimated):
- Worker: ~96 invocations/day (cron every 15 min)
- KV: ~96 writes/day, <1,000 reads/day
- **Total Cost**: $0 (well within free tier)

## Performance Tuning

### Reduce API Calls
- Increase cron interval (e.g., every 30 minutes)
- Increase KV TTL (currently 30 minutes)

### Optimize Dashboard
- Reduce auto-refresh interval (currently 60 seconds)
- Implement pagination for large datasets
- Add service worker for offline support

### Scale Up (Future)
- Upgrade to Cloudflare Workers Paid plan ($5/month)
- Add Durable Objects for real-time updates
- Implement WebSocket connections

## Security Best Practices

1. **Never commit secrets** - Use GitHub Secrets
2. **Rotate API tokens** - Every 90 days
3. **Monitor access logs** - Check for unusual patterns
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS only** - Enforced by default

## Support & Resources

- **Documentation**: `/docs` directory
- **Issues**: https://github.com/tweakn74/WatchLockAI/issues
- **Cloudflare Docs**: https://developers.cloudflare.com/workers/
- **Playwright Docs**: https://playwright.dev/

---

**Last Updated**: 2025-11-01  
**Version**: 2.0.0

