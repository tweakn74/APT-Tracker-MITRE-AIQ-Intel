# WatchLockAI Dashboard - What You See as a User

This guide describes exactly what you should see when using the WatchLockAI intelligence dashboard.

---

## 🌐 Accessing the Dashboard

**Local Development:**
```bash
# Start the server
npx http-server apps/intel-dashboard -p 8080 -c-1

# Open in browser
http://localhost:8080/apt-profiles.html
http://localhost:8080/detections.html
```

**Run Visual Demo:**
```bash
# Automated visual tour (opens browser, shows all features)
npm run test:e2e -- e2e-tests/simple-user-demo.spec.js --headed
```

---

## 📄 Page 1: APT Profiles

**URL:** `http://localhost:8080/apt-profiles.html`

### What You See

#### **Page Header**
- **Title:** "APT Profiles - WatchLockAI"
- **Main Heading:** "APT Profiles"
- **Description:** Overview of Advanced Persistent Threat actor groups

#### **Filter Controls** (Top of page)

1. **Search Box**
   - Label: "Search"
   - Placeholder: "Search by name, alias, or description..."
   - Function: Real-time filtering of APT actors

2. **Country Filter**
   - Label: "Country" (properly associated with dropdown via `for="countryFilter"`)
   - Options: All Countries, [dynamically populated from data]
   - Function: Filter actors by country of origin

3. **Sophistication Filter**
   - Label: "Sophistication" (properly associated via `for="sophisticationFilter"`)
   - Options: All Levels, Advanced, High, Medium, Low
   - Function: Filter actors by sophistication level

4. **Motivation Filter**
   - Label: "Motivation" (properly associated via `for="motivationFilter"`)
   - Options: All Motivations, Espionage, Financial, Destructive
   - Function: Filter actors by primary motivation

#### **APT Actor Cards**

Each card displays:
- **Actor Name** (e.g., "APT28", "Lazarus Group")
- **Aliases** (alternative names)
- **Country Flag** and origin country
- **Sophistication Badge** (color-coded: Advanced, High, Medium, Low)
- **Motivation Tags** (Espionage, Financial, Destructive)
- **Description** (brief overview of the threat actor)
- **Known Targets** (industries, sectors)
- **Active Since** (year of first observed activity)

#### **Visual Design**
- Clean card-based layout
- Color-coded sophistication levels:
  - 🔴 Advanced (red)
  - 🟠 High (orange)
  - 🟡 Medium (yellow)
  - 🟢 Low (green)
- Responsive grid layout
- Hover effects on cards

---

### How to Use APT Profiles Page

#### **Filter by Sophistication**
1. Click the "Sophistication" dropdown
2. Select "Advanced"
3. **Result:** Only advanced APT actors are displayed
4. Select "All Levels" to reset

#### **Filter by Motivation**
1. Click the "Motivation" dropdown
2. Select "Espionage"
3. **Result:** Only espionage-motivated actors are displayed
4. Select "All Motivations" to reset

#### **Search for Actors**
1. Click in the search box
2. Type "China" (or any search term)
3. **Result:** Actors matching "China" in name, alias, or description are shown
4. Clear the search box to show all actors

#### **Combine Filters**
1. Select Sophistication = "Advanced"
2. Select Motivation = "Espionage"
3. **Result:** Only advanced espionage actors are displayed

---

## 📄 Page 2: Detection Engineering

**URL:** `http://localhost:8080/detections.html`

### What You See

#### **Page Header**
- **Title:** "Detection Engineering - WatchLockAI"
- **Main Heading:** "Detection Engineering"
- **Description:** Detection rules and MITRE ATT&CK coverage

#### **Tab Navigation**
Two tabs at the top:
1. **Detection Catalog** (active by default)
   - Shows detection rule cards
2. **MITRE Coverage**
   - Shows MITRE ATT&CK coverage matrix

#### **Statistics Cards** (Detection Catalog tab)
- **Total Detections:** Count of detection rules
- **Techniques Covered:** Count of MITRE ATT&CK techniques

#### **Filter Controls** (Detection Catalog tab)

1. **Search Box**
   - Label: "Search"
   - Placeholder: "Search detections..."
   - Function: Real-time filtering of detection rules

2. **Severity Filter**
   - Label: "Severity" (properly associated via `for="severityFilter"`)
   - Options: All Severities, Critical, High, Medium, Low
   - Function: Filter by severity level

3. **Status Filter**
   - Label: "Status" (properly associated via `for="statusFilter"`)
   - Options: All Status, Stable, Preview, Experimental
   - Function: Filter by detection status

4. **Platform Filter**
   - Label: "Platform" (properly associated via `for="platformFilter"`)
   - Options: All Platforms, Windows, Linux, macOS, Cloud, Network
   - Function: Filter by target platform

#### **Detection Rule Cards** (Detection Catalog tab)

Each card displays:
- **Rule Name** (e.g., "Suspicious PowerShell Execution")
- **Severity Badge** (color-coded: Critical, High, Medium, Low)
- **Status Badge** (Stable, Preview, Experimental)
- **Platform Tags** (Windows, Linux, macOS, etc.)
- **MITRE ATT&CK Techniques** (e.g., T1059.001)
- **Description** (what the detection identifies)
- **Detection Logic** (brief overview)

