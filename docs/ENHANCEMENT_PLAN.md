# APT Tracker Dashboard Enhancement Plan

## Making Threat Intelligence Actionable for Security Analysts

**Version:** 1.1.0  
**Date:** 2025-11-01  
**Status:** Planning Phase

---

## Executive Summary

This document outlines a comprehensive plan to enhance the APT Tracker dashboard with advanced filtering, prioritization, and analyst-friendly features inspired by leading threat intelligence platforms like Recorded Future, MITRE ATT&CK Navigator, and AlienVault OTX.

**Goal:** Transform the dashboard from a simple aggregator into a powerful, analyst-centric threat intelligence platform that enables rapid threat assessment, prioritization, and actionable response.

---

## Research Findings

### 1. Recorded Future Platform Capabilities

**Key Features Identified:**

- **Intelligence Cards™**: Contextual cards for CVEs, IPs, domains, malware with risk scores, evidence, and related entities
- **Risk Scoring**: Dynamic, evidence-based risk scores (0-100) that consider:
  - Exploit availability and weaponization
  - Active exploitation in the wild
  - Threat actor interest and discussion
  - Temporal factors (recency, trending)
- **Customizable Risk Lists**: Ability to create custom filtered lists by combining multiple criteria
- **High-Fidelity Alerting**: Filter by risk rules, risk scores, date ranges, and specific risk lists
- **Fusion Module**: Combine internal and external data sources with custom transformations
- **Time-Based Views**:
  - Last 24 hours (tactical)
  - Last 7 days (operational)
  - Last 30 days (strategic)
  - Custom date ranges
- **Evidence-Based Analysis**: Every risk score backed by specific evidence and references
- **Threat Actor Profiling**: Geography, industry, supply chain context
- **Integration-Ready**: CSV/JSON exports, API access, SIEM integration

**Analyst Workflow Optimizations:**

- Minimize manual aggregation and correlation
- Reduce time from discovery to action
- Provide full context with IOCs, sandbox analysis, hunting packages
- Enable proactive tuning of security controls

### 2. MITRE ATT&CK Navigator

**Key Features:**

- **Technique Heatmaps**: Visual representation of technique frequency/severity
- **Layer Annotations**: Add notes, scores, colors to techniques
- **Filtering by Tactic**: Filter techniques by kill chain phase
- **Comparison Views**: Compare multiple threat actor TTPs side-by-side
- **Export/Import**: Save and share annotated views

### 3. Industry Best Practices

**Prioritization Factors:**

1. **Severity/Impact**: CVSS score, potential business impact
2. **Exploitability**: POC availability, exploit kit integration, active exploitation
3. **Asset Context**: Affected systems, criticality, exposure
4. **Temporal Factors**: Age of vulnerability, trending status
5. **Threat Intelligence**: Threat actor interest, dark web chatter

**Filtering Dimensions:**

- Severity levels (Critical, High, Medium, Low)
- Threat types (Ransomware, Zero-day, APT, Malware, Phishing)
- Actionability (Has CVE, Has MITRE mapping, In KEV, Has POC)
- Source credibility (Government, Vendor, Research, News)
- Time windows (Real-time, 24h, 7d, 30d, Custom)

---

## Current Dashboard Capabilities

### ✅ **What We Have:**

**Tagging System:**

