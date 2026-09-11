import { useEffect, useState } from "react";
import theftPreventionSlide from "../assets/home-slides/theft-prevention.svg";
import reportTheftSlide from "../assets/home-slides/report-theft.svg";
import recoverySupportSlide from "../assets/home-slides/recovery-support.svg";

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

const homeSlides = [
  {
    image: theftPreventionSlide,
    alt: "A secured car parked safely near a city street",
    title: "Protect your vehicle",
    description: "Simple precautions help prevent vehicle theft.",
  },
  {
    image: reportTheftSlide,
    alt: "A police officer assisting a vehicle owner with a report",
    title: "Report theft quickly",
    description: "File a report promptly so the search can begin.",
  },
  {
    image: recoverySupportSlide,
    alt: "A recovered vehicle being returned to its owner",
    title: "Support through recovery",
    description: "Track your case and stay connected with the investigation.",
  },
];

function App() {
  const [activeNav, setActiveNav] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % homeSlides.length);
    }, 3000);

    return () => window.clearInterval(slideTimer);
  }, []);

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

      <section className="home-carousel" aria-label="Vehicle safety highlights">
        <div
          className="home-carousel-track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {homeSlides.map((slide) => (
            <article className="home-slide" key={slide.title}>
              <img src={slide.image} alt={slide.alt} />
              <div className="home-slide-overlay">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="home-carousel-dots" aria-label="Choose a slide">
          {homeSlides.map((slide, index) => (
            <button
              key={slide.title}
              className={index === activeSlide ? "active" : ""}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
