import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { FaMapMarkedAlt, FaCar, FaWhatsapp } from 'react-icons/fa';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRtYXIyMzExIiwiYSI6ImNsaWR2MWdzNjAzYXAzaG16MXJvYmk4NDMifQ.CYEcO7xQQ-ROj0-dTxayOg';

const MapFrame = ({ point }) => {
  const new_point = { lng: point[1], lat: point[0] };
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Replace with your desired map style
      center: new_point,
      zoom: 15, // Adjust the zoom level as needed
    });

    // Add a marker at the given point
    const marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(new_point)
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [new_point]);

  const handleGoogleMaps = () => {
    // Open Google Maps with the location
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${new_point.lat},${new_point.lng}`;
    window.open(googleMapsUrl);
  };

  const handleWaze = () => {
    // Open Waze with the location
    const wazeUrl = `https://www.waze.com/ul?ll=${new_point.lat},${new_point.lng}&navigate=yes`;
    window.open(wazeUrl);
  };

  const handleWhatsApp = () => {
    // Share location link via WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?text=Check%20out%20this%20location:%20${encodeURIComponent(`https://www.google.com/maps/search/?api=1&query=${new_point.lat},${new_point.lng}`)}`;
    window.open(whatsappUrl);
  };

  return (
    // <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div>
      <div
        ref={mapContainerRef}
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          bottom: 50,
          left: 0,
          margin: 'auto',
          border: '2px solid black',
        }}
      />
      <div  className={"d-flex justify-content-around my-3"} style={{ marginTop: '10px' }}>
        <button onClick={handleGoogleMaps} className={"btn"} style={{ backgroundColor: '#4285F4', color: 'white' }}>
          <FaMapMarkedAlt style={{marginRight: '5px'}} />
          Open in Google Maps
        </button>
        <button onClick={handleWaze} className={"btn"} style={{ backgroundColor: '#FFC20F', color: 'black' }}>
          <FaCar style={{ marginRight: '5px'}} />
          Open in Waze
        </button>
        <button onClick={handleWhatsApp} className={"btn"} style={{ backgroundColor: '#25D366', color: 'white' }}>
          <FaWhatsapp style={{ marginRight: '5px'}} />
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default MapFrame;
