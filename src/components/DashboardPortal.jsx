import { lazy, Suspense, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/dashboard.css";

const LocationPicker = lazy(() => import("./LocationPicker.jsx"));

const roleDetails = {
	user: { title: "Citizen dashboard", subtitle: "Report a theft and follow your vehicle search.", initials: "CU" },
	investigator: { title: "Investigator dashboard", subtitle: "Review assigned cases and record recovery updates.", initials: "IN" },
	police: { title: "Police dashboard", subtitle: "Coordinate reports, users, and district investigations.", initials: "PS" },
	admin: { title: "Administrator dashboard", subtitle: "Monitor district operations and manage personnel.", initials: "AD" },
};

const navigation = {
	user: [["overview", "Overview"], ["search", "Search vehicles"], ["vehicles", "My vehicles"]],
	investigator: [["overview", "Overview"], ["search", "Search vehicles"], ["cases", "Manage cases"]],
	police: [["overview", "Overview"], ["search", "Search vehicles"], ["cases", "Manage cases"], ["users", "Manage users"]],
	admin: [["overview", "Overview"], ["search", "Search vehicles"], ["cases", "Manage cases"], ["team", "Manage personnel"], ["reports", "Analytics"]],
};

const initialCases = [
	{ id: "VT-2026-1042", owner: "Aarav Kulkarni", vehicle: "Honda Activa 6G", chassis: "ME4JF9128K8124516", area: "Shivaji Nagar, Pune", reported: "24 Oct 2026", status: "Under investigation", investigator: "Meera Joshi" },
	{ id: "VT-2026-1038", owner: "Sana Shaikh", vehicle: "Hyundai i20", chassis: "MALBB51BLPM451208", area: "Kothrud, Pune", reported: "22 Oct 2026", status: "CCTV review", investigator: "Rohan Patil" },
	{ id: "VT-2026-1021", owner: "Vikram Deshmukh", vehicle: "Royal Enfield Classic 350", chassis: "ME3U3S5F9NK225731", area: "Baner, Pune", reported: "18 Oct 2026", status: "Vehicle recovered", investigator: "Meera Joshi" },
	{ id: "VT-2026-1014", owner: "Isha More", vehicle: "Maruti Swift", chassis: "MA3EJKD1S00983142", area: "Camp, Pune", reported: "15 Oct 2026", status: "Awaiting assignment", investigator: "Unassigned" },
];

const initialVehicles = [
	{ id: 1, name: "Honda Activa 6G", chassis: "ME4JF9128K8124516", registration: "MH 12 AB 4821", area: "Shivaji Nagar, Pune", stolenAt: "2026-10-24", location: { lat: 18.5308, lng: 73.8475 } },
	{ id: 2, name: "Hyundai i20", chassis: "MALBB51BLPM451208", registration: "MH 12 CD 7710", area: "Kothrud, Pune", stolenAt: "2026-10-22", location: { lat: 18.5074, lng: 73.8077 } },
];

const hsrpVehicleRecords = [
	{ hsrp: "MH12AB4821", registration: "MH 12 AB 4821", manufacturer: "Honda", model: "Activa 6G", year: "2022", color: "Pearl Precious White", fuel: "Petrol", chassis: "ME4JF9128K8124516", engine: "JF91E8124516", owner: "Aarav Kulkarni", district: "Pune City" },
	{ hsrp: "MH12CD7710", registration: "MH 12 CD 7710", manufacturer: "Hyundai", model: "i20 Sportz", year: "2023", color: "Typhoon Silver", fuel: "Petrol", chassis: "MALBB51BLPM451208", engine: "G4LAPM451208", owner: "Sana Shaikh", district: "Pune City" },
	{ hsrp: "MH12EF2048", registration: "MH 12 EF 2048", manufacturer: "Royal Enfield", model: "Classic 350", year: "2021", color: "Stealth Black", fuel: "Petrol", chassis: "ME3U3S5F9NK225731", engine: "U3S5FNK225731", owner: "Vikram Deshmukh", district: "Pune City" },
];

const initialUsers = [
	{ id: 1, name: "Aarav Kulkarni", email: "aarav.k@example.in", phone: "+91 98765 43210", cases: 1, status: "Verified" },
	{ id: 2, name: "Sana Shaikh", email: "sana.s@example.in", phone: "+91 98220 15433", cases: 1, status: "Verified" },
	{ id: 3, name: "Vikram Deshmukh", email: "vikram.d@example.in", phone: "+91 97654 11802", cases: 1, status: "Pending review" },
];

const initialTeam = [
	{ id: 1, name: "Meera Joshi", role: "Investigator", badge: "INV-204", area: "Pune City", status: "Active" },
	{ id: 2, name: "Rohan Patil", role: "Investigator", badge: "INV-219", area: "Pune West", status: "Active" },
	{ id: 3, name: "Anil Jadhav", role: "Police officer", badge: "POL-087", area: "Pune City", status: "Active" },
];

const searchMatches = [
	{ vehicle: "Honda Activa 6G", chassis: "ME4JF9128K8124516", registration: "MH 12 AB 4821", area: "Shivaji Nagar, Pune", seen: "24 Oct, 10:42 AM", confidence: "High", camera: "JM Road · Camera 04" },
	{ vehicle: "Hyundai i20", chassis: "MALBB51BLPM451208", registration: "MH 12 CD 7710", area: "Kothrud, Pune", seen: "22 Oct, 08:16 PM", confidence: "Review", camera: "Karve Road · Camera 12" },
	{ vehicle: "Royal Enfield Classic 350", chassis: "ME3U3S5F9NK225731", registration: "MH 12 EF 2048", area: "Baner, Pune", seen: "21 Oct, 06:54 AM", confidence: "High", camera: "Baner Road · Camera 08" },
];

const statusOptions = ["Awaiting assignment", "Under investigation", "CCTV review", "Vehicle recovered", "Closed"];
const investigators = ["Meera Joshi", "Rohan Patil", "Unassigned"];
const emptyVehicle = { name: "", chassis: "", registration: "", area: "", stolenAt: "", location: null };

function StatCard({ label, value, note, icon }) {
	return <article className="dashboard-stat"><span className="dashboard-stat-icon">{icon}</span><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}

function DataTable({ headings, children, emptyMessage }) {
	return <div className="dashboard-table-wrap"><table className="dashboard-table"><thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{children || <tr><td colSpan={headings.length} className="dashboard-empty">{emptyMessage}</td></tr>}</tbody></table></div>;
}

export default function DashboardPortal({ role, onExit }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [cases, setCases] = useState(initialCases);
	const [vehicles, setVehicles] = useState(initialVehicles);
	const [users, setUsers] = useState(initialUsers);
	const [team, setTeam] = useState(initialTeam);
	const [query, setQuery] = useState({ chassis: "", area: "" });
	const [searched, setSearched] = useState(false);
	const [editingVehicle, setEditingVehicle] = useState(null);
	const [vehicleForm, setVehicleForm] = useState(emptyVehicle);
	const [notice, setNotice] = useState("");
	const details = roleDetails[role];
	const canAssign = role === "police" || role === "admin";
	const requestedSection = location.pathname.split("/").filter(Boolean).at(-1);
	const activeSection = navigation[role].some(([key]) => key === requestedSection) ? requestedSection : "overview";
	const setActiveSection = (section) => navigate(`/dashboard/${role}/${section}`);

	const matches = useMemo(() => {
		if (!searched) return [];
		const chassis = query.chassis.trim().toLowerCase();
		const area = query.area.trim().toLowerCase();
		return searchMatches.filter((match) =>
			(!chassis || match.chassis.toLowerCase().includes(chassis) || match.registration.toLowerCase().includes(chassis))
			&& (!area || match.area.toLowerCase().includes(area))
		);
	}, [query, searched]);

	function updateCase(id, field, value) {
		setCases((current) => current.map((item) => item.id === id ? { ...item, [field]: value } : item));
	}

	function beginVehicleEdit(vehicle) {
		setEditingVehicle(vehicle?.id ?? 0);
		setVehicleForm(vehicle ? { ...vehicle, location: vehicle.location ?? null } : emptyVehicle);
		setNotice("");
	}

	function saveVehicle(event) {
		event.preventDefault();
		if (!vehicleForm.location) {
			setNotice("Select the theft location on the map before saving the vehicle report.");
			return;
		}
		const savedVehicle = { ...vehicleForm };
		if (editingVehicle === 0) {
			setVehicles((current) => [...current, { ...savedVehicle, id: Date.now() }]);
			setNotice("Vehicle report added to your dashboard.");
		} else {
			setVehicles((current) => current.map((vehicle) => vehicle.id === editingVehicle ? { ...savedVehicle, id: editingVehicle } : vehicle));
			setNotice("Vehicle details updated.");
		}
		setEditingVehicle(null);
		setVehicleForm(emptyVehicle);
	}

	const sectionTitle = navigation[role].find(([key]) => key === activeSection)?.[1] || "Overview";

	return (
		<main className="dashboard-app">
			<aside className="dashboard-sidebar">
				<div className="dashboard-brand"><span className="dashboard-brand-mark">VT</span><div><strong>Vehicle Trace</strong><small>District operations</small></div></div>
				<div className="dashboard-role-label">WORKSPACE</div>
				<nav className="dashboard-nav" aria-label="Dashboard sections">
					{navigation[role].map(([key, label]) => <button key={key} type="button" className={activeSection === key ? "active" : ""} onClick={() => { setActiveSection(key); setNotice(""); }}><span aria-hidden="true">{({ overview: "◫", search: "⌕", vehicles: "▣", cases: "▤", users: "♙", team: "♧", reports: "▥" })[key]}</span>{label}</button>)}
				</nav>
				<div className="dashboard-sidebar-foot"><span className="dashboard-online-dot" /> Prototype workspace <small>Sample data only</small></div>
			</aside>

			<section className="dashboard-main">
				<header className="dashboard-topbar">
					<div><span className="dashboard-breadcrumb">Dashboard / {sectionTitle}</span><h1>{details.title}</h1></div>
					<div className="dashboard-profile"><span className="dashboard-avatar">{details.initials}</span><span><strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong><small>Demo account</small></span><button type="button" onClick={onExit}>Return to site</button></div>
				</header>
				<div className="dashboard-content">
					{activeSection === "overview" && <Overview role={role} cases={cases} vehicles={vehicles} team={team} setActiveSection={setActiveSection} />}
					{activeSection === "search" && <VehicleSearch query={query} setQuery={setQuery} searched={searched} setSearched={setSearched} matches={matches} />}
					{activeSection === "vehicles" && <VehicleManager vehicles={vehicles} notice={notice} setNotice={setNotice} editingVehicle={editingVehicle} vehicleForm={vehicleForm} setVehicleForm={setVehicleForm} beginVehicleEdit={beginVehicleEdit} saveVehicle={saveVehicle} setEditingVehicle={setEditingVehicle} setVehicles={setVehicles} />}
					{activeSection === "cases" && <CaseManager role={role} cases={cases} updateCase={updateCase} canAssign={canAssign} />}
					{activeSection === "users" && <UserManager users={users} setUsers={setUsers} />}
					{activeSection === "team" && <TeamManager team={team} setTeam={setTeam} />}
					{activeSection === "reports" && <Reports cases={cases} />}
				</div>
			</section>
		</main>
	);
}

function Overview({ role, cases, vehicles, team, setActiveSection }) {
	const stats = role === "user"
		? [["My vehicles", vehicles.length, "Registered in this account", "▣"], ["Searches today", "03", "Across selected districts", "⌕"], ["Possible sightings", "02", "Awaiting review", "◉"]]
		: role === "investigator"
			? [["Assigned cases", "12", "Across your districts", "▤"], ["Under review", "08", "CCTV footage review", "◷"], ["Recovered", "04", "This month", "✓"]]
			: [["Open cases", cases.filter((item) => item.status !== "Closed" && item.status !== "Vehicle recovered").length, "District-wide", "▤"], ["Vehicles recovered", "28", "This month", "✓"], ["Active personnel", team.length, "Police & investigators", "♧"]];

	return <>
		<div className="dashboard-welcome"><div><span className="dashboard-eyebrow">DISTRICT VEHICLE THEFT PORTAL</span><h2>{role === "user" ? "Good morning, Aarav" : `Welcome back, ${role === "admin" ? "Administrator" : role === "police" ? "Officer" : "Meera"}`}</h2><p>{roleDetails[role].subtitle}</p></div><button className="dashboard-primary" type="button" onClick={() => setActiveSection("search")}>⌕ <span>Search a vehicle</span></button></div>
		<div className="dashboard-stats">{stats.map(([label, value, note, icon]) => <StatCard key={label} label={label} value={value} note={note} icon={icon} />)}</div>
		<div className="dashboard-overview-grid">
			<section className="dashboard-card dashboard-recent"><div className="dashboard-card-heading"><div><span className="dashboard-eyebrow">LATEST ACTIVITY</span><h3>{role === "user" ? "Your vehicle reports" : "Recent cases"}</h3></div><button type="button" className="dashboard-text-button" onClick={() => setActiveSection(role === "user" ? "vehicles" : "cases")}>View all →</button></div>
				{role === "user" ? vehicles.slice(0, 3).map((vehicle) => <div className="dashboard-activity-row" key={vehicle.id}><span className="dashboard-activity-icon">▣</span><span><strong>{vehicle.name}</strong><small>{vehicle.registration} · {vehicle.area}</small></span><span className="dashboard-status status-review">Searching</span></div>) : cases.slice(0, 3).map((item) => <div className="dashboard-activity-row" key={item.id}><span className="dashboard-activity-icon">▤</span><span><strong>{item.vehicle}</strong><small>{item.id} · {item.area}</small></span><span className={`dashboard-status ${statusClass(item.status)}`}>{item.status}</span></div>)}
			</section>
			<section className="dashboard-card dashboard-quick-card"><span className="dashboard-eyebrow">QUICK ACCESS</span><h3>What would you like to do?</h3><button type="button" onClick={() => setActiveSection("search")}><span className="quick-icon">⌕</span><span><strong>Search CCTV sightings</strong><small>Search by chassis number and area</small></span><b>→</b></button>{role === "user" && <button type="button" onClick={() => setActiveSection("vehicles")}><span className="quick-icon">＋</span><span><strong>Report a stolen vehicle</strong><small>Add vehicle details and theft location</small></span><b>→</b></button>}{role !== "user" && <button type="button" onClick={() => setActiveSection(role === "admin" ? "reports" : "cases")}><span className="quick-icon">▤</span><span><strong>{role === "admin" ? "View case analytics" : "Manage active cases"}</strong><small>Review the latest district updates</small></span><b>→</b></button>}</section>
		</div>
	</>;
}

function VehicleSearch({ query, setQuery, searched, setSearched, matches }) {
	return <section className="dashboard-card dashboard-search-card">
		<div className="dashboard-section-heading"><span className="dashboard-eyebrow">DISTRICT CCTV DATABASE</span><h2>Search for a vehicle</h2><p>Enter a chassis number and the area where the vehicle was stolen. Sample sightings are used for this prototype.</p></div>
		<form className="vehicle-search-form" onSubmit={(event) => { event.preventDefault(); setSearched(true); }}>
			<label>Chassis number<input value={query.chassis} onChange={(event) => setQuery((current) => ({ ...current, chassis: event.target.value }))} placeholder="e.g. ME4JF9128K8124516" /></label>
			<label>Stolen area / district<input value={query.area} onChange={(event) => setQuery((current) => ({ ...current, area: event.target.value }))} placeholder="e.g. Pune, Kothrud" /></label>
			<button className="dashboard-primary" type="submit">⌕ Search footage</button>
		</form>
		<div className="search-hint"><span>ⓘ</span> Search both fields for more relevant sample results. This dashboard does not connect to live CCTV footage.</div>
		{searched && <div className="dashboard-results"><div className="dashboard-card-heading"><div><span className="dashboard-eyebrow">SEARCH RESULTS</span><h3>{matches.length} possible sighting{matches.length === 1 ? "" : "s"}</h3></div><span className="dashboard-results-tag">Sample matches</span></div>
			{matches.length ? <DataTable headings={["Vehicle", "Area", "Last seen", "Camera", "Match"]}>{matches.map((match) => <tr key={match.registration}><td><strong>{match.vehicle}</strong><small>{match.registration}</small></td><td>{match.area}</td><td>{match.seen}</td><td>{match.camera}</td><td><span className={`dashboard-status ${match.confidence === "High" ? "status-found" : "status-review"}`}>{match.confidence}</span></td></tr>)}</DataTable> : <div className="dashboard-no-results">No sample sightings match those details. Try a different chassis number or a broader area.</div>}
		</div>}
	</section>;
}

function VehicleManager({ vehicles, notice, setNotice, editingVehicle, vehicleForm, setVehicleForm, beginVehicleEdit, saveVehicle, setEditingVehicle, setVehicles }) {
	const [hsrpNumber, setHsrpNumber] = useState("");
	const [lookupResult, setLookupResult] = useState(null);

	function lookupHsrp() {
		const normalizedNumber = hsrpNumber.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
		if (!normalizedNumber) {
			setLookupResult({ error: "Enter an HSRP / registration number to search." });
			return;
		}

		const vehicle = hsrpVehicleRecords.find((record) => record.hsrp === normalizedNumber);
		if (!vehicle) {
			setLookupResult({ error: "No sample vehicle found for that number. Check it or enter the vehicle details manually." });
			return;
		}

		setLookupResult({ vehicle });
		setVehicleForm((current) => ({
			...current,
			name: `${vehicle.manufacturer} ${vehicle.model}`,
			chassis: vehicle.chassis,
			registration: vehicle.registration,
		}));
		setNotice("");
	}

	function getCurrentLocation() {
		if (!navigator.geolocation) {
			return Promise.reject(new Error("This browser does not support location access."));
		}
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
				(error) => reject(new Error(error.message)),
				{ enableHighAccuracy: true, timeout: 10000 },
			);
		});
	}

	async function selectCurrentLocation() {
		try {
			const position = await getCurrentLocation();
			setVehicleForm((current) => ({ ...current, location: position }));
			setNotice("");
		} catch (error) {
			setNotice(`Unable to get your current location: ${error.message}`);
		}
	}

	return <div className="dashboard-card dashboard-management-card">
		<div className="dashboard-section-heading dashboard-section-heading-row"><div><span className="dashboard-eyebrow">VEHICLE REGISTRY</span><h2>My vehicles</h2><p>Add, update, or remove a vehicle report in this prototype.</p></div>{editingVehicle === null && <button className="dashboard-primary" type="button" onClick={() => beginVehicleEdit(null)}>＋ Add vehicle</button>}</div>
		{notice && <div className="dashboard-notice" role="status">{notice}</div>}
		{editingVehicle !== null && <form className="vehicle-editor" onSubmit={saveVehicle}>
			<div className="dashboard-card-heading"><h3>{editingVehicle === 0 ? "Add vehicle report" : "Edit vehicle details"}</h3><button type="button" className="dashboard-icon-button" onClick={() => setEditingVehicle(null)} aria-label="Close form">×</button></div>
			<section className="hsrp-lookup" aria-labelledby="hsrp-lookup-title">
				<div><span className="dashboard-eyebrow">SAMPLE VEHICLE DATABASE</span><h4 id="hsrp-lookup-title">Look up vehicle by HSRP number</h4><p>Enter a sample registration / HSRP number to auto-fill vehicle details.</p></div>
				<div className="hsrp-lookup-controls">
					<input aria-label="HSRP number" value={hsrpNumber} onChange={(event) => { setHsrpNumber(event.target.value); setLookupResult(null); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); lookupHsrp(); } }} placeholder="e.g. MH 12 AB 4821" />
					<button type="button" className="dashboard-secondary" onClick={lookupHsrp}>Look up vehicle</button>
				</div>
				{lookupResult?.error && <p className="hsrp-lookup-message hsrp-lookup-error" role="alert">{lookupResult.error}</p>}
				{lookupResult?.vehicle && <VehicleLookupDetails vehicle={lookupResult.vehicle} />}
				<small className="hsrp-lookup-demo">Demo numbers: MH 12 AB 4821 · MH 12 CD 7710 · MH 12 EF 2048</small>
			</section>
			<div className="vehicle-editor-fields">
				<label>Vehicle make and model<input required value={vehicleForm.name} onChange={(event) => setVehicleForm((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Honda Activa 6G" /></label>
				<label>Chassis number<input required value={vehicleForm.chassis} onChange={(event) => setVehicleForm((current) => ({ ...current, chassis: event.target.value }))} placeholder="Enter chassis number" /></label>
				<label>Registration number<input required value={vehicleForm.registration} onChange={(event) => setVehicleForm((current) => ({ ...current, registration: event.target.value }))} placeholder="e.g. MH 12 AB 1234" /></label>
				<label>Date stolen<input type="date" required value={vehicleForm.stolenAt} onChange={(event) => setVehicleForm((current) => ({ ...current, stolenAt: event.target.value }))} /></label>
			</div>
			<div className="map-picker-heading">
				<div><strong>Mark the theft location</strong><small>Click the map to place a pin, or drag it to the exact spot.</small></div>
				<button type="button" className="dashboard-secondary" onClick={selectCurrentLocation}>Use my current location</button>
			</div>
			<Suspense fallback={<div className="theft-location-map map-loading">Loading map…</div>}>
				<LocationPicker position={vehicleForm.location} onSelect={(location) => { setNotice(""); setVehicleForm((current) => ({ ...current, location })); }} />
			</Suspense>
			{vehicleForm.location
				? <p className="map-coordinate-status" role="status">Location pinned: {vehicleForm.location.lat.toFixed(5)}, {vehicleForm.location.lng.toFixed(5)}</p>
				: <p className="map-coordinate-status map-coordinate-empty">No map location selected yet.</p>}
			<label className="vehicle-area-field">Theft area / address<input required value={vehicleForm.area} onChange={(event) => setVehicleForm((current) => ({ ...current, area: event.target.value }))} placeholder="e.g. Shivaji Nagar, Pune" /></label>
			<div className="vehicle-editor-actions"><button type="button" className="dashboard-secondary" onClick={() => setEditingVehicle(null)}>Cancel</button><button type="submit" className="dashboard-primary">{editingVehicle === 0 ? "Save vehicle report" : "Save changes"}</button></div>
		</form>}
		<DataTable headings={["Vehicle", "Chassis number", "Registration", "Stolen location", "Reported", "Actions"]} emptyMessage="No vehicle reports yet. Add a vehicle to get started.">{vehicles.map((vehicle) => <tr key={vehicle.id}><td><strong>{vehicle.name}</strong></td><td>{vehicle.chassis}</td><td>{vehicle.registration}</td><td>{vehicle.area}</td><td>{vehicle.stolenAt}</td><td className="dashboard-row-actions"><button type="button" onClick={() => beginVehicleEdit(vehicle)}>Edit</button><button type="button" className="danger-action" onClick={() => setVehicles((current) => current.filter((item) => item.id !== vehicle.id))}>Delete</button></td></tr>)}</DataTable>
	</div>;
}

function VehicleLookupDetails({ vehicle }) {
	const details = [
		["Registration / HSRP", vehicle.registration],
		["Make & model", `${vehicle.manufacturer} ${vehicle.model}`],
		["Manufacturing year", vehicle.year],
		["Color", vehicle.color],
		["Fuel type", vehicle.fuel],
		["Chassis number", vehicle.chassis],
		["Engine number", vehicle.engine],
		["Registered owner (demo)", vehicle.owner],
		["Registration district", vehicle.district],
	];

	return <section className="hsrp-vehicle-details" aria-label="Vehicle lookup details">
		<div className="hsrp-details-heading"><span className="hsrp-match-icon">✓</span><span><strong>Vehicle found</strong><small>Sample record · details copied into the report form</small></span></div>
		<dl className="hsrp-details-grid">{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
	</section>;
}

function CaseManager({ role, cases, updateCase, canAssign }) {
	return <section className="dashboard-card dashboard-management-card">
		<div className="dashboard-section-heading"><span className="dashboard-eyebrow">CASE OPERATIONS</span><h2>Manage cases</h2><p>{role === "investigator" ? "Update case progress and recovery status for your investigations." : "Review district case records and coordinate case assignments."}</p></div>
		<DataTable headings={["Case / vehicle", "Owner", "Theft area", "Investigator", "Recovery status"]} emptyMessage="No cases to display.">{cases.map((item) => <tr key={item.id}><td><strong>{item.id}</strong><small>{item.vehicle} · {item.chassis}</small></td><td>{item.owner}</td><td>{item.area}<small>{item.reported}</small></td><td>{canAssign ? <select className="dashboard-select" value={item.investigator} onChange={(event) => updateCase(item.id, "investigator", event.target.value)} aria-label={`Assign investigator for ${item.id}`}>{investigators.map((name) => <option key={name}>{name}</option>)}</select> : <span>{item.investigator}</span>}</td><td><select className={`dashboard-select status-select ${statusClass(item.status)}`} value={item.status} onChange={(event) => updateCase(item.id, "status", event.target.value)} aria-label={`Update status for ${item.id}`}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</DataTable>
		<p className="dashboard-table-note">Prototype records are illustrative only. Case assignment and status changes are kept in page state.</p>
	</section>;
}

function UserManager({ users, setUsers }) {
	return <section className="dashboard-card dashboard-management-card">
		<div className="dashboard-section-heading"><span className="dashboard-eyebrow">CITIZEN ACCOUNTS</span><h2>Manage users</h2><p>Review demo users and their associated theft reports.</p></div>
		<DataTable headings={["User", "Contact", "Active cases", "Account status", "Action"]} emptyMessage="No users in the sample list.">{users.map((user) => <tr key={user.id}><td><strong>{user.name}</strong><small>Citizen account</small></td><td>{user.email}<small>{user.phone}</small></td><td>{user.cases}</td><td><span className={`dashboard-status ${user.status === "Verified" ? "status-found" : "status-review"}`}>{user.status}</span></td><td><button className="dashboard-text-button" type="button" onClick={() => setUsers((current) => current.map((item) => item.id === user.id ? { ...item, status: item.status === "Verified" ? "Pending review" : "Verified" } : item))}>{user.status === "Verified" ? "Review" : "Verify"}</button></td></tr>)}</DataTable>
	</section>;
}

function TeamManager({ team, setTeam }) {
	return <section className="dashboard-card dashboard-management-card">
		<div className="dashboard-section-heading"><span className="dashboard-eyebrow">STAFF DIRECTORY</span><h2>Manage police & investigators</h2><p>Review sample personnel and update their availability.</p></div>
		<DataTable headings={["Personnel", "Role", "Badge ID", "District", "Availability"]} emptyMessage="No personnel listed.">{team.map((person) => <tr key={person.id}><td><strong>{person.name}</strong></td><td>{person.role}</td><td>{person.badge}</td><td>{person.area}</td><td><button type="button" className={`dashboard-status-button ${person.status === "Active" ? "status-found" : "status-review"}`} onClick={() => setTeam((current) => current.map((item) => item.id === person.id ? { ...item, status: item.status === "Active" ? "On leave" : "Active" } : item))}>{person.status}</button></td></tr>)}</DataTable>
	</section>;
}

function Reports({ cases }) {
	const recovered = cases.filter((item) => item.status === "Vehicle recovered").length + 25;
	const open = cases.filter((item) => item.status !== "Closed" && item.status !== "Vehicle recovered").length + 41;
	return <div className="dashboard-report-page">
		<div className="dashboard-section-heading"><span className="dashboard-eyebrow">DISTRICT PERFORMANCE</span><h2>Case analytics</h2><p>Illustrative dashboard metrics based on sample district records.</p></div>
		<div className="dashboard-stats report-stats"><StatCard label="Cases this month" value="68" note="↑ 12% from last month" icon="▤" /><StatCard label="Vehicles recovered" value={recovered} note="Recovery rate: 39%" icon="✓" /><StatCard label="Open investigations" value={open} note="Across 6 police stations" icon="◷" /><StatCard label="Average resolution" value="8.4 days" note="↓ 1.2 days this month" icon="◷" /></div>
		<section className="dashboard-card report-chart-card"><div className="dashboard-card-heading"><div><span className="dashboard-eyebrow">MONTHLY OVERVIEW</span><h3>Cases reported and vehicles recovered</h3></div><span className="dashboard-results-tag">Last 6 months</span></div><div className="report-legend"><span><i className="legend-reported" /> Cases reported</span><span><i className="legend-recovered" /> Vehicles recovered</span></div><div className="report-chart" aria-label="Bar chart comparing monthly cases and recoveries">{[["May", 49, 22], ["Jun", 65, 31], ["Jul", 54, 28], ["Aug", 76, 39], ["Sep", 61, 33], ["Oct", 68, 41]].map(([month, reported, found]) => <div className="report-chart-group" key={month}><div className="report-bars"><span className="report-bar reported-bar" style={{ height: `${reported}%` }} title={`${reported} cases reported`} /><span className="report-bar recovered-bar" style={{ height: `${found}%` }} title={`${found} recovered`} /></div><small>{month}</small></div>)}</div></section>
	</div>;
}

function statusClass(status) {
	if (status === "Vehicle recovered" || status === "Closed") return "status-found";
	if (status === "Awaiting assignment") return "status-pending";
	return "status-review";
}
