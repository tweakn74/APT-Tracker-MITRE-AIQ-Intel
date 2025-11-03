# WatchLockAI - Project Overview

**Version:** v2.11.0  
**Status:** Phase 2 - Dashboard Implementation (5/9 dashboards complete, 56%)  
**Last Updated:** November 2, 2025

---

## 🎯 Executive Summary

**WatchLockAI** is an enterprise-grade, FREE threat intelligence platform that evolved from the APT-Tracker-MITRE-AIQ-Intel repository. The platform provides comprehensive threat intelligence, APT actor profiling, detection engineering playbooks, and advanced analytics through a unified, professional dashboard interface.

**Mission:** "Know the Threat + Detect the Threat + Hunt the Threat"

**Live Deployment:**
- **Dashboard:** https://tweakn74.github.io/APT-Tracker-MITRE-AIQ-Intel/
- **API:** https://apt-tracker-mitre-aiq-intel.craig-glatt.workers.dev

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Chart.js 4.4.0 for data visualization
- Vite for build tooling (dashboard apps)
- GitHub Pages for static hosting

**Backend:**
- Cloudflare Workers (serverless edge computing)
- Cloudflare KV (key-value storage)
- Fast-xml-parser for feed aggregation

**Testing & Quality:**
- Playwright for E2E testing (125 tests, 100% passing)
- ESLint 9 for code quality
- Prettier for code formatting
- Husky for git hooks
- TypeScript (checkJs mode) for type checking

**CI/CD:**
- GitHub Actions for automated deployment
- Automated testing on every commit
- Git tags for version control

### System Architecture

```
Frontend (GitHub Pages)          Backend (Cloudflare Worker)         Storage (Cloudflare KV)
┌─────────────────────┐         ┌──────────────────────┐           ┌─────────────────┐
│  Dashboard Pages    │         │  worker/index.js     │           │  sources        │
│  - Executive Metrics│◄────────┤  - /api/threats      │◄──────────┤  trends         │
│  - APT Profiles     │  HTTPS  │  - /api/trends       │           │  settings       │
│  - Detections       │         │  - /api/sources      │           └─────────────────┘
│  - Analytics        │         │  - /api/discovery    │
└─────────────────────┘         │  - /api/healthz      │
                                └──────────────────────┘
                                         │
                                         ▼
                                  External Feeds
                                  - CISA, MSRC
                                  - Project Zero
                                  - BleepingComputer
                                  - Krebs, etc.
```

---

## 📊 Implementation History

### Phase 0: Foundation & Regression-Proofing (COMPLETE ✅)

**Delivered:**
- Git hooks with Husky for pre-commit quality checks
- ESLint + Prettier for code quality and formatting
- lint-staged for automatic formatting on commit
- Comprehensive test suite (23 tests, 100% passing)
- Zero linting errors across codebase
- Automated regression prevention

**Impact:** Regression-proof development workflow ensures code quality on every commit

---

### Phases 1-7: Core Platform Development (COMPLETE ✅)

**Phase 1: Enhanced Data Aggregation & Correlation**
- Deduplication logic (CVE-based, title similarity, URL matching)
- Cross-source correlation with correlationId
- Unified threat view merging duplicate threats
- 20-30% reduction in threat count

**Phase 2: Bubble-Up Logic & Critical Alerts**
- Enhanced risk scoring (0-100 scale)
- Multi-source bonus (+10 points for 3+ sources)
- Critical combo detection (CVE + POC + Active Exploitation)
- Temporal decay for older threats
- Critical Alerts dashboard section

**Phase 3: Free API Integrations**
- AbuseIPDB (1,000 req/day) - IP reputation
- VirusTotal (500 req/day) - File/URL/IP/domain analysis
- AlienVault OTX (unlimited) - Threat intelligence pulses
- ThreatFox (unlimited) - IOC database
- Automatic IOC enrichment
- Rate limiting and caching

