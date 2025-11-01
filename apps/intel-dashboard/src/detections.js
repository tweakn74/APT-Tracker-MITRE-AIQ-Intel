// Detection Engineering Module
let allDetections = [];
let filteredDetections = [];

// Load detections from JSON
async function loadDetections() {
  try {
    const response = await fetch('/data/detections.json');
    const data = await response.json();
    allDetections = data.detections || [];
    filteredDetections = [...allDetections];
    
    updateStats();
    populateFilters();
    renderDetections();
    renderCoverageMatrix();
  } catch (error) {
    console.error('Error loading detections:', error);
    document.getElementById('detectionGrid').innerHTML = 
      '<p style="color: var(--text-secondary);">Error loading detections. Please try again later.</p>';
  }
}

// Update statistics
function updateStats() {
  const total = allDetections.length;
  const critical = allDetections.filter(d => d.severity === 'CRITICAL').length;
  const high = allDetections.filter(d => d.severity === 'HIGH').length;
  
  // Count unique techniques
  const techniques = new Set();
  allDetections.forEach(d => {
    d.techniques.forEach(t => techniques.add(t.id));
  });
  
  document.getElementById('totalDetections').textContent = total;
  document.getElementById('criticalCount').textContent = critical;
  document.getElementById('highCount').textContent = high;
  document.getElementById('techniquesCovered').textContent = techniques.size;
}

// Populate filter dropdowns
function populateFilters() {
  const platforms = new Set();
  allDetections.forEach(d => platforms.add(d.platform));
  
  const platformFilter = document.getElementById('platformFilter');
  platforms.forEach(platform => {
    const option = document.createElement('option');
    option.value = platform;
    option.textContent = platform;
    platformFilter.appendChild(option);
  });
}

// Render detection cards
function renderDetections() {
  const grid = document.getElementById('detectionGrid');
  
  if (filteredDetections.length === 0) {
    grid.innerHTML = '<p style="color: var(--text-secondary);">No detections match your filters.</p>';
    return;
  }
  
  grid.innerHTML = filteredDetections.map(detection => createDetectionCard(detection)).join('');
  
  // Add click handlers
  document.querySelectorAll('.detection-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const detection = allDetections.find(d => d.id === id);
      showDetectionModal(detection);
    });
  });
}

