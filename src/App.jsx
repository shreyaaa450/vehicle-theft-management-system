// src/App.jsx
import Homepage from "./pages/homepage.jsx";
import Contact from "./pages/contact.jsx";
import Navbar from "./components/navbar.jsx";
import { useTranslation } from "react-i18next";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import UserDashboard from "./pages/dashboards/userDashboard.jsx";
import InvestigatorDashboard from "./pages/dashboards/investigatorDashboard.jsx";
import PoliceDashboard from "./pages/dashboards/policeDashboard.jsx";
import AdminDashboard from "./pages/dashboards/adminDashboard.jsx";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import "./css/auth.css";

export default function App() {
	return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

function AppRoutes() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const isLoginOpen = location.pathname === "/login";

	const openDashboard = (role = "user") => {
		navigate(`/dashboard/${role}/overview`);
	};

	return (
		<div className="site-wrapper">
			<Navbar
				onHome={() => navigate("/")}
				onContact={() => navigate("/contact")}
				onLogin={() => navigate("/login")}
				onDashboard={() => openDashboard("user")}
			/>
			<Routes>
				<Route path="/" element={<><Homepage /><SiteFooter t={t} /></>} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/login" element={<><Homepage /><SiteFooter t={t} /></>} />
				<Route path="/signup" element={<Signup onBackHome={() => navigate("/")} onLogin={() => navigate("/login")} />} />
				<Route path="/dashboard/user" element={<UserDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/user/:section" element={<UserDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/investigator" element={<InvestigatorDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/investigator/:section" element={<InvestigatorDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/police" element={<PoliceDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/police/:section" element={<PoliceDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/admin" element={<AdminDashboard onExit={() => navigate("/")} />} />
				<Route path="/dashboard/admin/:section" element={<AdminDashboard onExit={() => navigate("/")} />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
			{isLoginOpen && (
				<Login
					onClose={() => navigate("/")}
					onSignup={() => navigate("/signup")}
					onLogin={(role) => openDashboard(role)}
				/>
			)}
		</div>
	);
}

function SiteFooter({ t }) {
	return <footer className="site-footer">
				<div className="footer-main container">
					<div className="footer-brand">
						<p className="footer-kicker">{t("site.government")}</p>
						<h2>{t("site.name")}</h2>
						<p className="footer-motto">{t("site.motto")}</p>
						<p>{t("footer.description")}</p>
						<span className="footer-badge">{t("footer.badge")}</span>
					</div>

					<div className="footer-column">
						<h3>{t("footer.citizen")}</h3>
						<a href="#department-features-title">{t("footer.services")}</a>
						<a href="#photo-gallery-title">{t("footer.gallery")}</a>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.report")}</a>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.track")}</a>
					</div>

					<div className="footer-column">
						<h3>{t("footer.information")}</h3>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.about")}</a>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.ranks")}</a>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.recruitment")}</a>
						<a href="https://www.mahapolice.gov.in/" target="_blank" rel="noreferrer">{t("footer.official")}</a>
					</div>

					<div className="footer-column footer-contact">
						<h3>{t("footer.contact")}</h3>
						<strong>112</strong>
						<span>{t("footer.emergency")}</span>
						<span>{t("footer.headquarters").split("\n").map((line) => <span key={line}>{line}<br /></span>)}</span>
						<a href="https://www.mahapolice.gov.in/contact-us/" target="_blank" rel="noreferrer">{t("footer.contactPolice")}</a>
					</div>
				</div>

				<div className="footer-bottom">
					<div className="container footer-bottom-inner">
						<span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
						<div className="footer-utility-links">
							<a href="#top">{t("footer.accessibility")}</a>
							<a href="#top">{t("footer.privacy")}</a>
							<a href="#top">{t("footer.sitemap")}</a>
						</div>
					</div>
				</div>
	</footer>;
}
