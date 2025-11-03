# WatchLockAI - Roadmap & TODO

**Version:** v2.15.0
**Last Updated:** November 3, 2025
**Current Phase:** Phase 3 - Dashboard Implementation (7/9 dashboards complete, 78%)
**Test Coverage:** 168/168 tests passing (100%)

---

## 📖 Project Overview

### What is WatchLockAI?

**WatchLockAI** is an enterprise-grade, open-source threat intelligence platform that provides security analysts with comprehensive visibility into Advanced Persistent Threats (APTs), ransomware campaigns, and dark web activity. Built on the MITRE ATT&CK framework, WatchLockAI aggregates threat data from multiple sources to deliver actionable intelligence for proactive defense.

### 🎯 Mission

Democratize enterprise-level threat intelligence by providing a **100% free, open-source platform** that rivals commercial solutions like Recorded Future, CrowdStrike Falcon Intelligence, and Mandiant Threat Intelligence—without paywalls, subscriptions, or feature limitations.

### 🏗️ Architecture

**Frontend:**

- Static HTML/CSS/JavaScript (no framework dependencies)
- Hosted on GitHub Pages (free, global CDN)
- Versedetect dark theme design system
- Fully responsive (desktop, tablet, mobile)

**Backend:**

- Cloudflare Workers (serverless edge computing)
- Cloudflare KV (key-value storage)
- MITRE ATT&CK API integration
- Dark web monitoring (Tor2Web proxies)

**Testing:**

- Playwright E2E tests (168 tests, 100% passing)
- Visual regression testing
- Accessibility compliance (WCAG 2.1 AA)
- CI/CD with GitHub Actions

### 🚀 Key Features

**1. APT Threat Actor Profiling**

- 8+ APT groups with detailed profiles (APT28, APT29, Lazarus Group, etc.)
- Country attribution with geopolitical context
- Sophistication levels (Advanced, High, Medium, Low)
- Motivation tracking (Espionage, Financial, Destructive)
- MITRE ATT&CK technique mapping
- Malware arsenal and tool tracking
- Risk scoring (0-100 scale)
- Timeline visualization (first seen, last activity)

**2. Detection Engineering**

- 15+ detection rules mapped to MITRE ATT&CK
- Severity classification (Critical, High, Medium, Low)
- Platform coverage (Splunk, Elastic, Sigma, KQL, etc.)
- Status tracking (Stable, Preview, Experimental)
- MITRE ATT&CK coverage matrix
- Technique-to-detection mapping
- Search and filter capabilities

**3. Dark Web Intelligence**

- Ransomware leak site monitoring (LockBit, BlackCat, Cl0p)
- Victim organization tracking
- Breach timeline visualization
- Indicators of Compromise (IOCs)
- Industry and severity analysis
- Early warning alerts (NEW badge for recent victims)
- Comprehensive filtering (ransomware group, industry, severity, date range)

**4. Analytics Dashboard**

- Detection trend analysis (line charts)
- Severity distribution (donut charts)
- Platform coverage (bar charts)
- Top triggered detections (tables)
- Time range filtering (7, 30, 90 days, All Time)
- Real-time statistics

**5. Executive Metrics**

- APT Groups count
- Active Threat Actors count
- Detection Rules count
- MITRE Techniques covered
- Quick Stats Widget (embedded on all pages)
- One-click navigation to detailed views

### 🎨 Design Philosophy

1. **Simplicity First** - Clean, uncluttered UI optimized for analyst workflows
2. **Analyst-Centric** - Features designed by analysts, for analysts
3. **Performance** - Fast page loads (<2s), smooth interactions, no bloat
4. **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
5. **Consistency** - Unified design system (Versedetect color scheme)
6. **Free & Open** - 100% free, no paywalls, fully open-source (MIT License)

### 🌐 Use Cases

**Security Operations Centers (SOCs)**

- Monitor emerging APT campaigns
- Track ransomware victim trends
- Assess detection coverage gaps
- Prioritize threat hunting activities

**Threat Intelligence Teams**

- Research APT actor TTPs (Tactics, Techniques, Procedures)
- Analyze geopolitical threat landscape
- Track dark web breach disclosures
- Generate executive threat reports

**Incident Response Teams**

- Identify IOCs from recent breaches
- Correlate attacks to known APT groups
- Validate detection rule effectiveness
- Assess organizational risk exposure

**Security Researchers**

- Study APT evolution and trends
- Analyze MITRE ATT&CK technique usage
- Research ransomware group behaviors
- Contribute to open-source threat intelligence

### 📊 Data Sources