**Phase 4: Site Merge - APT Profiles**
- Comprehensive APT actor profiles (APT29, APT28, Lazarus, etc.)
- MITRE ATT&CK TTPs mapping
- Campaign timeline and attribution
- Linked to real-time threats
- Risk scoring and sophistication levels

**Phase 5: Site Merge - Detection Engineering**
- SOC-ready Splunk detection playbooks
- 15 high-fidelity detections mapped to MITRE ATT&CK
- Detection coverage matrix
- Linked to APT profiles and threats
- Platform-specific detections (Splunk, Elastic, etc.)

**Phase 6: Universal Search**
- Recorded Future-style search across all data types
- Search threats, IOCs, APT profiles, detections, tags
- Advanced filters and boolean operators
- Search history and saved searches

**Phase 7: Dark Web Intelligence**
- Monitor ransomware leak sites (LockBit, BlackCat, Cl0p, etc.)
- Paste site monitoring (Pastebin, Ghostbin, etc.)
- Tor2Web proxies for legal access
- Early warning alerts for breaches (24-48 hour lead time)
- Victim organization tracking

**Git Tags:** v2.0.0 through v2.7.0

---

### Dashboard Implementation (IN PROGRESS 🚀)

**Phase 1 (Week 1) - COMPLETE ✅**
- Dashboard 4: Quick Stats Widget (v2.8.0)
- Dashboard 2: Executive Metrics Landing Page (v2.8.1)
- Dashboard 9: Recorded Future Style APT Profiles (v2.9.0)

**Phase 2 (Week 2-3) - IN PROGRESS 🚀**
- Dashboard 1: Analytics Dashboard (v2.10.0) ✅ COMPLETE
- Dashboard 5: Dark Theme Enhancements (v2.11.0) ✅ COMPLETE
- Dashboard 7: Modern APT Overview ⏳ NEXT

**Phase 3 (Week 3-4) - PLANNED**
- Dashboard 3: Threat Actor Geopolitical Map
- Dashboard 6: Detection Coverage Heatmap
- Dashboard 8: Dark Web Intelligence Feed

**Overall Progress:** 5/9 dashboards (56%)

---

## 🎨 Design System

### Versedetect Color Scheme

**Background Colors:**
```css
--bg: #0f1114;                    /* Main background - very dark blue-gray */
--panel: #151821;                 /* Panel background - slightly lighter */
--panel-soft: #1b1f2a;            /* Soft panel background */
--panel-elevated: #1c202d;        /* Elevated panel background */
```

**Text Colors:**
```css
--text-primary: #e8ecf1;          /* Primary text - light gray-blue */
--text-muted: #a7b0bf;            /* Muted text - medium gray-blue */
--text-subtle: #7b8496;           /* Subtle text - darker gray-blue */
```

**Brand/Accent Colors:**
```css
--brand: #5aa9ff;                 /* Primary brand blue - brighter */
--brand-strong: #7bbcff;          /* Stronger brand blue */
--brand-alt: #7ee787;             /* Alternative brand color - green */
--danger: #ff6b7a;                /* Danger/Critical - red */
--warn: #ffb86b;                  /* Warning - orange */
```

**Border Radius:**
```css
--radius-sm: 12px;                /* Small radius for cards, buttons */
--radius-md: 16px;                /* Medium radius for modals, panels */
--radius-lg: 22px;                /* Large radius for special elements */
```

**Shadows:**
```css
--shadow-md: 0 12px 30px rgba(0, 0, 0, 0.35);    /* Medium shadow for cards */
--shadow-lg: 0 22px 45px rgba(0, 0, 0, 0.45);    /* Large shadow for hover effects */
```

---

## 🔑 Key Features

### 1. Intelligent Tagging System

