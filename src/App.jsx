import ProfessionalPortfolio from "./components/ProfessionalPortfolio";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  return window.location.pathname.startsWith("/admin") ? <AdminDashboard /> : <ProfessionalPortfolio />;
}
