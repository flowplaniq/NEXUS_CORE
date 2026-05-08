export interface DeploymentRequest {
  id: string;
  software: string;
  version: string;
  tenant: string;
  requestedBy: string;
  status: 'QUEUED' | 'COPYING' | 'INSTALLING' | 'VALIDATING' | 'SUCCESS' | 'FAILED';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  nodes: number;
  progress: number;
  timestamp: string;
}

export interface ExecutionNode {
  id: string;
  alias: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  cpu: number;
  ram: number;
  jobs: number;
  location: string;
  uptime: string;
}

export interface Package {
  id: string;
  name: string;
  version: string;
  size: string;
  type: 'MSI' | 'EXE' | 'POWERSHELL';
  health: 'VALIDATED' | 'DRAFT' | 'ERROR';
  deployedCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'ANALYST' | 'SYSTEM';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastSeen: string;
  avatar: string;
}

export interface Metric {
  label: string;
  value: number | string;
  trend: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  icon: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'SECURITY';
  module: string;
  message: string;
  user?: string;
}