#### **MITRE Coverage Matrix** (MITRE Coverage tab)

Displays:
- **Tactics** (columns): Initial Access, Execution, Persistence, Privilege Escalation, etc.
- **Techniques** (rows under each tactic)
- **Coverage Indicators:**
  - ✅ Green: Covered by detection rules
  - ⚠️ Yellow: Partial coverage
  - ❌ Red: No coverage
- **Coverage Percentages** for each tactic

#### **Visual Design**
- Clean card-based layout (Detection Catalog)
- Matrix/grid layout (MITRE Coverage)
- Color-coded severity levels:
  - 🔴 Critical (red)
  - 🟠 High (orange)
  - 🟡 Medium (yellow)
  - 🟢 Low (green)
- Tab switching with smooth transitions

---

### How to Use Detection Engineering Page

#### **View Detection Catalog**
1. Ensure "Detection Catalog" tab is active (default)
2. Scroll through detection rule cards
3. Read rule details, severity, platforms, MITRE techniques

#### **Filter by Severity**
1. Click the "Severity" dropdown
2. Select "CRITICAL"
3. **Result:** Only critical severity detections are displayed
4. Select "All Severities" to reset

#### **Filter by Status**
1. Click the "Status" dropdown
2. Select "Stable"
3. **Result:** Only stable (production-ready) detections are displayed
4. Select "All Status" to reset

#### **Filter by Platform**
1. Click the "Platform" dropdown
2. Select "Windows"
3. **Result:** Only Windows detections are displayed
4. Select "All Platforms" to reset

#### **Search for Detections**
1. Click in the search box
2. Type "PowerShell" (or any search term)
3. **Result:** Detections matching "PowerShell" are shown
4. Clear the search box to show all detections

#### **View MITRE Coverage**
1. Click the "MITRE Coverage" tab
2. **Result:** Tab switches to show MITRE ATT&CK coverage matrix
3. View coverage percentages for each tactic
4. Identify gaps in detection coverage

#### **Switch Back to Detection Catalog**
1. Click the "Detection Catalog" tab
2. **Result:** Tab switches back to detection rule cards

---

## ♿ Accessibility Features

### What You Experience

#### **Label Associations** (Recent Fix ✅)
- **Before:** Clicking a label did nothing
- **After:** Clicking a label focuses its associated dropdown
- **Example:**
  1. Click the "Severity" label text
  2. **Result:** The Severity dropdown is automatically focused
  3. You can immediately start typing or use arrow keys

#### **Screen Reader Support**
- All form controls have accessible names
- Screen readers announce labels when focusing on dropdowns
- Proper ARIA attributes for dynamic content

#### **Keyboard Navigation**
- Press **Tab** to move between controls
- Press **Shift+Tab** to move backwards
- Press **Enter** or **Space** to activate buttons
- Use **Arrow Keys** in dropdowns to select options
- All interactive elements are keyboard accessible

#### **Focus Indicators**
- Visible focus outline on all interactive elements
- Clear indication of which element has focus
- Consistent focus styling across the dashboard

---

## 💎 Code Quality Improvements

### What Changed (Behind the Scenes)

#### **Before (Inline Styles):**
```html
<nav class="nav-menu" style="margin-bottom: 20px;">
<p style="color: var(--text-secondary); margin-bottom: 20px;">
```

#### **After (CSS Classes):**
```html
<nav class="nav-menu nav-menu-spaced">
<p class="coverage-description">
```

**Benefits:**
- ✅ Separation of concerns (HTML structure vs. CSS presentation)
- ✅ Easier to maintain and update styles
- ✅ Better performance (CSS can be cached)
- ✅ Follows web development best practices

---

## 🎯 Summary of Features

### APT Profiles Page
- ✅ 8 APT threat actor groups
- ✅ Filter by Country, Sophistication, Motivation
- ✅ Real-time search functionality
- ✅ Combined filter support
- ✅ Accessible label associations
- ✅ Keyboard navigation

### Detection Engineering Page
- ✅ 15 detection rules
- ✅ Filter by Severity, Status, Platform
- ✅ Real-time search functionality
- ✅ Tab switching (Detection Catalog ↔ MITRE Coverage)
- ✅ MITRE ATT&CK coverage matrix
- ✅ Accessible label associations
- ✅ Keyboard navigation
- ✅ Clean CSS (no inline styles)

---

## 🚀 Quick Start Commands

```bash
# Start the dashboard server
npx http-server apps/intel-dashboard -p 8080 -c-1

# Run visual demo (automated tour)
npx playwright test e2e-tests/simple-user-demo.spec.js --headed

# Run all E2E tests
npm run test:e2e

# View test report
npm run test:e2e:report
```

---

## 📸 Screenshots

Screenshots of all pages are available in:
```
playwright-report/screenshots/
├── apt-profiles.png
├── detections-catalog.png
└── detections-coverage.png
```

---

**Last Updated:** 2025-11-01  
**Dashboard Version:** WatchLockAI v2.7.0  
**Test Coverage:** 92.3% (48/52 tests passing)