- CVE ID extraction (CVE-YYYY-NNNNN)
- MITRE ATT&CK technique IDs (T#### and T####.###)
- CWE ID extraction (CWE-###)
- Security keywords: RANSOMWARE, ZERO-DAY, EXPLOIT, MALWARE, PHISHING, KEV, HIGH-PRIORITY, APT

**Data Sources (12+):**

- Government: CISA News, CISA Alerts, CISA KEV, NCSC UK
- Vendors: Microsoft Security Blog, Google Project Zero
- News: BleepingComputer, The Record, Krebs on Security
- Research: Cisco Talos, Mandiant

**Current Filtering:**

- Basic query parameters: `limit`, `offset`, `after` (date), `tag`, `q` (search)
- Server-side filtering in worker
- No UI controls for filtering

**Trends Engine:**

- Hourly bucketing over 7 days
- Top sources and top tags aggregation
- Chart.js visualizations

**Architecture:**

- Cloudflare Worker backend (serverless, edge computing)
- Cloudflare KV storage (key-value persistence)
- GitHub Pages frontend (static hosting)
- Real-time aggregation (no database)

### ❌ **What We're Missing:**

1. **No Risk Scoring**: No severity/priority calculation beyond basic HIGH-PRIORITY tag
2. **No UI Filtering**: All filtering requires API parameter changes
3. **No Severity Levels**: No Critical/High/Medium/Low classification
4. **No Exploitability Indicators**: No POC tracking, exploit kit detection
5. **No Source Credibility Scoring**: All sources treated equally
6. **No Time-Based Views**: No quick filters for 24h/7d/30d
7. **No Detailed Context**: No drill-down into individual threats
8. **No Comparison Tools**: Can't compare threats or track changes
9. **No Export Functionality**: No CSV/JSON export from UI
10. **No Saved Filters**: Can't save custom filter combinations

---

## Proposed Enhancements

### **Phase 1: Advanced Filtering UI (Priority: HIGH)**

**Objective:** Add comprehensive client-side and server-side filtering controls

**Features:**

1. **Filter Bar Component** (Top of dashboard)
   - Severity: Critical, High, Medium, Low, All
   - Threat Type: Ransomware, Zero-day, Exploit, Malware, Phishing, APT, All
   - Time Window: Last 24h, Last 7d, Last 30d, Custom Range
   - Source Type: Government, Vendor, Research, News, All
   - Actionability: KEV Only, Has CVE, Has MITRE, Has POC, All

2. **Active Filter Pills**
   - Show currently active filters as removable pills
   - Clear all filters button
   - Filter count indicator

3. **Search Enhancement**
   - Full-text search across title and description
   - Search by CVE ID, MITRE technique, CWE
   - Search suggestions/autocomplete

**Implementation:**

- Add filter controls to `index.html`
- Update `app.js` with filter state management
- Enhance worker API to support new filter parameters
- Use URL query params to make filters shareable

**Estimated Effort:** 2-3 days

---

### **Phase 2: Risk Scoring Engine (Priority: HIGH)**

**Objective:** Implement evidence-based risk scoring for threat prioritization

**Risk Score Calculation (0-100):**

```
Base Score (40 points):
- KEV listing: +40 (actively exploited)
- Has CVE: +20 (identified vulnerability)
- Zero-day: +30 (no patch available)
- Has MITRE ATT&CK: +10 (documented TTP)

Exploitability (30 points):
- POC available: +15 (proof of concept exists)
- Exploit kit integration: +20 (weaponized)
- Active exploitation: +30 (in the wild)

Temporal (20 points):
- Last 24 hours: +20
- Last 7 days: +15
- Last 30 days: +10
- Older: +5

Threat Type (10 points):
- Ransomware: +10
- Zero-day: +10
- APT: +8
- Malware: +6
- Phishing: +4
- Exploit: +6
```

**Severity Classification:**

- **Critical (90-100)**: KEV + Active Exploitation + Recent
- **High (70-89)**: CVE + POC/Exploit Kit + Recent
- **Medium (40-69)**: CVE + Documented TTP
- **Low (0-39)**: General threat intelligence

**Implementation:**

- Add `calculateRiskScore()` function to `worker/lib/scoring.js`
- Enhance tagging to detect POC mentions, exploit kit names
- Add severity field to threat items
- Update UI to display risk scores with color coding
- Add risk score sorting

**Estimated Effort:** 3-4 days

---

### **Phase 3: Enhanced Tagging & Detection (Priority: MEDIUM)**

**Objective:** Improve tag extraction and add new detection capabilities

**New Tags to Add:**

- **Exploit Kits**: Angler, Neutrino, RIG, Magnitude, Fallout, etc.
- **Ransomware Families**: LockBit, BlackCat, Royal, Play, etc.
- **APT Groups**: APT28, APT29, Lazarus, etc.
- **Malware Families**: Emotet, TrickBot, Qakbot, etc.
- **POC Indicators**: "proof of concept", "POC", "exploit code"
- **Severity Keywords**: "critical", "severe", "urgent"
- **Patch Status**: "unpatched", "no patch", "patch available"

**Enhanced Detection:**

- Regex patterns for exploit kit names
- Known ransomware family database
- APT group aliases and naming variations
- Malware family signatures
- CVSS score extraction from descriptions

**Implementation:**

- Expand `extractTags()` in `worker/lib/feeds.js`
- Add pattern databases in `worker/lib/patterns.js`
- Add CVSS score extraction
- Update tests for new patterns

**Estimated Effort:** 2-3 days

---

### **Phase 4: Threat Intelligence Cards (Priority: MEDIUM)**

**Objective:** Add detailed drill-down views for individual threats

**Features:**

- **Modal/Slide-out Panel** when clicking a threat item
- **Threat Card Sections**:
  1. **Header**: Title, Risk Score, Severity Badge, Timestamp
  2. **Summary**: Full description, source attribution
  3. **Indicators**: All extracted CVEs, MITRE techniques, CWEs
  4. **Evidence**: Why this risk score? What triggered tags?
  5. **Related Entities**: Linked threats, similar TTPs
  6. **Timeline**: When discovered, when published, trending status
  7. **Actions**: Copy IOCs, Export, Mark as reviewed, Add notes
  8. **External Links**: NVD, MITRE ATT&CK, source article

**Implementation:**

- Add modal component to `index.html`
- Create `renderThreatCard()` function in `app.js`
- Add API endpoint `/api/threats/:id` for detailed view
- Store threat IDs (hash of canonical URL)
- Add keyboard navigation (ESC to close, arrow keys to navigate)

**Estimated Effort:** 3-4 days

---

### **Phase 5: Source Credibility & Weighting (Priority: LOW)**

**Objective:** Differentiate sources by credibility and adjust risk scores

**Source Tiers:**

1. **Tier 1 (Government/Official)**: CISA, NCSC, CERT - Weight: 1.2x
2. **Tier 2 (Vendor/Research)**: Microsoft, Google, Mandiant - Weight: 1.1x
3. **Tier 3 (Reputable News)**: BleepingComputer, Krebs - Weight: 1.0x
4. **Tier 4 (Community)**: User-submitted, unverified - Weight: 0.8x

**Features:**

- Source credibility badges in UI
- Risk score multiplier based on source tier
- Filter by source tier
- Source reputation tracking

**Implementation:**

- Add source tier mapping in `worker/lib/sources.js`
- Apply weight multiplier in risk score calculation
- Add tier badges to UI
- Update filter controls

**Estimated Effort:** 1-2 days

---

### **Phase 6: Advanced Analytics & Exports (Priority: LOW)**

**Objective:** Enable data export and advanced analytics

**Features:**

1. **Export Functionality**:
   - Export filtered results as CSV
   - Export as JSON for SIEM integration
   - Export MITRE ATT&CK Navigator layer
   - Export IOC list (CVEs, IPs, domains, hashes)

2. **Analytics Dashboard**:
   - Threat velocity (threats per hour/day)
   - Source distribution pie chart
   - Severity distribution
   - Top CVEs, top MITRE techniques
   - Trending threats (velocity increasing)

3. **Saved Filters**:
   - Save custom filter combinations
   - Name and share filter presets
   - Quick access to saved views

**Implementation:**

- Add export buttons to UI
- Create CSV/JSON generation functions
- Add localStorage for saved filters
- Create analytics widget
- Add MITRE Navigator layer export

**Estimated Effort:** 3-4 days

---

## Implementation Roadmap

### **Sprint 1 (Week 1): Foundation**

- [ ] Phase 1: Advanced Filtering UI
- [ ] Phase 2: Risk Scoring Engine (Part 1 - Basic scoring)

### **Sprint 2 (Week 2): Intelligence**

- [ ] Phase 2: Risk Scoring Engine (Part 2 - Severity classification)
- [ ] Phase 3: Enhanced Tagging & Detection

### **Sprint 3 (Week 3): User Experience**

- [ ] Phase 4: Threat Intelligence Cards
- [ ] UI/UX refinements and testing

### **Sprint 4 (Week 4): Polish**

- [ ] Phase 5: Source Credibility & Weighting
- [ ] Phase 6: Advanced Analytics & Exports (Part 1)

### **Sprint 5 (Week 5): Finalization**

- [ ] Phase 6: Advanced Analytics & Exports (Part 2)
- [ ] Documentation updates
- [ ] Performance optimization
- [ ] Release v1.1.0

---

## Technical Architecture Changes

### **New Worker Files:**

```
worker/
  lib/
    scoring.js       # Risk score calculation
    patterns.js      # Exploit kits, ransomware, APT groups
    analytics.js     # Trend analysis, velocity calculations
    export.js        # CSV/JSON export generation
```

### **New API Endpoints:**

```
GET /api/threats/:id              # Get detailed threat by ID
GET /api/threats/export?format=   # Export threats (csv, json, mitre)
GET /api/analytics                # Get analytics data
GET /api/filters/presets          # Get saved filter presets
POST /api/filters/presets         # Save filter preset
```

### **Frontend Enhancements:**

```
index.html
  - Filter bar component
  - Threat card modal
  - Analytics widgets
  - Export controls

app.js
  - Filter state management
  - Modal/card rendering
  - Export functions
  - Analytics visualization
```

---

## Success Metrics

**Analyst Efficiency:**

- Time to identify critical threats: < 30 seconds
- Time to assess threat relevance: < 2 minutes
- False positive rate: < 10%

**Platform Usage:**

- Daily active analysts: Track engagement
- Filters used per session: Measure feature adoption
- Export frequency: Measure actionability

**Data Quality:**

- Risk score accuracy: Validate against known exploits
- Tag precision: > 95% correct tags
- Source coverage: 15+ high-quality sources

---

## Next Steps

1. **Review and Approve Plan** - Stakeholder sign-off
2. **Create Detailed Tickets** - Break down into implementable tasks
3. **Set Up Development Branch** - `feature/analyst-enhancements`
4. **Begin Sprint 1** - Start with filtering UI
5. **Iterative Testing** - Test with real analysts throughout

---

## Appendix: Competitive Analysis

### Recorded Future Strengths:

- Evidence-based risk scoring
- Massive source coverage (750K+ sources)
- Deep dark web monitoring
- Threat actor profiling

### Our Differentiators:

- **Free and Open Source**: No licensing costs
- **Lightweight**: Serverless, fast, no infrastructure
- **Customizable**: Full control over sources and logic
- **Privacy-Focused**: No data collection, self-hosted option
- **Real-Time**: Edge computing for instant updates

### Areas to Match:

- Risk scoring sophistication
- Filtering granularity
- Analyst workflow optimization
- Export and integration capabilities
