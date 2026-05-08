import { DeploymentRequest, ExecutionNode, LogEntry, Metric, Package, User } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Commander Nexus', email: 'nexus@neural-link.ai', role: 'ADMIN', status: 'ACTIVE', lastSeen: '2 mins ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus' },
  { id: '2', name: 'Officer K', email: 'k@neural-link.ai', role: 'OPERATOR', status: 'ACTIVE', lastSeen: 'Just now', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=K' },
];

export const MOCK_METRICS: Metric[] = [
  { label: 'ACTIVE DEPLOYMENTS', value: '42', trend: 15.4, status: 'HEALTHY', icon: 'Zap' },
  { label: 'QUEUE THROUGHPUT', value: '1.2k/s', trend: 2.1, status: 'HEALTHY', icon: 'Activity' },
  { label: 'ONLINE NODES', value: '8,402', trend: 0.5, status: 'HEALTHY', icon: 'Network' },
  { label: 'FAILED JOBS', value: '3', trend: -75, status: 'WARNING', icon: 'ShieldAlert' },
  { label: 'SUCCESS RATE', value: '99.4%', trend: 0.2, status: 'HEALTHY', icon: 'Target' },
  { label: 'PENDING APPROVALS', value: '12', trend: 4, status: 'WARNING', icon: 'FileText' },
];

export const MOCK_DEPLOYMENTS: DeploymentRequest[] = [
  { id: 'REQ-10042', software: 'Nexus Security Core', version: 'v4.2.1', tenant: 'Global Finance', requestedBy: 'Officer K', status: 'INSTALLING', approvalStatus: 'APPROVED', nodes: 420, progress: 65, timestamp: '2026-05-08 07:10' },
  { id: 'REQ-10043', software: 'Neural Buffer Sync', version: 'v1.0.8', tenant: 'Tech Solutions', requestedBy: 'Nexus', status: 'SUCCESS', approvalStatus: 'APPROVED', nodes: 1200, progress: 100, timestamp: '2026-05-08 06:45' },
  { id: 'REQ-10044', software: 'Cyber Firewall Edge', version: 'v9.4.0', tenant: 'Secure Gov', requestedBy: 'Officer K', status: 'FAILED', approvalStatus: 'APPROVED', nodes: 85, progress: 24, timestamp: '2026-05-08 06:30' },
  { id: 'REQ-10045', software: 'Data Mesh Relay', version: 'v2.1.2', tenant: 'Nexus Core', requestedBy: 'System', status: 'COPYING', approvalStatus: 'APPROVED', nodes: 2500, progress: 12, timestamp: '2026-05-08 07:15' },
  { id: 'REQ-10046', software: 'GPU Driver Patch', version: 'v551.4', tenant: 'Visual Matrix', requestedBy: 'Nexus', status: 'QUEUED', approvalStatus: 'PENDING', nodes: 500, progress: 0, timestamp: '2026-05-08 07:20' },
];

export const MOCK_NODES: ExecutionNode[] = [
  { id: 'NODE-01', alias: 'Edge-Alpha-01', status: 'ONLINE', cpu: 42, ram: 65, jobs: 4, location: 'Sector 7G', uptime: '14d 2h' },
  { id: 'NODE-02', alias: 'Edge-Beta-04', status: 'ONLINE', cpu: 12, ram: 24, jobs: 0, location: 'Sector 4B', uptime: '42d 12h' },
  { id: 'NODE-03', alias: 'Core-Matrix-01', status: 'MAINTENANCE', cpu: 0, ram: 10, jobs: 0, location: 'Central Hub', uptime: '0d 0h' },
  { id: 'NODE-04', alias: 'Edge-Gamma-09', status: 'ONLINE', cpu: 89, ram: 92, jobs: 12, location: 'Sector 12F', uptime: '2d 6h' },
];

export const MOCK_PACKAGES: Package[] = [
  { id: 'PKG-001', name: 'Nexus Security Core', version: 'v4.2.1', size: '1.2 GB', type: 'MSI', health: 'VALIDATED', deployedCount: 4240 },
  { id: 'PKG-002', name: 'Cyber Firewall Edge', version: 'v9.4.0', size: '450 MB', type: 'EXE', health: 'VALIDATED', deployedCount: 12800 },
  { id: 'PKG-003', name: 'Data Mesh Relay', version: 'v2.1.2', size: '12 MB', type: 'POWERSHELL', health: 'VALIDATED', deployedCount: 450 },
  { id: 'PKG-004', name: 'Legacy Patch X', version: 'v0.9.1', size: '2 GB', type: 'MSI', health: 'ERROR', deployedCount: 0 },
];

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '2026-05-08 07:15:01', level: 'SUCCESS', module: 'DEPLOY', message: 'Package Nexus Security Core successfully copied to Edge-Alpha-01.', user: 'SYSTEM' },
  { id: '2', timestamp: '2026-05-08 07:14:45', level: 'INFO', module: 'CORE', message: 'Deployment REQ-10045 initiated by automated trigger.', user: 'Nexus' },
  { id: '3', timestamp: '2026-05-08 07:12:12', level: 'WARN', module: 'NODE', message: 'Edge-Gamma-09 CPU usage peaking at 92%.', user: 'SYSTEM' },
  { id: '4', timestamp: '2026-05-08 07:10:20', level: 'ERROR', module: 'EXEC', message: 'Installation failed on node DC-04 due to disk space shortage.', user: 'SYSTEM' },
  { id: '5', timestamp: '2026-05-08 07:05:00', level: 'SECURITY', module: 'AUTH', message: 'Officer K accessed the critical terminal.', user: 'Officer K' },
];

export const DASHBOARD_CHART_DATA = [
  { name: '00:00', load: 45, traffic: 24, threats: 2 },
  { name: '04:00', load: 38, traffic: 18, threats: 0 },
  { name: '08:00', load: 65, traffic: 42, threats: 1 },
  { name: '12:00', load: 85, traffic: 72, threats: 5 },
  { name: '16:00', load: 72, traffic: 58, threats: 3 },
  { name: '20:00', load: 92, traffic: 89, threats: 8 },
  { name: '23:59', load: 78, traffic: 65, threats: 1 },
];
