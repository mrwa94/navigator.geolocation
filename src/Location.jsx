import axios from "axios";
import { lazy, useState, useEffect } from "react";
import CountryFlag from "react-country-flag";

const Location = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [address, setAddress] = useState({
    city: null,
    country: null,
    countryCode: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  OpenCage API Key
  const API_KEY = "5e5535c8a5254ed8a29081fe710d4913";
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //successfully
          const { latitude, longitude } = position.coords;
          setLocation(latitude, longitude);
          axios
            .get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            )
            .then((response) => {
              const components = response.data.results[0].components;
              const country = components.country;
              const city =
                components.city || components.town || components.village;

              const countryCode = components["country_code"].toUpperCase();
              setAddress({ country, city, countryCode });
              setLoading(false);
            });
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    } else {
      setError("Sorry! you browser does not support");
      setLoading(false);
    }
  }, [API_KEY]);

  return (
    <div>
      {loading ? (
        <p> Loading ..</p>
      ) : error ? (
        <p> error is : error</p>
      ) : (
        <div>
          <h5>It seem that you are from </h5>
          <h5>
            {address.country} , {address.city}
          </h5>
          {address.countryCode && (
            <CountryFlag
              countryCode={address.countryCode}
              svg
              style={{ width: "2em", height: "2em", marginLeft: "10px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Location;
