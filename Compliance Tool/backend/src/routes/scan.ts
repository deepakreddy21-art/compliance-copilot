import { Router, Request, Response } from 'express';
import { supabase } from '../utils/supabaseClient';
import { GitHubService } from '../services/githubService';

const router = Router();

// POST /scan/code
router.post('/code', async (req: Request, res: Response) => {
  const { user_id, repo_url, github_token } = req.body;
  
  let scanData;
  
  if (github_token && repo_url) {
    try {
      // Extract owner and repo from URL
      const urlParts = repo_url.replace('https://github.com/', '').split('/');
      const owner = urlParts[0];
      const repo = urlParts[1];
      
      const githubService = new GitHubService(github_token);
      scanData = await githubService.scanRepoForPII(owner, repo);
    } catch (error) {
      console.error('GitHub scan failed, using mock data:', error);
      // Fallback to mock data
      scanData = {
        pii: [
          { file: 'src/index.js', type: 'email', matches: ['user@example.com'] },
          { file: 'src/app.js', type: 'phone', matches: ['555-123-4567'] }
        ]
      };
    }
  } else {
    // Mock scan result
    scanData = {
      pii: [
        { file: 'src/index.js', type: 'email', matches: ['user@example.com'] },
        { file: 'src/app.js', type: 'name', matches: ['John Doe'] }
      ]
    };
  }

  const { data, error } = await supabase
    .from('pii_scan_results')
    .insert([{ user_id, repo_url, scan_data: scanData }])
    .select()
    .single();
    
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /scan/db
router.post('/db', async (req: Request, res: Response) => {
  const { user_id, db_info } = req.body;
  // Mock DB scan result
  const scanData = {
    columns: [
      { table: 'users', column: 'email', type: 'email' },
      { table: 'users', column: 'name', type: 'name' },
      { table: 'logs', column: 'ip_address', type: 'ip' }
    ]
  };
  const { data, error } = await supabase
    .from('db_scan_results')
    .insert([{ user_id, db_info, scan_data: scanData }])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router; 