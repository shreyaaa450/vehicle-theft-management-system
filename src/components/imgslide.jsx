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
}

export default App;