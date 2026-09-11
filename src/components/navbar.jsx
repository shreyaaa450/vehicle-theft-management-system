import { useState } from "react";

const officials = [
  ["DF", "Shri. Sadanand Date", "Director General of Police (DGP), Maharashtra", "https://etimg.etb2bimg.com/thumb/msid-96225762,imgsize-22298,width-1200,height=765,overlay-etgovernment/news/governance/maharashtra-names-top-ips-officer-sadanand-date-as-anti-terrorism-squad-chief.jpg"],
  ["ES", "Shri. Vishwas Nangare Patil", "Additional Director General of Police (ADGP), Maharashtra", "https://tse4.mm.bing.net/th/id/OIP.6VpPwDEvdv7ykwYUDkfxQgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"],
  ["SP", "Shri. Dattatray Shinde", "Inspector General of Police (IGP), Maharashtra", "https://pbs.twimg.com/media/GN_yO1MbkAAS2lQ.jpg"],
  ["AS", "Sanjeev K. Singhal", "Deputy Inspector General of Police (DIG), Maharashtra", "https://tse2.mm.bing.net/th/id/OIP.S1CI5_WYTxQSFy1nEUkhUwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"],
];

const navItems = [
  "Home",
  "Contact Us",
  "Dashboard",
  "About us",
  "RTS Dashboard",
  "Login"
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
            <h1>सद्रक्षणाय खलनिग्रणाय!</h1>
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
