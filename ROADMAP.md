# WatchLockAI Platform Roadmap

**Vision**: The most comprehensive, enterprise-grade, FREE threat intelligence platform available

**Mission**: "Know the Threat + Detect the Threat + Hunt the Threat"

---

## 🎯 Platform Overview

WatchLockAI is a unified threat intelligence platform combining:

- **Real-time threat intelligence** from 12+ authoritative sources (CISA, Microsoft, Google, etc.)
- **APT actor profiles** with MITRE ATT&CK TTPs and campaign analysis
- **Detection engineering playbooks** with SOC-ready Splunk detections
- **Dark web intelligence** for early warning of emerging threats
- **Free API integrations** for IOC enrichment (AbuseIPDB, VirusTotal, OTX)
- **Universal search** across all data types (threats, IOCs, APTs, detections)
- **Community intelligence** from curated security researcher content

**Status**: Phase 0 Complete ✅ | Phase 1 In Progress 🚀

---

## 📅 Development Phases

### ✅ Phase 0: Foundation & Regression-Proofing (COMPLETE)

**Status**: Complete (Nov 2025)
**Commit**: 093fae3

**Delivered**:

- ✅ Git hooks with Husky for pre-commit quality checks
- ✅ ESLint + Prettier for code quality and formatting
- ✅ lint-staged for automatic formatting on commit
- ✅ Comprehensive test suite (23 tests, 100% passing)
- ✅ Zero linting errors across codebase
- ✅ Automated regression prevention

**Impact**: Regression-proof development workflow ensures code quality on every commit

---

### 🚀 Phase 1: Enhanced Data Aggregation & Correlation (IN PROGRESS)

**Status**: In Progress (Nov 2025)
**Target**: Week 1-2 of November

**Goals**:

1. **Deduplication Logic** - Remove duplicate threats across sources
   - CVE-based matching
   - Title similarity (Levenshtein distance)
   - URL/link matching
   - IOC matching (IP, domain, hash)

2. **Cross-Source Correlation** - Identify same threat from multiple sources
   - Build correlation matrix
   - Generate correlationId for related threats
   - Add relatedThreats array

3. **Unified Threat View** - Merge duplicate threats
   - Combine sources array
   - Aggregate tags
   - Preserve highest risk score
   - Show "Reported by X sources" badge

**Expected Impact**:

- 20-30% reduction in threat count (deduplication)
- Higher confidence in threats reported by multiple sources
- Better risk scoring with multi-source bonus
- Cleaner, more actionable dashboard

---

### ⏳ Phase 2: Bubble-Up Logic & Critical Alerts (NEXT)

**Status**: Queued
**Target**: Week 2-3 of November

**Goals**:

1. **Enhanced Risk Scoring** - Multi-factor risk calculation
   - Multi-source bonus (threats from 3+ sources get +10 points)
   - Critical combo detection (CVE + POC + Active Exploitation = CRITICAL)
   - Temporal decay (older threats lose points)

2. **Critical Alerts Dashboard** - Surface top threats
   - Dedicated "Critical Alerts" section at top of dashboard
   - Auto-refresh every 60 seconds
   - Visual indicators (🔴 CRITICAL, 🟠 HIGH)
   - One-click drill-down to full details

3. **Bubble-Up Algorithm** - Automatic prioritization
   - Threats with risk score ≥90 bubble to top
   - Sort by: risk score → recency → source count
   - Persistent across page refreshes

**Expected Impact**:

- Analysts identify critical threats in <10 seconds
- Zero missed critical vulnerabilities
- Reduced alert fatigue with smart prioritization

---

### ⏳ Phase 3: Free API Integrations (PLANNED)

**Status**: Planned
**Target**: Week 3-4 of November

**Free APIs to Integrate**:

- **AbuseIPDB** (1,000 req/day) - IP reputation
- **VirusTotal** (500 req/day) - File/URL/IP/domain analysis
- **AlienVault OTX** (unlimited) - Threat intelligence pulses
- **ThreatFox** (unlimited) - IOC database
- **URLScan.io** (100 req/day) - URL analysis
- **GreyNoise** (100 req/day) - Internet scanner detection
- **MalwareBazaar** (unlimited) - Malware samples
- **Shodan** (100 req/month free) - Internet-connected device search
- **Censys** (250 req/month free) - Internet asset search
- **HIBP** (Have I Been Pwned) - Breach data

**Features**:

- Automatic IOC enrichment for IPs, domains, URLs, hashes
- Rate limiting and caching to stay within free tiers
- Fallback handling when APIs are unavailable
- Visual indicators for enriched threats

**Expected Impact**:

- 80%+ of threats enriched with additional context
- Better threat prioritization with reputation data
- Reduced manual research time for analysts

---

### ⏳ Phase 4: Site Merge - APT Profiles (PLANNED)

**Status**: Planned
**Target**: December 2025
**Trigger**: After Phase 2 stabilizes

