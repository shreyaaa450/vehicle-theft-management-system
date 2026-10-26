import DashboardPortal from "../../components/DashboardPortal.jsx";

export default function AdminDashboard({ onExit }) {
	return <DashboardPortal role="admin" onExit={onExit} />;
}
