import React, { useState } from 'react';

// PopUp Window
const StoreFlyout = (props) => {
  const { place, onClose } = props;
  const storeFlyoutStyle = {
    position: 'relative',
    bottom: 120,
    left: '-70px',
    width: 200,
    backgroundColor: 'white',
    borderRadius: '5px 5px 5px 0',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 10,
    zIndex: 1001, // Höher als Marker für Vollbildmodus
  };
  const infoData = {
    margin: '3px 0',
    fontSize: 12,
    color: 'grey',
  }

  const phoneNumber = place.phone ? "+1"+place.phone.replace(/\D/g, '') : '';
  const phoneLink = phoneNumber ? `tel:${phoneNumber}` : '#';

  const [copied, setCopied] = useState(false);

  const fullAddress = [
    place.address.street || '',
    `${place.address.city || ''}, ${place.address.state_code || ''}, ${place.address.zip_code || ''}`
  ].join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Fehlerbehandlung optional
    }
  };

  return (
    <div style={storeFlyoutStyle}>
      <div style={{ position: 'relative', marginBottom: 5 }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: 'black', paddingRight: 20 }}>
          {place.name}
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 18,
            height: 18,
            border: 'none',
            background: '#ccc',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            fontWeight: 'bold'
          }}
          title="Close"
        >
          ×
        </button>
      </div>
      <div style={infoData}>
        <a style={{color: 'grey'}} href={phoneLink || '#'}>{place.phone || '' }</a>
      </div>
      <div style={infoData}>
        Address:
        <br />
        {place.address.street || ''}
        <br />
        {place.address.city || ''}, {place.address.state_code || ''}, {place.address.zip_code || ''}
        <button
          style={{
            marginLeft: 5,
            fontSize: 10,
            padding: '2px 6px',
            cursor: 'pointer',
            borderRadius: 3,
            border: '1px solid #ccc',
            background: copied ? '#e0ffe0' : '#f9f9f9'
          }}
          onClick={handleCopy}
          title="Copy address"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>
      <div style={infoData}>
        <a style={{color: 'grey'}} href={place.website || '#'} target="_blank" rel="noopener noreferrer">
          {place.website || ''}
        </a>
      </div>
    </div>
  );
};

export {StoreFlyout};