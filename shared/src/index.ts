// API Types
export interface ScanRequest {
  repositoryUrl: string;
  branch?: string;
  scanType: 'pii' | 'database' | 'compliance';
  options?: {
    includePatterns?: string[];
    excludePatterns?: string[];
    maxFileSize?: number;
  };
}

export interface ScanResult {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  findings: Finding[];
  metadata: {
    startTime: string;
    endTime?: string;
    totalFiles: number;
    scannedFiles: number;
    rulesVersion: string;
  };
}

export interface FileLocation {
  file: string;
  line?: number;
  column?: number;
}

export interface DatabaseLocation {
  database: string;
  table: string;
  column: string;
}

export interface Finding {
  id: string;
  type: 'pii' | 'database' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  location: FileLocation | DatabaseLocation;
  description: string;
  rule: string;
  context?: string;
  remediation?: string;
  tags: string[];
}

export interface ComplianceReport {
  id: string;
  scanId: string;
  generatedAt: string;
  summary: {
    totalFindings: number;
    criticalFindings: number;
    highFindings: number;
    mediumFindings: number;
    lowFindings: number;
    complianceScore: number;
  };
  findings: Finding[];
  recommendations: string[];
  metadata: {
    rulesVersion: string;
    scanDuration: number;
    scannedFiles: number;
  };
}

// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

// Database Schema Types
export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'sqlserver' | 'oracle';
  host: string;
  port: number;
  database: string;
  username: string;
  encrypted: boolean;
  createdAt: string;
  lastTestedAt?: string;
}

// Utility Types
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
