# Google Maps Plugin With Markers

## Calling the Plugin

```json
{
  "_plugin": {
    "type": "google-maps-with-markers",
    "apikey": "AIzaSyC4IX0DYI8tL9rvX8Nghdv5geLdgxai_cM",
    "text2": "You",
    "zoom": 9,
    "center": {
        "lat": "{{context.user.lat}}",
        "lng": "{{context.user.lng}}"
    },
    "markers": [
        {
            "name": "<name of marker 1>",
            "lat": "<lat of marker 1>",
            "long": "<lng of marker 1>"
        },
        {
            "name": "<name of marker 2>",
            "lat": "<lat of marker 2>",
            "lng": "<lng of marker 2>"
        },
        (...)
        {
            "name": "<name of marker n>",
            "lat": "<lat of marker n>",
            "lng": "<lng of marker n>"
        }
    ]
  }
}

```

## Implementation

### Example of Popup Information
https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/MarkerInfoWindow.js