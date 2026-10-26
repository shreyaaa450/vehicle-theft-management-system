import { useEffect } from "react";
import { useMap, useMapEvents, MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [18.5204, 73.8567];
const markerIcon = L.divIcon({
	className: "theft-map-marker",
	html: '<span aria-hidden="true"></span>',
	iconSize: [28, 36],
	iconAnchor: [14, 34],
});

function MapClickHandler({ onSelect }) {
	useMapEvents({
		click(event) {
			onSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
		},
	});
	return null;
}

function MapCenterUpdater({ position }) {
	const map = useMap();

	useEffect(() => {
		if (position) map.flyTo([position.lat, position.lng], Math.max(map.getZoom(), 15));
	}, [map, position]);

	return null;
}

export default function LocationPicker({ position, onSelect }) {
	const center = position ? [position.lat, position.lng] : defaultCenter;

	return (
		<MapContainer center={center} zoom={position ? 15 : 13} scrollWheelZoom className="theft-location-map">
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MapCenterUpdater position={position} />
			<MapClickHandler onSelect={onSelect} />
			{position && (
				<Marker
					position={[position.lat, position.lng]}
					icon={markerIcon}
					draggable
					eventHandlers={{
						dragend(event) {
							const markerPosition = event.target.getLatLng();
							onSelect({ lat: markerPosition.lat, lng: markerPosition.lng });
						},
					}}
				/>
			)}
		</MapContainer>
	);
}
