mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "showMap",
    style: "mapbox://styles/mapbox/streets-v12",
    center: campground.geometry.coordinates,
    zoom: 9,
    attributionControl: false,
});

map.addControl(new mapboxgl.NavigationControl());

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
    })
);

const marker = new mapboxgl.Marker({
    color: "#0000FF",
})
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup().setHTML(`<h6>${campground.location}</h6>`))
    .addTo(map);

marker.togglePopup();
