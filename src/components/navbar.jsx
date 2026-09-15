import { useState } from "react";
import { useTranslation } from "react-i18next";

const officials = [
  ["DF", "Shri. Sadanand Date", "officials.dgp", "https://etimg.etb2bimg.com/thumb/msid-96225762,imgsize-22298,width-1200,height=765,overlay-etgovernment/news/governance/maharashtra-names-top-ips-officer-sadanand-date-as-anti-terrorism-squad-chief.jpg"],
  ["ES", "Shri. Vishwas Nangare Patil", "officials.adgp", "https://tse4.mm.bing.net/th/id/OIP.6VpPwDEvdv7ykwYUDkfxQgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"],
  ["SP", "Shri. Dattatray Shinde", "officials.igp", "https://pbs.twimg.com/media/GN_yO1MbkAAS2lQ.jpg"],
  ["AS", "Sanjeev K. Singhal", "officials.dig", "https://tse2.mm.bing.net/th/id/OIP.S1CI5_WYTxQSFy1nEUkhUwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"],
];

const navItems = [
  "nav.home",
  "nav.contact",
  "nav.dashboard",
  "nav.about",
  "nav.rts",
  "nav.login"
];
 
function App({ onHome, onContact, onLogin }) {
  const [activeNav, setActiveNav] = useState(0);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "mr" ? "en" : "mr";
    i18n.changeLanguage(nextLanguage);
    window.localStorage.setItem("preferredLanguage", nextLanguage);
  };





  return (
    <>
      <div className="topbar">
        <div className="container d-flex justify-content-between align-items-center">
          <span>{t("site.name")}</span>

          <div className="accessibility">
            <button>A+</button>
            <button>A-</button>
            <button>A=</button>
             <button className="marathi" type="button" onClick={toggleLanguage} aria-label={t(i18n.language === "mr" ? "language.switchToEnglish" : "language.switchToMarathi")}>
              {t(i18n.language === "mr" ? "language.english" : "language.marathi")}
            </button>
          </div>
        </div>
      </div>

      <header className="container brand-section">
        <div className="logos">
          <img
            className="logoimg"
            src="https://tse2.mm.bing.net/th/id/OIP.HO0JLr8WLkxvt08WJDO_AwHaFj?r=0&pid=ImgDet&w=187&h=140&c=7&dpr=1.3&o=7&rm=3"
            alt={t("site.altLogo")}
          />

          <div className="title-area">
            <h1>{t("site.motto")}</h1>
          </div>
        </div>

        <div className="official-list">
          {officials.map(([initials, name, role, image]) => (
            <div className="official" key={initials}>
              <div className="photo">
                <img
                  src={image}
                  alt={`${name} portrait`}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <strong>{name}</strong>
              <small>{t(role)}</small>
            </div>
          ))}
        </div>
      </header>

      <nav className="navbar navbar-expand-xl p-0 main-nav">
        <div className="container px-0">
          <button
            className="navbar-toggler m-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainMenu"
            aria-controls="mainMenu"
            aria-expanded="false"
            aria-label={t("nav.menu")}
          >
            ☰
          </button>

          <div className="collapse navbar-collapse" id="mainMenu">
            <ul className="navbar-nav">
              {navItems.map((item, index) => (
                <li className="nav-item" key={item}>
                  <a
                    className={`nav-link ${activeNav === index ? "active" : ""}`}
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveNav(index);
            if (item === "nav.home") {
            onHome();
            } else if (item === "nav.contact") {
            onContact();
            } else if (item === "nav.login") {
                        onLogin();
                      }
                    }}
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
}


export default App;
