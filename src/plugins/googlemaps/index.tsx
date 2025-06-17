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

    return (
        <div style={{ height: '320px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apikey }}
                defaultCenter={center}
                defaultZoom={zoom}
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