- **MITRE ATT&CK Framework** - Tactics, techniques, and procedures
- **APT Group Profiles** - Curated threat actor intelligence
- **Detection Rules** - Community-contributed detection logic
- **Dark Web Monitoring** - Ransomware leak sites (via Tor2Web)
- **Geopolitical Context** - Country-level threat assessments

### 🔒 Privacy & Security

- **No User Tracking** - Zero analytics, no cookies, no telemetry
- **Client-Side Processing** - All filtering/search happens in browser
- **No Data Collection** - No user data stored or transmitted
- **Open Source** - Full transparency, audit the code yourself
- **Static Hosting** - No server-side vulnerabilities

### 🎓 Evolution History

**Origin:** APT-Tracker-MITRE-AIQ-Intel repository
**Transformation:** 7-phase enhancement plan (v2.0.0 - v2.15.0)

**Phase 0:** Foundation & Setup (v2.0.0)
**Phase 1:** Data Aggregation (v2.1.0)
**Phase 2:** Threat Actor Profiling (v2.2.0)
**Phase 3:** Site Merges (v2.3.0)
**Phase 4:** Geopolitical Context (v2.4.0)
**Phase 5:** Dark Web Intelligence (v2.5.0)
**Phase 6:** Detection Engineering (v2.6.0)
**Phase 7:** MITRE ATT&CK Integration (v2.7.0)
**Phase 8:** Dashboard Implementation (v2.8.0 - v2.15.0) - **IN PROGRESS**

### 🏆 Project Goals

**Short-Term (Current Phase)**

- ✅ Complete 7/9 dashboard implementations (78% done)
- ⏳ Implement Geopolitical Map (Dashboard 3)
- ⏳ Implement Coverage Heatmap (Dashboard 6)
- ⏳ Achieve 100% test coverage (currently 168/168 tests passing)

**Mid-Term (Next 3 months)**

- Deploy to production (Cloudflare Workers + GitHub Pages)
- Integrate live threat feeds (API-based updates)
- Add export functionality (CSV, JSON, PDF reports)
- Implement user preferences (dark/light theme, layout options)

**Long-Term (6-12 months)**

- Community contribution platform (submit APT profiles, detection rules)
- Real-time alerting system (email, Slack, webhooks)
- Advanced analytics (ML-based threat prediction)
- Mobile app (iOS/Android)
- API for third-party integrations

---

## 🎯 Current Status

### ✅ Completed Dashboards (7/9)

**Phase 1 (Week 1) - COMPLETE**

- [x] Dashboard 4: Quick Stats Widget (v2.8.0) - 6 tests
- [x] Dashboard 2: Executive Metrics Landing Page (v2.8.1) - 11 tests
- [x] Dashboard 9: Recorded Future Style APT Profiles (v2.9.0) - 21 tests

**Phase 2 (Week 2-3) - COMPLETE**

- [x] Dashboard 1: Analytics Dashboard (v2.10.0) - 21 tests
- [x] Dashboard 5: Dark Theme Enhancements (v2.11.0) - 10 tests
- [x] Dashboard 7: Modern APT Overview (v2.12.0) - 16 tests (APT detail modal)

**Phase 3 (Week 3-4) - IN PROGRESS**

- [x] Dashboard 8: Dark Web Intelligence Feed (v2.15.0) - 27 tests (ransomware victim tracking)

---

## 🚀 Active Tasks

### Dashboard 7: Post-Completion

- [ ] Take screenshots of APT detail modal functionality

---

## 📋 Phase 3: Remaining Dashboards (Planned)

### Dashboard 3: Threat Actor Geopolitical Map

**Priority:** MEDIUM  
**Target:** v2.13.0  
**Estimated Effort:** 3-4 days

**Features:**

- [ ] Interactive world map with APT actor locations
- [ ] Country-level threat intelligence
- [ ] Geopolitical context and attribution
- [ ] Filter by region, country, threat type
- [ ] Click on country to view APT actors and threats
- [ ] Heatmap visualization (threat density)
- [ ] Timeline slider (view historical data)

**Technical Requirements:**

- [ ] Leaflet.js or D3.js for map visualization
- [ ] GeoJSON data for country boundaries
- [ ] APT actor geolocation data
- [ ] Threat feed integration
- [ ] Responsive design

---

### Dashboard 6: Detection Coverage Heatmap

**Priority:** MEDIUM  
**Target:** v2.14.0  
**Estimated Effort:** 2-3 days

**Features:**

- [ ] MITRE ATT&CK Navigator-style heatmap
- [ ] Detection coverage by tactic and technique
- [ ] Color-coded coverage levels:
  - [ ] Green: Full coverage (3+ detections)
  - [ ] Yellow: Partial coverage (1-2 detections)
  - [ ] Red: No coverage
