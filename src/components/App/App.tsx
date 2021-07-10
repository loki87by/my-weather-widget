/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Weather from "../Api/Api";
import Element from "../Element/Element";
import { Position } from "../../utils/types";
import "../../index.css";

function App(): any {
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const geo = navigator.geolocation;
  React.useEffect(() => {
    let pos = {};
    if (geo) {
      geo.getCurrentPosition((position: GeolocationPosition) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const api = new Weather(pos as Position);
        Promise.resolve(api.getWeather()).then((response) => {
          console.log(response);
          setCurrentLocation(response as any);
          setIsLoading(true);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // uncomment next lines after prod
  /* const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://blablabla2.netlify.app/main.css')
  document.head.appendChild(link) */

  return (
    <>
      {isLoading ? (
        <Element currentLocation={currentLocation} />
      ) : (
        <h2>Please wait...</h2>
      )}
    </>
  );
}

export default App;
