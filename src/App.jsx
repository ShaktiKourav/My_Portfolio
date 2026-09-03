import ProfessionalPortfolio from "./components/ProfessionalPortfolio";
import AdminDashboard from "./components/AdminDashboard";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  if (window.location.pathname.startsWith("/admin")) return <AdminDashboard />;
  if (window.location.pathname.startsWith("/profile")) return <ProfilePage />;
  return <ProfessionalPortfolio />;
}
