import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			language: { english: "English", marathi: "मराठी", switchToMarathi: "Switch to Marathi", switchToEnglish: "Switch to English" },
			nav: { home: "Home", contact: "Contact Us", dashboard: "Dashboard", about: "About us", rts: "RTS Dashboard", login: "Login", menu: "Toggle navigation" },
			site: { name: "Maharashtra Police", motto: "सद्रक्षणाय खलनिग्रणाय!", government: "Government of Maharashtra", altLogo: "Maharashtra Police logo" },
			officials: { dgp: "Director General of Police (DGP), Maharashtra", adgp: "Additional Director General of Police (ADGP), Maharashtra", igp: "Inspector General of Police (IGP), Maharashtra", dig: "Deputy Inspector General of Police (DIG), Maharashtra" },
			slides: {
				preventTitle: "Prevent Vehicle Theft", preventDescription: "Simple steps can help keep your vehicle secure.",
				reportTitle: "Report Vehicle Theft", reportDescription: "Share accurate details quickly with Maharashtra Police.",
				recoveryTitle: "Recovery Support", recoveryDescription: "Track updates and get support throughout the recovery process.",
				choose: "Choose homepage slide", show: "Show {{title}}",
			},
			features: {
				kicker: "Maharashtra Police Department", title: "Serving with trust, courage and care", description: "Explore the services and responsibilities that help build safer communities across the state.",
				emergency: "Emergency Response", emergencyDescription: "Quick assistance and coordinated action when every second matters.", crime: "Crime Prevention", crimeDescription: "Community-focused policing that helps keep neighbourhoods safer.", cyber: "Cyber Safety", cyberDescription: "Guidance and support for reporting online fraud and cyber crime.", traffic: "Traffic Management", trafficDescription: "Safer roads through responsible driving and effective enforcement.", women: "Women & Child Safety", womenDescription: "Dedicated support to protect vulnerable citizens across Maharashtra.", citizen: "Citizen Services", citizenDescription: "Accessible digital services that make police support easier to reach.",
			},
			gallery: { kicker: "Inside Maharashtra Police", title: "Service in every frame", description: "Real photographs from Maharashtra Police and Mumbai Police activities, places and people.", source: "Open photo source", galleryLabel: "Maharashtra Police photo gallery", viewSource: "View source for {{caption}}" },
			auth: { portal: "Vehicle Theft Management System", loginTitle: "Welcome back", loginDescription: "Sign in to access secure vehicle theft services.", loginAs: "Choose a login role", user: "Citizen user", admin: "Admin / Police", email: "Email address", badgeNumber: "Badge number", emailPlaceholder: "you@example.com", badgePlaceholder: "Enter your official badge number", password: "Password", passwordPlaceholder: "Enter your password", rememberMe: "Remember me", forgotPassword: "Forgot password?", loginButton: "Log in", noAccount: "New to the portal?", createAccount: "Create an account", close: "Close login window", backHome: "Back to home", signupTitle: "Create your account", signupDescription: "Register for a secure account to report theft and follow case updates online.", accountBenefitTitle: "One account, clearer updates", accountBenefit: "Keep your reports, notifications and recovery updates together.", fullName: "Full name", fullNamePlaceholder: "Enter your full name", phone: "Mobile number", phonePlaceholder: "Enter your mobile number", agreeTerms: "I agree to the terms and privacy policy", signupButton: "Create account", haveAccount: "Already have an account?" },
			footer: { badge: "Official Citizen Services Portal", description: "Committed to protecting citizens and serving communities across the state.", citizen: "Citizen Services", information: "Information", contact: "Contact & Emergency", services: "Police Services", gallery: "Photo Gallery", report: "Report an Incident", track: "Track a Complaint", about: "About Maharashtra Police", ranks: "Police Ranks", recruitment: "Recruitment", official: "Official Website", emergency: "National emergency helpline", headquarters: "Maharashtra Police Headquarters\nMumbai, Maharashtra", contactPolice: "Contact Maharashtra Police", accessibility: "Accessibility", privacy: "Privacy Policy", sitemap: "Site Map", rights: "© {{year}} Maharashtra Police. All rights reserved." },
		},
	},
	mr: {
		translation: {
			language: { english: "English", marathi: "मराठी", switchToMarathi: "मराठीमध्ये बदला", switchToEnglish: "इंग्रजीमध्ये बदला" },
			nav: { home: "मुख्यपृष्ठ", contact: "संपर्क साधा", dashboard: "डॅशबोर्ड", about: "आमच्याबद्दल", rts: "आरटीएस डॅशबोर्ड", login: "लॉगिन", menu: "नेव्हिगेशन उघडा" },
			site: { name: "महाराष्ट्र पोलीस", motto: "सद्रक्षणाय खलनिग्रणाय!", government: "महाराष्ट्र शासन", altLogo: "महाराष्ट्र पोलीस चिन्ह" },
			officials: { dgp: "पोलीस महासंचालक (DGP), महाराष्ट्र", adgp: "अपर पोलीस महासंचालक (ADGP), महाराष्ट्र", igp: "पोलीस महानिरीक्षक (IGP), महाराष्ट्र", dig: "पोलीस उपमहानिरीक्षक (DIG), महाराष्ट्र" },
			slides: { preventTitle: "वाहन चोरीपासून बचाव", preventDescription: "सोप्या उपायांनी आपले वाहन सुरक्षित ठेवता येते.", reportTitle: "वाहन चोरीची तक्रार", reportDescription: "महाराष्ट्र पोलिसांना अचूक माहिती त्वरित द्या.", recoveryTitle: "वाहन शोधासाठी मदत", recoveryDescription: "तुमच्या प्रकरणातील घडामोडींचा मागोवा घ्या.", choose: "मुख्यपृष्ठ स्लाइड निवडा", show: "{{title}} दाखवा" },
			features: { kicker: "महाराष्ट्र पोलीस विभाग", title: "विश्वास, धैर्य आणि सेवेसह कार्यरत", description: "राज्यातील सुरक्षित समुदाय घडविणाऱ्या सेवा आणि जबाबदाऱ्या जाणून घ्या.", emergency: "आपत्कालीन प्रतिसाद", emergencyDescription: "महत्त्वाच्या क्षणी जलद मदत आणि समन्वयित कार्यवाही.", crime: "गुन्हे प्रतिबंध", crimeDescription: "परिसर अधिक सुरक्षित ठेवण्यासाठी समुदाय-केंद्रित पोलीस सेवा.", cyber: "सायबर सुरक्षा", cyberDescription: "ऑनलाइन फसवणूक आणि सायबर गुन्ह्यांच्या तक्रारींसाठी मार्गदर्शन.", traffic: "वाहतूक व्यवस्थापन", trafficDescription: "जबाबदार वाहनचालक आणि प्रभावी अंमलबजावणीद्वारे सुरक्षित रस्ते.", women: "महिला व बाल सुरक्षा", womenDescription: "महाराष्ट्रातील असुरक्षित नागरिकांच्या संरक्षणासाठी विशेष मदत.", citizen: "नागरिक सेवा", citizenDescription: "पोलीस मदत सहज उपलब्ध करून देणाऱ्या डिजिटल सेवा." },
			gallery: { kicker: "महाराष्ट्र पोलिसांच्या कार्याची झलक", title: "सेवेचे प्रत्येक क्षणचित्र", description: "महाराष्ट्र पोलीस आणि मुंबई पोलीस यांच्या उपक्रमांची, ठिकाणांची आणि सेवांची छायाचित्रे.", source: "छायाचित्राचा स्रोत उघडा", galleryLabel: "महाराष्ट्र पोलीस छायाचित्र दालन", viewSource: "{{caption}} चा स्रोत पहा" },
			auth: { portal: "वाहन चोरी व्यवस्थापन प्रणाली", loginTitle: "पुन्हा स्वागत आहे", loginDescription: "सुरक्षित वाहन चोरी सेवांसाठी साइन इन करा.", loginAs: "लॉगिनची भूमिका निवडा", user: "नागरिक वापरकर्ता", admin: "प्रशासक / पोलीस", email: "ईमेल पत्ता", badgeNumber: "बॅज क्रमांक", emailPlaceholder: "तुमचा ईमेल पत्ता", badgePlaceholder: "अधिकृत बॅज क्रमांक टाका", password: "पासवर्ड", passwordPlaceholder: "तुमचा पासवर्ड टाका", rememberMe: "मला लक्षात ठेवा", forgotPassword: "पासवर्ड विसरलात?", loginButton: "लॉग इन", noAccount: "पोर्टलवर नवीन आहात?", createAccount: "खाते तयार करा", close: "लॉगिन विंडो बंद करा", backHome: "मुख्यपृष्ठावर जा", signupTitle: "तुमचे खाते तयार करा", signupDescription: "चोरीची तक्रार नोंदवण्यासाठी आणि प्रकरणातील अपडेट्स पाहण्यासाठी सुरक्षित खाते तयार करा.", accountBenefitTitle: "एका खात्यात सर्व अपडेट्स", accountBenefit: "तुमच्या तक्रारी, सूचना आणि वाहन शोध अपडेट्स एकाच ठिकाणी ठेवा.", fullName: "पूर्ण नाव", fullNamePlaceholder: "तुमचे पूर्ण नाव टाका", phone: "मोबाईल क्रमांक", phonePlaceholder: "तुमचा मोबाईल क्रमांक टाका", agreeTerms: "मी अटी आणि गोपनीयता धोरण मान्य करतो/करते", signupButton: "खाते तयार करा", haveAccount: "आधीच खाते आहे?" },
			footer: { badge: "अधिकृत नागरिक सेवा पोर्टल", description: "राज्यातील नागरिकांचे संरक्षण आणि समुदायांची सेवा करण्यासाठी कटिबद्ध.", citizen: "नागरिक सेवा", information: "माहिती", contact: "संपर्क व आपत्कालीन सेवा", services: "पोलीस सेवा", gallery: "छायाचित्र दालन", report: "घटनेची तक्रार", track: "तक्रारीचा मागोवा", about: "महाराष्ट्र पोलिसांबद्दल", ranks: "पोलीस पदे", recruitment: "भरती", official: "अधिकृत संकेतस्थळ", emergency: "राष्ट्रीय आपत्कालीन हेल्पलाइन", headquarters: "महाराष्ट्र पोलीस मुख्यालय\nमुंबई, महाराष्ट्र", contactPolice: "महाराष्ट्र पोलिसांशी संपर्क साधा", accessibility: "सुलभता", privacy: "गोपनीयता धोरण", sitemap: "साइटमॅप", rights: "© {{year}} महाराष्ट्र पोलीस. सर्व हक्क राखीव." },
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: window.localStorage.getItem("preferredLanguage") || "en",
	fallbackLng: "en",
	interpolation: { escapeValue: false },
});

export default i18n;
