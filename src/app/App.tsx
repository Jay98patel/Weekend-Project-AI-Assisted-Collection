import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../features/dashboard/DashboardPage'
import GroupGiftsPage from '../features/group-gifts/GroupGiftsPage'
import WizardPage from '../features/ai-wizard/WizardPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/collections/group-gifts" element={<GroupGiftsPage />} />
      <Route path="/collections/group-gifts/ai" element={<WizardPage />} />
    </Routes>
  )
}

export default App
