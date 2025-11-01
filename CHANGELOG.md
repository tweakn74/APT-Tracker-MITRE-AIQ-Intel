# Changelog

All notable changes to the APT Tracker - MITRE ATT&CK Intelligence Dashboard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-11-01

### Fixed

- **Button Type Attributes** - Added `type="button"` to all 23 filter buttons
  - Prevents unintended form submission behavior
  - Improves HTML standards compliance and accessibility
  - Affects severity, threat type, time window, and actionability filters

### Added

- **"Has POC" Actionability Filter**
  - New filter option to find threats with proof-of-concept exploits
  - Detects keywords: "POC", "proof of concept", "proof-of-concept", "exploit code", "exploit available"
  - Client-side filtering for instant results
  - Works in combination with other actionability filters (KEV, CVE, MITRE)
  - Helps analysts prioritize threats with publicly available exploit code

- **Clickable CVE Tags**
  - CVE tags now link to Tenable CVE database (https://www.tenable.com/cve/CVE-YYYY-NNNNN)
  - Provides comprehensive vulnerability details and explanations
  - Links open in new tab with security attributes (`rel="noopener noreferrer"`)
  - Hover effects: darker background (25% opacity) + text underline
  - Cursor changes to pointer on hover for better UX
  - Smooth transition effects (0.2s ease)
  - Maintains existing CVE tag styling (red background, danger color)

### Changed

- Improved CVE tag interactivity and visual feedback
- Enhanced user experience for vulnerability research workflow
- Better accessibility with proper button types

### Infrastructure

- Created backup before changes (`backups/backup-2025-10-31-230414/`)
- Comprehensive code quality review completed
- All IDE diagnostics reviewed (only minor CSS warnings remain)
- Git commit: 22f1f33

### Testing

- POC filter tested with regex pattern matching on live data
- CVE links tested with proper URL encoding and security attributes
- All existing filters verified to remain functional
- Button type changes validated for form submission prevention

## [1.1.0] - 2025-11-01

### Added - Phase 1: Advanced Filtering UI

- **Comprehensive Filter Bar** with 5 filter dimensions:
  - Severity filter (Critical, High, Medium, Low, All)
  - Threat Type filter (Ransomware, Zero-day, Exploit, Malware, Phishing, APT, All)
  - Time Window filter (Last 24h, Last 7d, Last 30d, All Time)
  - Actionability filter (KEV Only, Has CVE, Has MITRE, All)
  - Full-text search box with 500ms debounce
- **Active Filter Pills** showing currently applied filters with individual remove buttons
- **Clear All Filters** button for quick reset
- **Filter State Management** with client-side and server-side filtering
- **Responsive Filter Controls** with hover states and accessibility support

### Added - Phase 2: Risk Scoring Engine

- **Evidence-Based Risk Scoring Algorithm** (0-100 scale) with four components:
  - **Base Score (40 points)**: KEV listing (+40), Zero-day (+30), CVE (+20), MITRE ATT&CK (+10)
  - **Exploitability (30 points)**: Active exploitation (+30), Exploit kit (+20), POC available (+15)
  - **Temporal (20 points)**: Last 24h (+20), Last 7d (+15), Last 30d (+10), Older (+5)
  - **Threat Type (10 points)**: Ransomware (+10), APT (+8), Malware/Exploit (+6), Phishing (+4)
- **Source Credibility Multipliers**:
  - Tier 1 (Government/Official): 1.2x - CISA, NCSC
  - Tier 2 (Vendor/Research): 1.1x - Microsoft, Google, Cisco Talos, Mandiant
  - Tier 3 (News): 1.0x - BleepingComputer, The Record, Krebs
  - Tier 4 (Community): 0.9x - Default for unknown sources
- **Severity Classification**:
  - CRITICAL (90-100): KEV + Active Exploitation + Recent
  - HIGH (70-89): CVE + POC/Exploit Kit + Recent
  - MEDIUM (40-69): CVE + Documented TTP
  - LOW (0-39): General threat intelligence
- **Exploit Kit Detection**: Angler, Neutrino, RIG, Magnitude, Fallout, and 6 more
- **Color-Coded Severity Badges** in UI (Red, Orange, Yellow, Green)
- **Risk Score Display** with color coding matching severity
- **Risk Evidence Array** showing why each score was calculated

### Added - Worker Enhancements

- New `worker/lib/scoring.js` module with complete risk scoring logic
- `calculateRiskScore()` function with multi-factor analysis
- `addRiskScores()` to enrich threat items with scores
- `filterBySeverity()` for server-side severity filtering
- `sortByRiskScore()` to prioritize highest-risk threats
- Updated `/api/threats` endpoint to accept `severity` parameter
- Automatic risk score calculation for all threat items
- Sort threats by risk score (highest first) instead of date

### Added - Frontend Enhancements

- Filter state management with reactive updates
- `setupFilters()` to initialize filter event listeners
- `updateActiveFilters()` to display active filter pills
- `removeFilter()` and `clearAllFilters()` functions
- Enhanced `loadThreats()` with filter parameter building
- Client-side filtering for threat type and actionability
- Server-side filtering for severity and time window
- Updated `renderThreats()` to display severity badges and risk scores
- `getSeverityColor()` helper for consistent color coding
- Debounced search input (500ms delay)

### Changed

- Threats now sorted by risk score instead of publication date
- Increased API limit to 100 items for better client-side filtering
- Display limit remains 60 items after filtering
- Enhanced threat cards with severity and risk score indicators
- Filter controls use button groups with active state styling

### Documentation

- Added `docs/ENHANCEMENT_PLAN.md` with comprehensive roadmap
- Documented research findings from Recorded Future and industry best practices
- Created 6-phase enhancement plan with effort estimates
- Added Mermaid diagrams for filtering architecture and risk scoring flow
- Documented competitive analysis and success metrics

### Infrastructure

- Created backup `backups/backup-2025-10-31-224632/` before enhancements
- Tagged v1.0.1 as pre-enhancement stable state
- Deployed worker with risk scoring to Cloudflare
- Pushed frontend changes to GitHub Pages

### Performance

- Risk scoring adds minimal latency (~5-10ms per item)
- Client-side filtering provides instant response
- Server-side filtering reduces data transfer
- Debounced search prevents excessive API calls

## [1.0.1] - 2025-10-31

### Infrastructure

- Pre-enhancement backup created
- Stable state tagged before major feature additions
- KV data exported (2 trend buckets)
- Enhancement plan documented

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
