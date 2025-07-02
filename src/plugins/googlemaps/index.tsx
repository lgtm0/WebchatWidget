import * as React from "react";
import "idempotent-babel-polyfill";
import { registerMessagePlugin } from "../helper";

import GoogleMapReact from 'google-map-react';
import { centerStyle } from './centerStyle.js';
import { StoreMarker } from './partials/StoreMarker.jsx';


const GoogleMapsWithMarkers = (props) => {
    
    
    const { data, text } = props.message;
    const { center, zoom, apikey, markers } = props.message.data._plugin;
    
    // State für aktiven Marker
    const [activeMarker, setActiveMarker] = React.useState(null);

    const onChildClickCallback = (key) => {
        setActiveMarker(key === activeMarker ? null : key);
    }

    const onMapClick = () => {
        setActiveMarker(null);
    }

    const mapOptions = {
        clickableIcons: false, // Verhindert Klicks auf POI (Points of Interest)
        disableDefaultUI: false, // Behält Standard UI-Elemente
        styles: [
            {
                featureType: "poi",
                stylers: [
                    { visibility: "off" } // Versteckt alle POI komplett
                ]
            },
            {
                featureType: "poi.business",
                stylers: [
                    { visibility: "off" } // Versteckt Business POI
                ]
            },
            {
                featureType: "poi.attraction",
                stylers: [
                    { visibility: "off" } // Versteckt Attraktionen
                ]
            },
            {
                featureType: "poi.government",
                stylers: [
                    { visibility: "off" } // Versteckt Regierungsgebäude
                ]
            },
            {
                featureType: "poi.medical",
                stylers: [
                    { visibility: "off" } // Versteckt medizinische Einrichtungen
                ]
            },
            {
                featureType: "poi.park",
                stylers: [
                    { visibility: "off" } // Versteckt Parks
                ]
            },
            {
                featureType: "poi.place_of_worship",
                stylers: [
                    { visibility: "off" } // Versteckt Gotteshäuser
                ]
            },
            {
                featureType: "poi.school",
                stylers: [
                    { visibility: "off" } // Versteckt Schulen
                ]
            },
            {
                featureType: "poi.sports_complex",
                stylers: [
                    { visibility: "off" } // Versteckt Sportkomplexe
                ]
            }
        ]
    };

    return (
        <div style={{ height: '320px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apikey }}
                defaultCenter={center}
                defaultZoom={zoom}
                onClick={onMapClick}
                options={mapOptions}
                >
                <CenterMarker
                    name={center.name}
                    lat={center.lat}
                    lng={center.lng}
                    key="1001"
                    />
            {markers && markers.map((marker, index) => (
                <StoreMarker
                key={index}
                name={marker.name}
                lat={marker.lat}
                lng={marker.lng}
                phone={marker.phone}
                address={marker.address}
                website={marker.website}
                educationsite={marker.educationsite}
                show={activeMarker === index}
                onClick={() => onChildClickCallback(index)}
                onClose={() => setActiveMarker(null)}
                />
            ))}
            </GoogleMapReact>
        </div>
    )
}

// center
const CenterMarker = ({name}) => {
    return (
      <>
        <div style={centerStyle}></div>
      </>
    );
};



const GoogleMapsWithMarkersPlugin = {
    match: 'google-maps-with-markers',
    component: GoogleMapsWithMarkers,
    options: {
        fullwidth: true
    }

}

registerMessagePlugin(GoogleMapsWithMarkersPlugin);

export default GoogleMapsWithMarkersPlugin;