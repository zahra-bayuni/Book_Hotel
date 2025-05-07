import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import useGeoLocation from '../../hooks/useGeoLocation';
import useUrlLocation from '../../hooks/useUrlLocation';

function Map({ markerLocations = [] }) {
  const [mapCenter, setMapCenter] = useState([20, 3]);
  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation();

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  // بررسی و تبدیل `markerLocations` به آرایه در صورت نیاز
  const markerData = Array.isArray(markerLocations) ? markerLocations : [markerLocations];

  // console.log(markerData); // برای بررسی داده‌ها

  return (
    <div className='mapContainer'>
      <MapContainer
        className='map'
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}>
        <button onClick={getPosition} className='getLocation'>
          {isLoadingPosition ? "Loading..." : "use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {
          markerData.map((item) => (
            item.latitude !== undefined && item.longitude !== undefined && (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>
                  {item.host_location}
                </Popup>
              </Marker>
            )
          ))
        }
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
