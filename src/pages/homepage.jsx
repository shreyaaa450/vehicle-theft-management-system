import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import theftPreventionSlide from "../assets/home-slides/theft-prevention.svg";
import reportTheftSlide from "../assets/home-slides/report-theft.svg";
import recoverySupportSlide from "../assets/home-slides/recovery-support.svg";
import "../css/photo-gallery.css";

const slides = [
	{ image: theftPreventionSlide, title: "slides.preventTitle", description: "slides.preventDescription" },
	{ image: reportTheftSlide, title: "slides.reportTitle", description: "slides.reportDescription" },
	{ image: recoverySupportSlide, title: "slides.recoveryTitle", description: "slides.recoveryDescription" },
];

const departmentFeatures = [
	{ icon: "01", title: "features.emergency", description: "features.emergencyDescription", accent: "saffron" },
	{ icon: "02", title: "features.crime", description: "features.crimeDescription", accent: "teal" },
	{ icon: "03", title: "features.cyber", description: "features.cyberDescription", accent: "blue" },
	{ icon: "04", title: "features.traffic", description: "features.trafficDescription", accent: "green" },
	{ icon: "05", title: "features.women", description: "features.womenDescription", accent: "coral" },
	{ icon: "06", title: "features.citizen", description: "features.citizenDescription", accent: "gold" },
];

const galleryPhotos = [
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maharashtra_State_Police_Head_Quarters%2C_Fort%2C_Mumbai.jpg",
		alt: "Maharashtra State Police Headquarters in Fort, Mumbai",
		caption: "Maharashtra State Police Headquarters, Fort, Mumbai",
		credit: "Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:Maharashtra_State_Police_Head_Quarters,_Fort,_Mumbai.jpg",
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Maharashtra_Police_Headquarters.jpg",
		alt: "Maharashtra Police Headquarters building in Mumbai",
		caption: "A landmark of public service in Mumbai",
		credit: "Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:Maharashtra_Police_Headquarters.jpg",
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/4/46/Maharashtra_Police_Flag.jpg",
		alt: "Maharashtra Police flag",
		caption: "The Maharashtra Police flag represents duty and service",
		credit: "Maharashtra Police / Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:Maharashtra_Police_Flag.jpg",
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Mumbai_Police_Mahindra_Bolero_Patrol_Car.jpg",
		alt: "Mumbai Police Mahindra Bolero patrol car",
		caption: "Patrol teams helping keep Mumbai moving safely",
		credit: "Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:Mumbai_Police_Mahindra_Bolero_Patrol_Car.jpg",
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Mumbai_police_march_band.jpg",
		alt: "Mumbai Police march band",
		caption: "Tradition, discipline and community spirit",
		credit: "Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:Mumbai_police_march_band.jpg",
	},
	{
		image: "https://upload.wikimedia.org/wikipedia/commons/8/89/MAHARASHTRA_POLICE_INTERNATIONAL_MARATHON_2020.JPG",
		alt: "Maharashtra Police International Marathon participants",
		caption: "Maharashtra Police connecting with citizens through sport",
		credit: "Wikimedia Commons",
		link: "https://commons.wikimedia.org/wiki/File:MAHARASHTRA_POLICE_INTERNATIONAL_MARATHON_2020.JPG",
	},
];

export default function Homepage() {
	const [activeSlide, setActiveSlide] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="homepage">
			<section className="home-carousel" aria-label={t("slides.choose")}>
				<div className="home-carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
					{slides.map((slide) => (
						<article className="home-slide" key={slide.title}>
							<img src={slide.image} alt={slide.title} />
							<div className="home-slide-overlay">
								<h2>{t(slide.title)}</h2>
								<p>{t(slide.description)}</p>
							</div>
						</article>
					))}
				</div>

				<div className="home-carousel-dots" aria-label={t("slides.choose")}>
					{slides.map((slide, index) => (
						<button
							key={slide.title}
							className={activeSlide === index ? "active" : ""}
							type="button"
							aria-label={t("slides.show", { title: t(slide.title) })}
							aria-pressed={activeSlide === index}
							onClick={() => setActiveSlide(index)}
						/>
					))}
				</div>
			</section>

			<section className="department-features" aria-labelledby="department-features-title">
				<div className="features-heading">
					<p className="section-kicker">{t("features.kicker")}</p>
					<h1 id="department-features-title">{t("features.title")}</h1>
					<p>{t("features.description")}</p>
				</div>
				<div className="feature-grid">
					{departmentFeatures.map((feature) => (
						<article className={`feature-card feature-card-${feature.accent}`} key={feature.title}>
							<div className="feature-icon" aria-hidden="true">{feature.icon}</div>
							<div>
								<h2>{t(feature.title)}</h2>
								<p>{t(feature.description)}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="photo-gallery" aria-labelledby="photo-gallery-title">
				<div className="gallery-heading">
					<div>
						<p className="gallery-kicker">{t("gallery.kicker")}</p>
						<h2 id="photo-gallery-title">{t("gallery.title")}</h2>
					</div>
					<p>{t("gallery.description")}</p>
				</div>
				<div className="gallery-showcase card shadow-sm rounded-3" tabIndex="0" aria-label={t("gallery.galleryLabel")}>
					<div className="gallery-track">
						{galleryPhotos.map((photo) => (
						<figure className="gallery-slide" key={photo.image}>
							<a href={photo.link} target="_blank" rel="noreferrer" aria-label={t("gallery.viewSource", { caption: photo.caption })}>
								<img className="img-fluid" src={photo.image} alt={photo.alt} loading="lazy" />
							</a>
							<figcaption className="card-body">
								<strong>{photo.caption}</strong>
								<span className="badge rounded-pill align-self-start">{photo.credit}</span>
							</figcaption>
						</figure>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}

