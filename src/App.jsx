import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PasswordChanged from "./components/PasswordChanged";
import DashboardPage from "./pages/DashboardPage";
import UserPage from "./pages/UserPage";
import UserRecordPage from "./pages/UserRecordPage";
import RecordPage from "./pages/RecordPage";
import SettingPage from "./pages/SettingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/PasswordChanged" element={<PasswordChanged />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/userRecords/:userId" element={<UserRecordPage />} />
        <Route path="/records" element={<RecordPage />} />
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
