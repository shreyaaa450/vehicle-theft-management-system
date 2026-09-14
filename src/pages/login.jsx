import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login({ onClose, onSignup }) {
	const { t } = useTranslation();
	const [role, setRole] = useState("user");

	return (
		<div className="auth-modal-backdrop" role="presentation" onMouseDown={(event) => {
			if (event.target === event.currentTarget) onClose();
		}}>
			<section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
				<button className="auth-close" type="button" onClick={onClose} aria-label={t("auth.close")}>×</button>
				<div className="auth-heading">
					<p className="auth-kicker">{t("auth.portal")}</p>
					<h1 id="login-title">{t("auth.loginTitle")}</h1>
					<p>{t("auth.loginDescription")}</p>
				</div>

				<div className="role-switcher" aria-label={t("auth.loginAs")}>
					<button type="button" className={role === "user" ? "selected" : ""} onClick={() => setRole("user")} aria-pressed={role === "user"}>{t("auth.user")}</button>
					<button type="button" className={role === "admin" ? "selected" : ""} onClick={() => setRole("admin")} aria-pressed={role === "admin"}>{t("auth.admin")}</button>
				</div>

				<form className="auth-form" onSubmit={(event) => event.preventDefault()}>
					<div className="auth-field"><label htmlFor="login-identity">{role === "user" ? t("auth.email") : t("auth.badgeNumber")}</label><input id="login-identity" type={role === "user" ? "email" : "text"} placeholder={role === "user" ? t("auth.emailPlaceholder") : t("auth.badgePlaceholder")} required /></div>
					<div className="auth-field"><label htmlFor="login-password">{t("auth.password")}</label><input id="login-password" type="password" placeholder={t("auth.passwordPlaceholder")} required /></div>
					<div className="auth-form-row"><label className="auth-checkbox"><input type="checkbox" /> <span>{t("auth.rememberMe")}</span></label><a href="#forgot-password">{t("auth.forgotPassword")}</a></div>
					<button className="auth-submit" type="submit">{t("auth.loginButton")}</button>
				</form>

				<p className="auth-switch">{t("auth.noAccount")} <button type="button" onClick={onSignup}>{t("auth.createAccount")}</button></p>
			</section>
		</div>
	);
}