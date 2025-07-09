import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getRepoFiles(owner: string, repo: string, path: string = ''): Promise<any[]> {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repo files:', error);
      return [];
    }
  }

  async getFileContent(owner: string, repo: string, path: string): Promise<string> {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return Buffer.from(response.data.content, 'base64').toString();
    } catch (error) {
      console.error('Error fetching file content:', error);
      return '';
    }
  }

  async scanRepoForPII(owner: string, repo: string): Promise<any> {
    const piiPatterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
      creditCard: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g
    };

    const results: any[] = [];
    
    try {
      const files = await this.getRepoFiles(owner, repo);
      
      for (const file of files) {
        if (file.type === 'file' && this.isCodeFile(file.name)) {
          const content = await this.getFileContent(owner, repo, file.path);
          
          for (const [type, pattern] of Object.entries(piiPatterns)) {
            const matches = content.match(pattern as RegExp);
            if (matches) {
              results.push({
                file: file.path,
                type,
                matches: matches.slice(0, 5) // Limit to first 5 matches
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error scanning repo:', error);
    }

    return { pii: results };
  }

  private isCodeFile(filename: string): boolean {
    const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs'];
    return codeExtensions.some(ext => filename.endsWith(ext));
  }
} 