- [ ] Filter by platform (Splunk, Elastic, etc.)
- [ ] Filter by severity (Critical, High, Medium, Low)
- [ ] Click on technique to view detections
- [ ] Export coverage report (CSV, JSON)

**Technical Requirements:**

- [ ] MITRE ATT&CK framework data
- [ ] Detection-to-technique mapping
- [ ] Heatmap visualization (Chart.js or D3.js)
- [ ] Coverage calculation logic
- [ ] Export functionality

---

### Dashboard 8: Dark Web Intelligence Feed ✅ COMPLETE

**Priority:** HIGH
**Target:** v2.15.0
**Status:** ✅ COMPLETE
**Completion Date:** November 3, 2025

**Features Implemented:**

- [x] Ransomware leak site victim tracking
- [x] Victim organization cards with severity levels (critical, high, medium)
- [x] NEW badge for recent victims (within 10 days)
- [x] Filter by ransomware group (LockBit 3.0, BlackCat, Cl0p)
- [x] Filter by industry (Manufacturing, Technology, Healthcare)
- [x] Filter by severity (Critical, High, Medium)
- [x] Filter by date range (7, 30, 90 days, All Time)
- [x] Search by organization name or domain
- [x] Stats dashboard (total victims, active groups, industries, recent breaches)
- [x] Breach detail modal with:
  - [x] Overview (description, impact, status)
  - [x] Compromised data types (tags)
  - [x] Breach timeline (chronological events)
  - [x] Indicators of Compromise (IOCs)
  - [x] External references (leak sites, advisories)
- [x] Three modal close methods (close button, ESC key, click outside)
- [x] Responsive design (mobile-friendly)
- [x] Versedetect color scheme integration
- [x] Smooth animations and hover effects

**Implementation:**

- [x] File: `apps/intel-dashboard/dark-web-intel.html` (963 lines)
- [x] Sample data: 3 victim organizations (Acme Corp, TechStart, HealthCare Plus)
- [x] Navigation link added to `index.html`
- [x] E2E test suite: 27 tests (100% passing)

**Testing:**

- [x] Dashboard 8 tests: 27/27 passing (100%)
- [x] Full test suite: 168/168 passing (100%)
- [x] Test coverage: page loading, victim cards, filters, search, modal, keyboard navigation, accessibility, responsive design

---

## 🔧 Technical Debt & Improvements

### High Priority

1. **Update CHANGELOG.md**

   - [x] Add entries for v2.0.0 through v2.11.0
   - [x] Document all dashboard implementations
   - [x] Include breaking changes and migration notes

2. **Consolidate Test Reports**

   - [x] Merge E2E_TEST_REPORT.md and E2E_TEST_SUMMARY.md
   - [x] Create single source of truth for test results
   - [ ] Auto-generate test report from Playwright results

3. **API Documentation**

   - [ ] Document all API endpoints
   - [ ] Add request/response examples
   - [ ] Include rate limiting and error handling
   - [ ] OpenAPI/Swagger specification

4. **Performance Optimization**
   - [ ] Implement lazy loading for dashboard components
   - [ ] Optimize Chart.js rendering (debounce, throttle)
   - [ ] Reduce bundle size (tree shaking, code splitting)
   - [ ] Implement service worker for offline support

### Medium Priority

5. **Enhanced Error Handling**

   - [ ] User-friendly error messages
   - [ ] Retry logic for failed API calls
   - [ ] Fallback to cached data
   - [ ] Error boundary components

6. **User Preferences**

   - [ ] Save filter selections to localStorage
   - [ ] Remember dashboard layout preferences
   - [ ] Dark/light theme toggle
   - [ ] Export/import settings

7. **Advanced Search**

   - [ ] Boolean operators (AND, OR, NOT)
   - [ ] Wildcard search
   - [ ] Regex search
   - [ ] Search history and saved searches

8. **Data Export**
   - [ ] Export threats to CSV, JSON, PDF
   - [ ] Export APT profiles to PDF
   - [ ] Export detection rules to YAML, JSON
   - [ ] Scheduled exports (daily, weekly)

### Low Priority

9. **Mobile App**

   - [ ] Progressive Web App (PWA)
   - [ ] Push notifications for critical alerts
   - [ ] Offline support
   - [ ] Mobile-optimized UI

10. **Integrations**

    - [ ] SIEM integration (Splunk, Elastic, QRadar)
    - [ ] Ticketing system integration (Jira, ServiceNow)
    - [ ] Slack/Teams notifications
    - [ ] Webhook support