Automatically extracts:
- **CVE IDs**: `CVE-2024-1234`
- **MITRE ATT&CK Techniques**: `T1059`, `T1059.001`
- **CWE IDs**: `CWE-79`, `CWE-89`
- **Keywords**: `RANSOMWARE`, `ZERO-DAY`, `APT`, `MALWARE`, `PHISHING`
- **Priority**: `HIGH-PRIORITY` for CISA KEV items

### 2. Enhanced Risk Scoring

**Multi-Factor Risk Calculation (0-100 scale):**
- **Base Score (40 points)**: KEV listing, Zero-day, CVE, MITRE ATT&CK
- **Exploitability (30 points)**: Active exploitation, Exploit kit, POC available
- **Temporal (20 points)**: Age of threat (Last 24h, 7d, 30d)
- **Threat Type (10 points)**: Ransomware, APT, Malware, Phishing
- **Multi-Source Bonus**: +10 points for 2+ sources
- **Gov Sources Bonus**: +15 points for government sources
- **Critical Combos**: +20 for KEV+Zero-day+APT

**Severity Classification:**
- CRITICAL (90-100): KEV + Active Exploitation + Recent
- HIGH (70-89): CVE + POC/Exploit Kit + Recent
- MEDIUM (40-69): CVE + Documented TTP
- LOW (0-39): General threat intelligence

### 3. Comprehensive Data Sources (12+)

**Government Sources:**
- CISA News and Alerts
- CISA Known Exploited Vulnerabilities (KEV)
- NCSC UK

**Vendor/Research Sources:**
- Microsoft Security Response Center (MSRC)
- Google Project Zero
- Cisco Talos Intelligence
- Mandiant

**News Sources:**
- The Record from Recorded Future
- BleepingComputer
- Krebs on Security

### 4. APT Actor Profiles

**8 Major APT Groups:**
- APT28 (Fancy Bear) - Russia
- APT29 (Cozy Bear) - Russia
- Lazarus Group - North Korea
- APT41 (Winnti) - China
- APT1 (Comment Crew) - China
- Sandworm - Russia
- Turla - Russia
- Equation Group - Unknown

**Profile Details:**
- Country of origin with flags
- Sophistication levels (Advanced, High, Medium, Low)
- Motivations (Espionage, Financial, Destructive)
- Known targets and industries
- Active since timeline
- MITRE ATT&CK TTPs mapping

### 5. Detection Engineering

**15 SOC-Ready Detections:**
- Mailbox Forwarding Rule Exfiltration Detector
- Impossible Travel Alert Risk Fusion
- PowerShell Empire C2 Beacon Detection
- Mimikatz Credential Dumping Detection
- Ransomware File Encryption Activity
- Suspicious DNS Tunneling Activity
- Kerberoasting Attack Detection
- And 8 more...

**Detection Attributes:**
- Severity levels (CRITICAL, HIGH, MEDIUM, LOW)
- Status (Stable, Preview, Experimental)
- Platform support (Splunk, Elastic, etc.)
- MITRE ATT&CK technique mapping
- False positive rates
- Detection logic and implementation

### 6. Advanced Analytics Dashboard

**Features:**
- Detection trends over time (line charts)
- Severity distribution (donut charts)
- Platform coverage (bar charts)
- Top triggered detections (table)
- Time period filters (7 days, 30 days, 90 days)
- Real-time statistics

---

## 🧪 Testing Strategy

### E2E Testing with Playwright

**Test Coverage: 125 tests, 100% passing**

**Test Categories:**
- Dashboard 1 (Analytics Dashboard): 21 tests
- Dashboard 5 (Dark Theme Enhancements): 10 tests
- Dashboard 2 (Executive Metrics Landing): 11 tests
- Dashboard 4 (Quick Stats Widget): 6 tests
- Dashboard 9 (Recorded Future Style APT Profiles): 21 tests
- Navigation: 6 tests
- Accessibility: 10 tests
- Data Loading: 3 tests
- Filters: 17 tests
- User Experience: 2 tests
- Visual Regression: 7 tests
- Layout and Styling: 2 tests

