# Changelog

All notable changes to the APT Tracker - MITRE ATT&CK Intelligence Dashboard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-01

### Added
- **Complete Threat Intelligence Aggregator**
  - Cloudflare Worker backend aggregating 12+ threat intelligence sources
  - Support for RSS, Atom, and JSON feed formats
  - Automatic deduplication using canonical URLs and title hashing
  - Rate limiting with per-host concurrency limits and exponential backoff retry

- **Intelligent Tagging System**
  - Automatic extraction of CVE IDs (CVE-YYYY-NNNNN format)
  - MITRE ATT&CK technique IDs (T#### and T####.### for sub-techniques)
  - CWE IDs (CWE-### format)
  - Security keywords: RANSOMWARE, ZERO-DAY, EXPLOIT, MALWARE, PHISHING, KEV, HIGH-PRIORITY
  - Source attribution for all threat items

- **Trends Engine**
  - Hourly bucketing over 7-day rolling window
  - Top sources and top tags analytics
  - 24-hour trending view with bar charts

- **Source Discovery**
  - Automatic discovery of new threat intelligence sources
  - Candidate source tracking with approval workflow
  - Recently approved sources widget (7-day window)

- **Frontend Dashboard (GitHub Pages)**
  - Real-time Current Threats widget with auto-refresh (3 minutes)
  - Trending Charts widget with Chart.js visualizations (5 minutes)
  - New Intel Sources widget
  - Dark theme with responsive design
  - Accessibility features (ARIA labels, keyboard navigation)
  - Status indicators (Live/Loading/Error)

- **Security Hardening**
  - XSS prevention with HTML sanitization and escaping
  - CORS with strict origin checking
  - Content Security Policy (CSP) headers
  - Rate limiting per IP address
  - Input validation and error handling

- **Data Sources**
  - CISA News and Alerts
  - CISA Known Exploited Vulnerabilities (KEV)
  - Microsoft Security Response Center (MSRC)
  - Google Project Zero
  - The Record from Recorded Future
  - BleepingComputer
  - Krebs on Security
  - NCSC UK
  - Cisco Talos Intelligence
  - Mandiant

- **Infrastructure**
  - Cloudflare Workers deployment
  - Cloudflare KV storage for persistence
  - GitHub Pages for frontend hosting
  - Wrangler CLI for deployment automation

- **Developer Tools**
  - Comprehensive test suite (unit, integration, E2E)
  - Backup and restore scripts
  - KV export utility
  - ESLint configuration
  - TypeScript type checking

### Fixed
- Chart.js loading issue by removing invalid SRI integrity hash
- Source URL extraction bug in feed aggregation
- sanitizeHtml type safety for non-string inputs
- Sources handler type checking for string vs object types
- Enhanced error logging with detailed error messages and stack traces

### Security
- Disabled Cloudflare Access to make worker publicly accessible
- Implemented proper CORS headers for GitHub Pages origin
- Added HTML sanitization to prevent XSS attacks
- Implemented rate limiting to prevent abuse

### Deployment
- Worker deployed to: `https://apt-tracker-mitre-aiq-intel.craig-glatt.workers.dev`
- Dashboard live at: `https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel/`
- KV Namespace ID: `cef5c15199694c06a2b492f711228f98`

---

## Release Notes

### v1.0.0 - First Stable Release

This is the first production-ready release of the APT Tracker threat intelligence dashboard. The system is fully functional with:

- ✅ 12+ threat intelligence sources aggregated in real-time
- ✅ Automatic tagging of CVE, MITRE ATT&CK, CWE, and security keywords
- ✅ 7-day trends with hourly bucketing
- ✅ Live dashboard with auto-refresh
- ✅ Complete security hardening
- ✅ Comprehensive test coverage

**Live URLs:**
- Dashboard: https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel/
- API: https://apt-tracker-mitre-aiq-intel.craig-glatt.workers.dev

**API Endpoints:**
- `GET /api/healthz` - Health check
- `GET /api/threats?limit=N&offset=N` - Get threat intelligence items
- `GET /api/trends` - Get 24-hour trends (top sources and tags)
- `GET /api/sources` - Get approved and candidate sources

**Next Steps:**
- Monitor dashboard for data quality
- Review and approve candidate sources
- Set up GitHub Actions for automated testing and deployment
- Configure backup schedule

---

[1.0.0]: https://github.com/tweakn74/APT-Tracker-MITRE-AIQ-Intel/releases/tag/v1.0.0

