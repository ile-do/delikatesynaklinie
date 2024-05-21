const targetLocation = {
    lat: 49.3298587,
    lng: 20.0925855
};

//49.3298587,20.0925855

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('status').innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    const distance = calculateDistance(userLocation, targetLocation);
    document.getElementById('status').innerText = "Location obtained.";
    document.getElementById('distance').innerText = `Distance to target location: ${distance.toFixed(2)} km`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('status').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('status').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('status').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('status').innerText = "An unknown error occurred.";
            break;
    }
}

function calculateDistance(location1, location2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = degreesToRadians(location2.lat - location1.lat);
    const dLng = degreesToRadians(location2.lng - location1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(degreesToRadians(location1.lat)) * Math.cos(degreesToRadians(location2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
