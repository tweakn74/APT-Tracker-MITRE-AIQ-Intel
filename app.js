/**
 * Frontend application for APT Tracker dashboard
 */

// Configuration
const API_BASE = 'https://YOUR_WORKER_URL'; // Update this after deploying the worker
const THREATS_POLL_INTERVAL = 3 * 60 * 1000; // 3 minutes
const TRENDS_POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

// State
let threatsChart = null;
let tagsChart = null;

/**
 * Initialize the dashboard
 */
async function init() {
  console.log('Initializing APT Tracker dashboard...');
  
  // Initial load
  await Promise.all([
    loadThreats(),
    loadTrends(),
    loadSources(),
  ]);
  
  // Set up polling
  setInterval(loadThreats, THREATS_POLL_INTERVAL);
  setInterval(loadTrends, TRENDS_POLL_INTERVAL);
  setInterval(loadSources, TRENDS_POLL_INTERVAL);
}

/**
 * Load current threats
 */
async function loadThreats() {
  const container = document.getElementById('threats-container');
  const status = document.getElementById('threats-status');
  
  try {
    status.textContent = 'Loading...';
    status.className = 'status loading';
    
    const response = await fetch(`${API_BASE}/api/threats?limit=60`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      renderThreats(data.items, container);
      status.textContent = 'Live';
      status.className = 'status live';
      
      // Update aria-live region
      container.setAttribute('aria-live', 'polite');
    } else {
      container.innerHTML = '<div class="empty-state"><p>No threats found</p></div>';
      status.textContent = 'No Data';
      status.className = 'status';
    }
    
  } catch (error) {
    console.error('Failed to load threats:', error);
    container.innerHTML = `<div class="error-state"><p>Failed to load threats: ${escapeHtml(error.message)}</p></div>`;
    status.textContent = 'Error';
    status.className = 'status error';
  }
}

/**
 * Render threats list
 */
function renderThreats(items, container) {
  const listHtml = items.map(item => {
    const isHighPriority = item.tags && item.tags.includes('HIGH-PRIORITY');
    const priorityClass = isHighPriority ? 'high-priority' : '';
    
    const tagsHtml = (item.tags || []).map(tag => {
      let tagClass = 'tag';
      if (tag.startsWith('CVE-')) tagClass += ' cve';
      else if (tag.startsWith('T')) tagClass += ' attack';
      else if (tag === 'HIGH-PRIORITY') tagClass += ' high-priority';
      
      return `<span class="${tagClass}">${escapeHtml(tag)}</span>`;
    }).join('');
    
    const localTime = formatLocalTime(item.pubDate);
    
    return `
      <div class="threat-item ${priorityClass}">
        <div class="threat-title">
          <a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(item.title)}
          </a>
        </div>
        <div class="threat-meta">
          <span>📰 ${escapeHtml(item.source)}</span>
          <span>🕒 ${localTime}</span>
        </div>
        ${tagsHtml ? `<div class="threat-tags">${tagsHtml}</div>` : ''}
      </div>
    `;
  }).join('');
  
  container.innerHTML = `<div class="threats-list">${listHtml}</div>`;
}

/**
 * Load trends data
 */
async function loadTrends() {
  const status = document.getElementById('trends-status');
  
  try {
    status.textContent = 'Loading...';
    status.className = 'status loading';
    
    const response = await fetch(`${API_BASE}/api/trends`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.buckets && data.buckets.length > 0) {
      renderTrends(data.buckets);
      status.textContent = 'Live';
      status.className = 'status live';
    } else {
      status.textContent = 'No Data';
      status.className = 'status';
    }
    
  } catch (error) {
    console.error('Failed to load trends:', error);
    status.textContent = 'Error';
    status.className = 'status error';
  }
}

/**
 * Render trends charts
 */
