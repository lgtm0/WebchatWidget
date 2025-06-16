import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StoreFlyout } from './StoreFlyout.jsx';

const K_WIDTH = 20;
const K_HEIGHT = 20;

const Wrapper = styled.div`
  position: absolute;
  width: ${K_WIDTH}px;
  height: ${K_HEIGHT}px;
  left: 50%;
  top: 50%;
  backgroundSize: cover;
  backgroundRepeat: no-repeat;
  backgroundPosition: center;
  backgroundImage: url(https://henkel-cognigy.s3.eu-central-1.amazonaws.com/plugins/googlemaps/map-marker.png);
  color: black;
  fontSize: 14px;
  fontWeight: 600;
  padding: 4px;
  textAlign: center;
`;

const style = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,
  
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundImage: `url(https://henkel-cognigy.s3.eu-central-1.amazonaws.com/plugins/googlemaps/map-marker.png)`,
  color: 'black',
  fontSize: 14,
  fontWeight: 600,
  padding: '4px',
  textAlign: 'center'
};



// Marker
const StoreMarker = ({ id, name, phone, address, website, educationsite, show, onClick}) => {
    return (
        <>
        <div style={style} onClick={onClick}></div>
        {show && <StoreFlyout place={{ id: id, name: name, phone: phone, website: website, educationsite: educationsite, address: address }} />}
      </>
    );
};

StoreMarker.defaultProps = {
  onClick: null,
};

StoreMarker.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export { StoreMarker };