11. **Community Features**
    - [ ] User comments and ratings on threats
    - [ ] Threat hunting playbooks
    - [ ] Community-contributed detections
    - [ ] Threat intelligence sharing

---

## 🐛 Known Issues

### Critical

- None

### High

- None

### Medium

- [~] **Chart.js Performance**

  - Large datasets (1000+ data points) cause rendering lag
  - **Workaround:** Limit data points to 100 per chart
  - **Fix:** Implement data aggregation and sampling

- [~] **Mobile Responsiveness**
  - Some dashboard components not fully responsive on small screens
  - **Workaround:** Use desktop or tablet for best experience
  - **Fix:** Implement mobile-first responsive design

### Low

- [~] **Browser Compatibility**
  - IE11 not supported (by design)
  - Safari <14 may have CSS variable issues
  - **Fix:** Add browser compatibility warnings

---

## 📊 Success Metrics

### Current Metrics (v2.11.0)

- [x] 125 E2E tests passing (100%)
- [x] Zero linting errors
- [x] 5/9 dashboards complete (56%)
- [x] Page load time <2 seconds
- [x] 12+ data sources integrated
- [x] 8 APT actor profiles
- [x] 15 detection rules

### Target Metrics (v2.15.0 - All Dashboards Complete)

- [ ] 200+ E2E tests passing (100%)
- [ ] 9/9 dashboards complete (100%)
- [ ] 15+ data sources integrated
- [ ] 20+ APT actor profiles
- [ ] 50+ detection rules
- [ ] Dark web intelligence feed operational
- [ ] Geopolitical map with 50+ countries
- [ ] MITRE ATT&CK coverage >80%

---

## 🗓️ Timeline

### Week 2-3 (Complete)

- [x] Dashboard 1: Analytics Dashboard (v2.10.0)
- [x] Dashboard 5: Dark Theme Enhancements (v2.11.0)
- [x] Dashboard 7: Modern APT Overview (v2.12.0)

### Week 3-4

- [ ] Dashboard 3: Threat Actor Geopolitical Map (v2.13.0)
- [ ] Dashboard 6: Detection Coverage Heatmap (v2.14.0)
- [ ] Dashboard 8: Dark Web Intelligence Feed (v2.15.0)

### Week 5+

- [ ] Technical debt cleanup
- [ ] Performance optimization
- [ ] API documentation
- [ ] User preferences and settings
- [ ] Advanced search features

---

## � Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (141/141)
- [ ] Zero linting errors
- [ ] Zero console errors
- [ ] Environment variables configured
- [ ] KV namespaces created
- [ ] wrangler.toml updated with correct IDs

### Deployment

- [ ] Worker deployed to Cloudflare
- [ ] Dashboard deployed to GitHub Pages
- [ ] DNS configured (if using custom domain)
- [ ] SSL/TLS enabled

### Post-Deployment

- [ ] API health check passes (`/api/healthz`)
- [ ] Dashboard loads correctly
- [ ] All pages accessible
- [ ] Charts and visualizations render
- [ ] API endpoints respond correctly
- [ ] No console errors in browser

### Monitoring

- [ ] Cloudflare Workers analytics enabled
- [ ] GitHub Pages deployment status green
- [ ] API response times < 1 second
- [ ] Zero 5xx errors

---

## �📝 Notes

### Design Principles

1. **Simplicity First:** Clean, uncluttered UI
2. **Analyst-Centric:** Optimize for security analyst workflows
3. **Performance:** Fast page loads, smooth interactions
4. **Accessibility:** WCAG 2.1 AA compliant
5. **Consistency:** Unified design system (Versedetect colors)
6. **Free & Open:** 100% free, no paywalls, open-source

### Development Workflow

1. **Plan:** Create implementation plan document
2. **Implement:** Build feature with tests
3. **Test:** Run full test suite (100% passing required)
4. **Document:** Create completion report with screenshots
5. **Commit:** Git commit with conventional commit message
6. **Tag:** Git tag with version number
7. **Deploy:** Automated deployment via GitHub Actions

### Testing Requirements

- All new features must have E2E tests
- Test coverage must be 100% for new features
- Full test suite must pass before commit
- Accessibility tests required (WCAG 2.1 AA)
- Visual regression tests for UI changes
- Console error checking in all tests

---

**Last Updated:** November 3, 2025
**Version:** v2.15.0
**Next Milestone:** Dashboard 3 (Geopolitical Map) - v2.13.0 OR Dashboard 6 (Coverage Heatmap) - v2.14.0