**Accessibility Compliance:**
- WCAG 2.1 Level AA compliant
- All form controls have proper label associations
- Keyboard navigation support
- Screen reader friendly
- Color contrast ratios verified

**Code Quality:**
- Zero linting errors (ESLint)
- Consistent code formatting (Prettier)
- No inline styles (separation of concerns)
- TypeScript type checking (checkJs mode)

---

## 📦 Project Structure

```
APT-Tracker-MITRE-AIQ-Intel/
├── apps/intel-dashboard/          # Dashboard applications
│   ├── index.html                # Executive Metrics Landing Page
│   ├── apt-profiles.html         # APT Profiles page
│   ├── detections.html           # Detection Engineering page
│   ├── src/
│   │   ├── main.js              # Dashboard logic
│   │   └── style.css            # Styling
│   └── public/data/demo/        # Demo data
├── worker/                        # Cloudflare Worker (Backend)
│   ├── index.js                  # Main entry point with routing
│   └── lib/
│       ├── feeds.js              # Feed parsing, normalization, tagging
│       ├── trends.js             # Trends tracking and aggregation
│       ├── sources.js            # Source management
│       ├── discovery.js          # Discovery scraper
│       ├── scoring.js            # Risk scoring engine
│       └── utils.js              # Logging, health checks
├── e2e-tests/                     # Playwright E2E tests
│   ├── analytics-dashboard.spec.js
│   ├── dark-theme-enhancements.spec.js
│   ├── recorded-future-apt-profiles.spec.js
│   └── ...
├── docs/                          # Documentation
│   ├── PROJECT_OVERVIEW.md       # This file
│   ├── TODO.md                   # Active tasks and roadmap
│   ├── DASHBOARD_IMPLEMENTATION.md # Dashboard design and implementation
│   ├── OPERATIONS.md             # Deployment and operations
│   └── screenshots/              # Dashboard screenshots
├── .github/workflows/             # CI/CD Pipeline
│   └── ci.yml                    # Lint, test, deploy, backup, tag
├── package.json                   # Dependencies and scripts
├── wrangler.toml                 # Cloudflare Worker configuration
├── playwright.config.js          # Playwright configuration
├── eslint.config.js              # ESLint configuration
└── README.md                      # Quick start guide
```

---

## 🚀 Quick Start

See [README.md](../README.md) for detailed setup instructions.

**One-Line Deploy:**
```bash
npm run deploy && git push
```

**Local Development:**
```bash
# Start dashboard server
npx http-server apps/intel-dashboard -p 8080 -c-1

# Run tests
npm run test:e2e

# View test report
npm run test:e2e:report
```

---

## 📈 Success Metrics

**Quantitative:**
- ✅ 125 E2E tests passing (100%)
- ✅ Zero linting errors
- ✅ Page load time <2 seconds
- ✅ 95%+ accuracy in severity classification
- ✅ 20-30% reduction in threat count (deduplication)
- ✅ 80%+ of threats enriched with additional context

**Qualitative:**
- ✅ Analysts can identify critical threats in <10 seconds
- ✅ APT profiles provide comprehensive threat actor intelligence
- ✅ Detection playbooks are SOC-ready
- ✅ Platform is 100% free and open-source
- ✅ UI is clean, professional, and uncluttered
- ✅ Platform rivals commercial solutions in functionality

---

## 🔒 Security

**Implemented Protections:**
- Input validation and sanitization
- XSS prevention (HTML escaping)
- CORS with strict origin checking
- Content Security Policy headers
- Rate limiting per host
- Timeout and retry with jitter
- No secrets in code (environment variables only)
- Structured logging with secret redaction

**Security Headers:**
- `Content-Security-Policy: default-src 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`

---

## 📄 License

MIT License - Free for personal and commercial use

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

---

**Last Updated:** November 2, 2025  
**Version:** v2.11.0  
**Status:** Phase 2 - Dashboard Implementation (5/9 dashboards complete, 56%)

