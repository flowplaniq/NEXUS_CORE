import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DeploymentQueuePage } from './pages/DeploymentQueuePage';
import { RequestDetailPage } from './pages/RequestDetailPage';
import { NodeManagementPage } from './pages/NodeManagementPage';
import { PackageLibraryPage } from './pages/PackageLibraryPage';
import { UsersPage } from './pages/UsersPage';
import { FormsPage } from './pages/FormsPage';
import { ReportsPage } from './pages/ReportsPage';
import { motion, AnimatePresence } from 'motion/react';

const Placeholder = ({ name }: { name: string }) => (
  <div className="h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
    <div className="text-center">
      <h2 className="text-xl font-display text-slate-800 tracking-[0.3em] font-bold uppercase">{name}</h2>
      <p className="text-[10px] text-slate-900 font-mono mt-4 uppercase tracking-widest bg-white/5 px-4 py-1 rounded">Module implementation pending authorization</p>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/deployments" element={<DeploymentQueuePage />} />
            <Route path="/deployments/:id" element={<RequestDetailPage />} />
            <Route path="/nodes" element={<NodeManagementPage />} />
            <Route path="/packages" element={<PackageLibraryPage />} />
            
            <Route path="/users" element={<UsersPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            <Route path="/approvals" element={<Placeholder name="APPROVAL CENTER" />} />
            <Route path="/builder" element={<Placeholder name="WORKFLOW BUILDER" />} />
            <Route path="/logs" element={<Placeholder name="AUDIT LOGS" />} />
            <Route path="/access" element={<Placeholder name="ACCESS CONTROL" />} />
            <Route path="/settings" element={<Placeholder name="SYSTEM SETTINGS" />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

