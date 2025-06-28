import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          setError("Location permission denied.");
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  return { location, error };
};

export default useUserLocation;
