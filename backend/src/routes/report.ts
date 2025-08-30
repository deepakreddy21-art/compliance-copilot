import { Router, Request, Response } from 'express';
import { supabase } from '../utils/supabaseClient';
import { generateComplianceChecklist } from '../services/openaiService';

const router = Router();

// POST /generate-report
router.post('/', async (req: Request, res: Response) => {
  const { user_id, report_type, scan_data } = req.body;
  try {
    // Generate checklist using OpenAI
    const checklist = await generateComplianceChecklist(scan_data, report_type);
    const { data, error } = await supabase
      .from('compliance_reports')
      .insert([{ user_id, report_type, report_data: { checklist } }])
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to generate report' });
  }
});

export default router; 