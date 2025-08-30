import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateComplianceChecklist(scanData: any, reportType: string = 'GDPR') {
  const prompt = `You are a compliance expert. Given the following scan results, generate a ${reportType} compliance checklist with pass/fail for each item and a short explanation.\n\nScan Results:\n${JSON.stringify(scanData, null, 2)}\n\nChecklist (JSON array with fields: item, status, explanation):`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a compliance expert.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 500,
    temperature: 0.2,
  });

  // Try to parse the checklist from the response
  const text = response.choices[0].message?.content || '';
  try {
    const checklist = JSON.parse(text.match(/\[.*\]/s)?.[0] || '[]');
    return checklist;
  } catch {
    return [{ item: 'Could not parse checklist', status: 'fail', explanation: text }];
  }
} 