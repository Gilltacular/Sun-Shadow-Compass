// Function that returns a promise which gets current position
export function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            // success callback — extract coords, call resolve()
            function successCallback(position){
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            // error callback — call reject()
            function errorCallback(error){
                reject(error);
            },
            // options object
            {
                enableHighAccuracy: false,
                timeout:            10000,
                maximumAge:         0,
            }
        );
    });
}