// Function that returns a promise which gets current position
export function getUserLocation(signal: AbortSignal): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {     
        signal.addEventListener('abort', abortHandler)
        
        function abortHandler() {
            reject(new DOMException('Aborted', 'AbortError'));
        }        
        
        navigator.geolocation.getCurrentPosition(
            // success callback — extract coords, call resolve()
            function successCallback(position){
                signal.removeEventListener('abort', abortHandler)
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            // error callback — call reject()
            function errorCallback(error){
                signal.removeEventListener('abort', abortHandler)
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