**Goals**:

- Merge APT-Tracker-MITRE-AIQ into WatchLockAI
- Comprehensive APT actor profiles (APT29, APT28, Lazarus, etc.)
- MITRE ATT&CK TTPs mapping
- Campaign timeline and attribution
- Linked to real-time threats

**Expected Impact**:

- Unified platform for threat intel + APT intelligence
- Contextual understanding of threat actors
- Better attribution and campaign tracking

---

### ⏳ Phase 5: Site Merge - Detection Engineering (PLANNED)

**Status**: Planned
**Target**: December 2025
**Trigger**: After Phase 4 complete

**Goals**:

- Merge Versedetect into WatchLockAI
- SOC-ready Splunk detection playbooks
- High-fidelity detections mapped to MITRE ATT&CK
- Detection coverage matrix
- Linked to APT profiles and threats

**Expected Impact**:

- Complete "Know → Detect → Hunt" workflow
- SOC teams can deploy detections immediately
- Detection coverage visibility

---

### ⏳ Phase 6: Universal Search (PLANNED)

**Status**: Planned
**Target**: January 2026

**Goals**:

- Recorded Future-style search across all data types
- Search threats, IOCs, APT profiles, detections, tags
- Advanced filters and boolean operators
- Search history and saved searches
- Export search results

**Expected Impact**:

- Analysts find relevant information in <5 seconds
- Rivals commercial platforms in search capability

---

### ⏳ Phase 7: Dark Web Intelligence (PLANNED)

**Status**: Planned
**Target**: January-February 2026

**Goals**:

- Monitor ransomware leak sites (LockBit, BlackCat, Cl0p, etc.)
- Paste site monitoring (Pastebin, Ghostbin, etc.)
- Tor2Web proxies for legal access
- Early warning alerts for breaches
- Victim organization tracking

**Expected Impact**:

- 24-48 hour early warning before public disclosure
- VERY impressive feature for security teams
- Competitive advantage over commercial platforms

---

### ⏳ Phase 8: Community Intelligence (PLANNED)

**Status**: Planned
**Target**: February-March 2026

**Goals**:

- Curated security researcher content (FREE approach)
- Right sidebar (~25% width) for community intel
- Manual curation of important tweets/threads
- RSS feeds from security blogs
- Upgrade to Twitter API when budget allows

**Expected Impact**:

- Real-time insights from security community
- Complements structured threat data
- Zero cost until user base justifies API spend

---

## 🎯 Success Metrics

### Quantitative

- ✅ Deduplication reduces threat count by 20-30%
- ✅ Critical alerts surface top 5 threats within 1 second
- ✅ IOC enrichment adds value to 80%+ of threats
- ✅ Universal search returns results in <500ms
- ✅ Dark web intel provides early warning 24-48 hours before public disclosure
- ✅ Page load time remains <2 seconds
- ✅ 95%+ accuracy in severity classification
- ✅ Zero regressions (via automated testing)

### Qualitative

- ✅ Analysts can identify critical threats in <10 seconds
- ✅ Executive view provides actionable summary
- ✅ APT profiles provide comprehensive threat actor intelligence
- ✅ Detection playbooks are SOC-ready
- ✅ Universal search rivals Recorded Future
- ✅ Dark web intel impresses security teams
- ✅ Platform is 100% free and open-source
- ✅ UI remains clean and uncluttered
- ✅ Platform rivals commercial solutions in functionality

---

## 💰 Budget & Sustainability

**Current**: $0/month (100% free)
**Future**: Remains free until user adoption justifies spend

**Free Tier Strategy**:

- All API integrations use free tiers
- Community intelligence via manual curation (no Twitter API cost)
- GitHub Pages hosting (free)
- Cloudflare Workers (free tier: 100k req/day)

**Upgrade Path** (when user base justifies):

- Twitter API Basic tier ($200/month) for automated community intel
- Cloudflare Workers Paid ($5/month) for higher limits
- Premium API tiers for higher rate limits

---

## 🏗️ Architecture

**Frontend**: Static HTML/CSS/JS hosted on GitHub Pages
**Backend**: Cloudflare Workers (serverless edge computing)
**Storage**: Cloudflare KV (key-value store)
**Data Sources**: 12+ RSS/JSON feeds + Free APIs
**Testing**: Node.js test suite with 23 tests
**CI/CD**: Git hooks with Husky + lint-staged

---

## 🤝 Contributing

WatchLockAI is open-source and welcomes contributions!

**Areas for Contribution**:

- New threat intelligence sources
- Detection engineering playbooks
- API integrations
- UI/UX improvements
- Documentation

See `CONTRIBUTING.md` for guidelines.

---

## 📜 License

MIT License - Free for personal and commercial use

---

**Last Updated**: 2025-11-01
**Version**: 3.1
**Status**: Phase 0 Complete ✅ | Phase 1 In Progress 🚀
