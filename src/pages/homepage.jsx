import { useEffect, useState } from "react";
import theftPreventionSlide from "../assets/home-slides/theft-prevention.svg";
import reportTheftSlide from "../assets/home-slides/report-theft.svg";
import recoverySupportSlide from "../assets/home-slides/recovery-support.svg";

const slides = [
	{ image: theftPreventionSlide, title: "Prevent Vehicle Theft", description: "Simple steps can help keep your vehicle secure." },
	{ image: reportTheftSlide, title: "Report Vehicle Theft", description: "Share accurate details quickly with Maharashtra Police." },
	{ image: recoverySupportSlide, title: "Recovery Support", description: "Track updates and get support throughout the recovery process." },
];

export default function Homepage() {
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="home-carousel" aria-label="Vehicle theft services">
			<div className="home-carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
				{slides.map((slide) => (
					<article className="home-slide" key={slide.title}>
						<img src={slide.image} alt={slide.title} />
						<div className="home-slide-overlay">
							<h2>{slide.title}</h2>
							<p>{slide.description}</p>
						</div>
					</article>
				))}
			</div>

			<div className="home-carousel-dots" aria-label="Choose homepage slide">
				{slides.map((slide, index) => (
					<button
						key={slide.title}
						className={activeSlide === index ? "active" : ""}
						type="button"
						aria-label={`Show ${slide.title}`}
						aria-pressed={activeSlide === index}
						onClick={() => setActiveSlide(index)}
					/>
				))}
			</div>
		</main>
	);
}

