import DashboardPortal from "../../components/DashboardPortal.jsx";

export default function UserDashboard({ onExit }) {
	return <DashboardPortal role="user" onExit={onExit} />;
}
