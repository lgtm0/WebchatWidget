const K_WIDTH = 20;
const K_HEIGHT = 20;

const centerStyle = {
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
  backgroundImage: `url(https://sthkhcbgptstorage.blob.core.windows.net/public/plugins/googlemaps/you-marker.png)`,
  color: 'black',
  fontSize: 14,
  fontWeight: 600,
  padding: '4px',
  textAlign: 'center'
};


export {centerStyle};