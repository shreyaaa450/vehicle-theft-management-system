// src/App.jsx
import { useState } from "react";
import "./App.css";

const officials = [
  ["DF", "Shri. Devendra Fadnavis", "Hon'ble Chief Minister"],
  ["ES", "Shri. Eknath Shinde", "Hon'ble Deputy Chief Minister"],
  ["SP", "Smt. Sunetra Ajit Pawar", "Hon'ble Deputy Chief Minister"],
  ["AS", "Adv. Ashish Shelar", "Hon. Minister of IT"],
];

const navItems = [
  "⌂ Home",
  "☎ Contact Us",
  "◉ Dashboard",
  "Login",
  "About us",
  "⚑ RTS Dashboard Login",
];

function App() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="site-wrapper">
      <div className="topbar">
        <div className="container d-flex justify-content-between align-items-center">
          <span>Maharashtra Police</span>

          <div className="accessibility">
            <button>A+</button>
            <button>A-</button>
            <button>A=</button>
            <button className="dark">A</button>
            <button>A</button>
            <button className="marathi">मराठी</button>
          </div>
        </div>
      </div>

      <header className="container brand-section">
        <div className="logos">
          <img
            className="logoimg"
            src="https://www.mahapolice.gov.in/images/mahaPolicelLogo2.jpg"
            alt="Maharashtra Police logo"
          />

          <div className="title-area">
            <h1>सदरक्षणाय खलनिग्रणाय</h1>
          </div>
        </div>

        <div className="official-list">
          {officials.map(([initials, name, role]) => (
            <div className="official" key={initials}>
              <div className="photo">{initials}</div>
              <strong>{name}</strong>
              <small>{role}</small>
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
            aria-label="Toggle navigation"
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
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;