// Create detection card HTML
function createDetectionCard(detection) {
  return `
    <div class="detection-card" data-id="${detection.id}">
      <div class="detection-header">
        <div>
          <div class="detection-name">${detection.name}</div>
          <div class="detection-id">${detection.id}</div>
        </div>
        <div>
          <span class="severity-badge severity-${detection.severity.toLowerCase()}">${detection.severity}</span>
        </div>
      </div>
      
      <div class="detection-meta">
        <div class="meta-item">
          <span class="status-badge status-${detection.status}">${detection.status}</span>
        </div>
        <div class="meta-item">
          <span class="platform-badge">${detection.platform}</span>
        </div>
        ${detection.falsePositiveRate ? `
          <div class="meta-item">
            <span class="fp-rate fp-${detection.falsePositiveRate}">FP: ${detection.falsePositiveRate}</span>
          </div>
        ` : ''}
      </div>
      
      <div class="detection-description">
        ${detection.description}
      </div>
      
      <div class="techniques-section">
        <div class="section-label">🎯 MITRE ATT&CK Techniques</div>
        <div class="technique-tags">
          ${detection.techniques.map(t => `
            <span class="technique-tag" title="${t.name} - ${t.tactic}">${t.id}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Show detection detail modal
function showDetectionModal(detection) {
  const modal = document.getElementById('detectionModal');
  const content = document.getElementById('modalContent');
  
  content.innerHTML = `
    <h2>${detection.name}</h2>
    <div style="margin-bottom: 20px;">
      <span class="severity-badge severity-${detection.severity.toLowerCase()}">${detection.severity}</span>
      <span class="status-badge status-${detection.status}">${detection.status}</span>
      <span class="platform-badge">${detection.platform} - ${detection.queryLanguage}</span>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3>Description</h3>
      <p style="color: var(--text-primary); line-height: 1.6;">${detection.description}</p>
    </div>
    
    ${detection.useCase ? `
      <div style="margin-bottom: 20px;">
        <h3>Use Case</h3>
        <p style="color: var(--text-primary);">${detection.useCase}</p>
      </div>
    ` : ''}
    
    <div style="margin-bottom: 20px;">
      <h3>Detection Query</h3>
      <div class="query-block">${detection.query}</div>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3>MITRE ATT&CK Techniques</h3>
      <div class="technique-tags">
        ${detection.techniques.map(t => `
          <span class="technique-tag" title="${t.name} - ${t.tactic}">
            ${t.id}: ${t.name} (${t.tactic})
          </span>
        `).join('')}
      </div>
    </div>
    
    ${detection.dataSource ? `
      <div style="margin-bottom: 20px;">
        <h3>Required Data Sources</h3>
        <ul style="color: var(--text-primary);">
          ${detection.dataSource.map(ds => `<li>${ds}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    ${detection.enrichment ? `
      <div style="margin-bottom: 20px;">
        <h3>Enrichment Strategy</h3>
        <p style="color: var(--text-primary); line-height: 1.6;">${detection.enrichment}</p>
      </div>
    ` : ''}
    
    ${detection.tuning ? `
      <div style="margin-bottom: 20px;">
        <h3>Tuning Notes</h3>
        <p style="color: var(--text-primary); line-height: 1.6;">${detection.tuning}</p>
      </div>
    ` : ''}
    
    ${detection.responseActions ? `
      <div style="margin-bottom: 20px;">
        <h3>Response Actions</h3>
        <ul class="response-actions">
          ${detection.responseActions.map(action => `<li>${action}</li>`).join('')}
        </ul>
      </div>
    ` : ''}
    
    ${detection.falsePositiveRate ? `
      <div style="margin-bottom: 20px;">
        <h3>False Positive Rate</h3>
        <span class="fp-rate fp-${detection.falsePositiveRate}">${detection.falsePositiveRate.toUpperCase()}</span>
      </div>
    ` : ''}
    
    <div style="margin-bottom: 20px;">
      <h3>Metadata</h3>
      <p style="color: var(--text-secondary); font-size: 0.9em;">
        <strong>Author:</strong> ${detection.author || 'Unknown'}<br>
        <strong>Created:</strong> ${detection.created || 'Unknown'}<br>
        <strong>Last Updated:</strong> ${detection.lastUpdated || 'Unknown'}
      </p>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Filter detections
function applyFilters() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const severity = document.getElementById('severityFilter').value;
  const status = document.getElementById('statusFilter').value;
  const platform = document.getElementById('platformFilter').value;
  
  filteredDetections = allDetections.filter(detection => {
    const matchesSearch = !searchTerm || 
      detection.name.toLowerCase().includes(searchTerm) ||
      detection.description.toLowerCase().includes(searchTerm) ||
      detection.techniques.some(t => t.id.toLowerCase().includes(searchTerm) || t.name.toLowerCase().includes(searchTerm));
    
    const matchesSeverity = !severity || detection.severity === severity;
    const matchesStatus = !status || detection.status === status;
    const matchesPlatform = !platform || detection.platform === platform;
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesPlatform;
  });
  
  renderDetections();
}

// Render MITRE ATT&CK coverage matrix
function renderCoverageMatrix() {
  const matrix = document.getElementById('coverageMatrix');
  
  // Group techniques by tactic
  const tacticMap = {};
  allDetections.forEach(detection => {
    detection.techniques.forEach(technique => {
      if (!tacticMap[technique.tactic]) {
        tacticMap[technique.tactic] = new Set();
      }
      tacticMap[technique.tactic].add(technique.id);
    });
  });
  
  // Render matrix
  let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">';
  
  Object.keys(tacticMap).sort().forEach(tactic => {
    const techniques = Array.from(tacticMap[tactic]).sort();
    html += `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 8px; padding: 15px;">
        <h3 style="color: var(--accent); margin-bottom: 15px; font-size: 1.1em;">${tactic}</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${techniques.map(techId => {
            const detection = allDetections.find(d => d.techniques.some(t => t.id === techId));
            const technique = detection.techniques.find(t => t.id === techId);
            return `
              <div style="background: var(--bg-tertiary); border: 1px solid var(--border); padding: 8px; border-radius: 4px;">
                <div style="font-family: monospace; font-size: 0.9em; color: var(--accent);">${techId}</div>
                <div style="font-size: 0.85em; color: var(--text-secondary);">${technique.name}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  matrix.innerHTML = html;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadDetections();
  
  // Filter event listeners
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('severityFilter').addEventListener('change', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);
  document.getElementById('platformFilter').addEventListener('change', applyFilters);
  
  // Modal close
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('detectionModal').style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('detectionModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(`${tabName}Tab`).classList.add('active');
    });
  });
});