function renderTrends(buckets) {
  // Prepare data
  const labels = buckets.map(b => formatChartTime(b.bucket));
  
  // Aggregate sources
  const sourcesData = aggregateTopN(buckets, 'sources', 5);
  const tagsData = aggregateTopN(buckets, 'tags', 5);
  
  // Render sources chart
  if (threatsChart) {
    threatsChart.destroy();
  }
  
  const sourcesCtx = document.getElementById('sources-chart').getContext('2d');
  threatsChart = new Chart(sourcesCtx, {
    type: 'line',
    data: {
      labels,
      datasets: Object.entries(sourcesData).map(([name, values], idx) => ({
        label: name,
        data: values,
        borderColor: getChartColor(idx),
        backgroundColor: getChartColor(idx, 0.1),
        tension: 0.3,
      })),
    },
    options: getChartOptions(),
  });
  
  // Render tags chart
  if (tagsChart) {
    tagsChart.destroy();
  }
  
  const tagsCtx = document.getElementById('tags-chart').getContext('2d');
  tagsChart = new Chart(tagsCtx, {
    type: 'line',
    data: {
      labels,
      datasets: Object.entries(tagsData).map(([name, values], idx) => ({
        label: name,
        data: values,
        borderColor: getChartColor(idx),
        backgroundColor: getChartColor(idx, 0.1),
        tension: 0.3,
      })),
    },
    options: getChartOptions(),
  });
}

/**
 * Aggregate top N items from buckets
 */
function aggregateTopN(buckets, field, n) {
  // Count totals
  const totals = {};
  buckets.forEach(bucket => {
    Object.entries(bucket.data[field] || {}).forEach(([name, count]) => {
      totals[name] = (totals[name] || 0) + count;
    });
  });
  
  // Get top N
  const topN = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name]) => name);
  
  // Build datasets
  const datasets = {};
  topN.forEach(name => {
    datasets[name] = buckets.map(bucket => bucket.data[field][name] || 0);
  });
  
  return datasets;
}

/**
 * Load new sources
 */
async function loadSources() {
  const container = document.getElementById('sources-container');
  const status = document.getElementById('sources-status');
  
  try {
    status.textContent = 'Loading...';
    status.className = 'status loading';
    
    const response = await fetch(`${API_BASE}/api/sources`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.recentlyApproved && data.recentlyApproved.length > 0) {
      renderSources(data.recentlyApproved, container);
      status.textContent = 'Live';
      status.className = 'status live';
    } else {
      container.innerHTML = '<div class="empty-state"><p>No new sources in the last 7 days</p></div>';
      status.textContent = 'No Data';
      status.className = 'status';
    }
    
  } catch (error) {
    console.error('Failed to load sources:', error);
    container.innerHTML = `<div class="error-state"><p>Failed to load sources</p></div>`;
    status.textContent = 'Error';
    status.className = 'status error';
  }
}

/**
 * Render sources list
 */
function renderSources(sources, container) {
  const listHtml = sources.map(source => {
    const url = typeof source === 'string' ? source : source.url;
    const approvedAt = source.approvedAt ? formatLocalTime(source.approvedAt) : 'Recently';
    const title = source.title || new URL(url).hostname;
    
    return `
      <li class="source-item">
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(title)}
        </a>
        <span class="source-date">${approvedAt}</span>
      </li>
    `;
  }).join('');
  
  container.innerHTML = `<ul class="sources-list">${listHtml}</ul>`;
}

/**
 * Utility: Escape HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Utility: Format local time
 */
function formatLocalTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

/**
 * Utility: Format chart time
 */
function formatChartTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Utility: Get chart color
 */
function getChartColor(index, alpha = 1) {
  const colors = [
    `rgba(88, 166, 255, ${alpha})`,
    `rgba(63, 185, 80, ${alpha})`,
    `rgba(210, 153, 34, ${alpha})`,
    `rgba(248, 81, 73, ${alpha})`,
    `rgba(188, 134, 252, ${alpha})`,
  ];
  return colors[index % colors.length];
}

/**
 * Utility: Chart options
 */
function getChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#c9d1d9',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#8b949e' },
        grid: { color: '#30363d' },
      },
      y: {
        ticks: { color: '#8b949e' },
        grid: { color: '#30363d' },
        beginAtZero: true,
      },
    },
  };
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

