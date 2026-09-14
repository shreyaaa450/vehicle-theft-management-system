import { useTranslation } from "react-i18next";

export default function Signup({ onBackHome, onLogin }) {
	const { t } = useTranslation();

	return (
		<main className="auth-page">
			<section className="signup-panel" aria-labelledby="signup-title">
				<div className="signup-intro">
					<button className="auth-back" type="button" onClick={onBackHome}>← {t("auth.backHome")}</button>
					<p className="auth-kicker">{t("auth.portal")}</p>
					<h1 id="signup-title">{t("auth.signupTitle")}</h1>
					<p>{t("auth.signupDescription")}</p>
					<div className="signup-note"><strong>{t("auth.accountBenefitTitle")}</strong><span>{t("auth.accountBenefit")}</span></div>
				</div>
				<form className="auth-form signup-form" onSubmit={(event) => event.preventDefault()}>
					<div className="auth-field"><label htmlFor="signup-name">{t("auth.fullName")}</label><input id="signup-name" type="text" placeholder={t("auth.fullNamePlaceholder")} required /></div>
					<div className="auth-field"><label htmlFor="signup-email">{t("auth.email")}</label><input id="signup-email" type="email" placeholder={t("auth.emailPlaceholder")} required /></div>
					<div className="auth-field"><label htmlFor="signup-phone">{t("auth.phone")}</label><input id="signup-phone" type="tel" placeholder={t("auth.phonePlaceholder")} required /></div>
					<div className="auth-field"><label htmlFor="signup-password">{t("auth.password")}</label><input id="signup-password" type="password" placeholder={t("auth.passwordPlaceholder")} required /></div>
					<label className="auth-checkbox"><input type="checkbox" required /> <span>{t("auth.agreeTerms")}</span></label>
					<button className="auth-submit" type="submit">{t("auth.signupButton")}</button>
					<p className="auth-switch">{t("auth.haveAccount")} <button type="button" onClick={onLogin}>{t("auth.loginButton")}</button></p>
				</form>
			</section>
		</main>
	);
}