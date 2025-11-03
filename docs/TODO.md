# WatchLockAI - Roadmap & TODO

**Version:** v2.11.0  
**Last Updated:** November 2, 2025  
**Current Phase:** Phase 2 - Dashboard Implementation (5/9 dashboards complete, 56%)

---

## 🎯 Current Status

### ✅ Completed Dashboards (5/9)

**Phase 1 (Week 1) - COMPLETE**

- [x] Dashboard 4: Quick Stats Widget (v2.8.0)
- [x] Dashboard 2: Executive Metrics Landing Page (v2.8.1)
- [x] Dashboard 9: Recorded Future Style APT Profiles (v2.9.0)

**Phase 2 (Week 2-3) - IN PROGRESS**

- [x] Dashboard 1: Analytics Dashboard (v2.10.0)
- [x] Dashboard 5: Dark Theme Enhancements (v2.11.0)
- [~] Dashboard 7: Modern APT Overview - **NEXT**

---

## 🚀 Active Tasks

### Dashboard 7: Modern APT Overview (NEXT)

**Priority:** HIGH  
**Target:** v2.12.0  
**Estimated Effort:** 2-3 days

**Implementation Requirements:**

1. **APT Overview Cards**

   - [ ] Large, prominent APT actor cards with:
     - [ ] Actor name and aliases
     - [ ] Country flag and origin
     - [ ] Risk score (0-100 scale)
     - [ ] Sophistication level badge
     - [ ] Motivation tags
     - [ ] Recent activity indicator
     - [ ] Quick stats (campaigns, TTPs, targets)
   - [ ] Grid layout with 2-3 cards per row
   - [ ] Hover effects with shadow elevation

2. **Enhanced Filtering**

   - [ ] Filter by country (dropdown with flags)
   - [ ] Filter by sophistication (Advanced, High, Medium, Low)
   - [ ] Filter by motivation (Espionage, Financial, Destructive)
   - [ ] Filter by activity status (Active, Dormant, Unknown)
   - [ ] Search by name, alias, or description
   - [ ] Combined filter support

3. **APT Detail Modal**

   - [x] Click on card to open detailed modal
   - [x] Comprehensive APT profile:
     - [x] Full description and history
     - [~] Campaign timeline (basic timeline info shown, visual timeline pending)
     - [x] MITRE ATT&CK TTPs (with links to MITRE ATT&CK)
     - [x] Known targets and industries
     - [x] Associated malware families
     - [~] IOCs and detection rules (pending data integration)
     - [~] Related threats from threat feed (pending data integration)
   - [x] Close button and keyboard navigation (ESC key)

4. **Visual Enhancements**

   - [x] Versedetect color scheme integration
   - [x] Border radius: `--radius-sm: 12px`, `--radius-md: 16px`
   - [x] Shadows: `--shadow-md`, `--shadow-lg`
   - [x] Smooth transitions and animations
   - [x] Responsive design (mobile, tablet, desktop)

5. **Testing**

   - [x] Create `e2e-tests/modern-apt-overview.spec.js`
   - [x] Test suite requirements:
     - [x] APT card rendering (8 actors)
     - [x] Filter functionality (country, sophistication, motivation, status)
     - [x] Search functionality
     - [x] Combined filters
     - [x] Modal open/close
     - [x] Modal content verification
     - [x] Keyboard navigation
     - [x] Accessibility (WCAG 2.1 AA)
     - [x] Visual regression
     - [x] Console error checking
   - [x] Target: 20+ tests, 100% passing (16 tests created, all passing)

6. **Documentation**
   - [ ] Add Dashboard 7 implementation details to `docs/DASHBOARD_IMPLEMENTATION.md`
   - [ ] Add Dashboard 7 completion report to `docs/DASHBOARD_IMPLEMENTATION.md`
   - [ ] Screenshots of all features

**Success Criteria:**

- [x] All Dashboard 7 tests passing (16 tests, 100%)
- [x] Full test suite: 141 tests passing (100%)
- [x] APT overview cards with modern design
- [x] Enhanced filtering and search
- [x] APT detail modal with comprehensive information
- [x] Versedetect color scheme applied
- [x] No console errors
- [~] Git commit and tag v2.12.0 created (pending)
- [ ] Comprehensive documentation with screenshots (pending)

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

### Dashboard 8: Dark Web Intelligence Feed

**Priority:** HIGH  
**Target:** v2.15.0  
**Estimated Effort:** 4-5 days

**Features:**

- [ ] Ransomware leak site monitoring
- [ ] Paste site monitoring (Pastebin, Ghostbin, etc.)
- [ ] Victim organization tracking
- [ ] Early warning alerts (24-48 hour lead time)
- [ ] Filter by ransomware group, industry, date
- [ ] Search by organization name, domain
- [ ] Breach timeline visualization
- [ ] Export victim list (CSV, JSON)

**Technical Requirements:**

- [ ] Tor2Web proxies for legal access
- [ ] Web scraping with Cloudflare Workers
- [ ] Ransomware leak site parsers (LockBit, BlackCat, Cl0p, etc.)
- [ ] Paste site API integration
- [ ] Victim organization database
- [ ] Alert notification system

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

### Week 2-3 (Current)

- [x] Dashboard 1: Analytics Dashboard (v2.10.0)
- [x] Dashboard 5: Dark Theme Enhancements (v2.11.0)
- [~] Dashboard 7: Modern APT Overview (v2.12.0)

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

## 📝 Notes

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

**Last Updated:** November 2, 2025  
**Version:** v2.11.0  
**Next Milestone:** Dashboard 7 (Modern APT Overview) - v2.12.0
