import { useState } from "react";
import "../css/contact.css";

export default function Contact() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
		event.currentTarget.reset();
	};

	return (
		<main className="contact-page">
			<section className="contact-section contact-organization" aria-labelledby="contact-organization-title">
				<p className="contact-kicker">Department / Organization</p>
				<h1 id="contact-organization-title">Vehicle Theft Management System</h1>
				<p>Police Department / District Police</p>
			</section>

			<div className="contact-grid">
				<section className="contact-section contact-information" aria-labelledby="contact-information-title">
					<p className="contact-kicker">Contact Information</p>
					<h2 id="contact-information-title">Reach the department</h2>
					<div className="contact-details">
						<p><span aria-hidden="true">📍</span><strong>Address</strong><span>Police Department Headquarters, District Police Office</span></p>
						<p><span aria-hidden="true">☎️</span><strong>Phone Number</strong><a href="tel:+912212345678">+91 22 1234 5678</a></p>
						<p><span aria-hidden="true">✉️</span><strong>Official Email</strong><a href="mailto:contact@vtms.gov.in">contact@vtms.gov.in</a></p>
					</div>
				</section>

				<section className="contact-section contact-form-section" aria-labelledby="contact-form-title">
					<p className="contact-kicker">Contact Form</p>
					<h2 id="contact-form-title">Send us a message</h2>
					<form className="contact-form" onSubmit={handleSubmit}>
						<label htmlFor="contact-name">Name</label>
						<input id="contact-name" name="name" type="text" autoComplete="name" required />
						<label htmlFor="contact-email">Email</label>
						<input id="contact-email" name="email" type="email" autoComplete="email" required />
						<label htmlFor="contact-subject">Subject</label>
						<input id="contact-subject" name="subject" type="text" required />
						<label htmlFor="contact-message">Message</label>
						<textarea id="contact-message" name="message" rows="5" required />
						<button type="submit">Submit</button>
						{submitted && <p className="contact-success" role="status">Your message has been received.</p>}
					</form>
				</section>

				<section className="contact-section contact-hours" aria-labelledby="contact-hours-title">
					<p className="contact-kicker">Office Hours</p>
					<h2 id="contact-hours-title">When to reach us</h2>
					<div className="hours-row"><strong>Monday–Friday</strong><span>10:00 AM – 5:00 PM</span></div>
				</section>
			</div>
		</main>
	);
}