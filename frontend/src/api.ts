const API_BASE = 'http://localhost:4000'; // Update if deployed elsewhere

export async function scanCode(user_id: string, repo_url: string, github_token?: string) {
  const res = await fetch(`${API_BASE}/scan/code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, repo_url, github_token })
  });
  return res.json();
}

export async function scanDb(user_id: string, db_info: string) {
  const res = await fetch(`${API_BASE}/scan/db`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, db_info })
  });
  return res.json();
}

export async function generateReport(user_id: string, report_type: string, report_data?: any) {
  const res = await fetch(`${API_BASE}/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, report_type, report_data })
  });
  return res.json();
} 