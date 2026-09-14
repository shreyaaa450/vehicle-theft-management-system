// src/App.jsx
import Homepage from "./pages/homepage.jsx";
import Navbar from "./components/navbar.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import "./css/navbar.css";
import "./css/auth.css";

export default function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const { t } = useTranslation();

	return (
		<>
			<Navbar onLogin={() => { setShowSignup(false); setIsLoginOpen(true); }} />
			{showSignup ? (
				<Signup onBackHome={() => setShowSignup(false)} onLogin={() => { setShowSignup(false); setIsLoginOpen(true); }} />
			) : (
				<>
					<Homepage />
					<footer className="site-footer">
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
					</footer>
				</>
			)}
			{isLoginOpen && (
				<Login
					onClose={() => setIsLoginOpen(false)}
					onSignup={() => { setIsLoginOpen(false); setShowSignup(true); }}
				/>
			)}
		</>
	);
}


