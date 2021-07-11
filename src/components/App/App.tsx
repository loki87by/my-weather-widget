/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Weather from "../Api/Api";
import Element from "../Element/Element";
import Settings from "../Settings/Settings";
import { Position } from "../../utils/types";
import settings from "../../assets/settings.svg";
import enter from "../../assets/enter-arrow.svg";
import "../../index.css";

function App(): any {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSettings, setSettings] = React.useState(false);
  const [locationArray, setLocationArray] = React.useState([] as any[]);
  const [newLocation, setNewLocation] = React.useState("");

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
          setIsLoading(true);
          const arr = [];
          arr.push(response);
          setLocationArray(arr);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toogleSettings() {
    const reverse = !isSettings;
    setSettings(reverse);
  }

  function inputNewLocation(event: React.FormEvent<HTMLInputElement>) {
    setNewLocation((event.target as HTMLInputElement).value);
  }

  function changeNewLocation() {
    console.log(newLocation);
    const obj: Position = {};
    obj.city = newLocation;
    const api = new Weather(obj);
    Promise.resolve(api.getWeather()).then((response) => {
      console.log(response);
      setIsLoading(true);
      const arr = locationArray.slice();
      arr.push(response);
      setLocationArray(arr);
    });
  }

  function deleteElement(num: number) {
    const arr = locationArray
      .map((it, ind) => {
        if (ind !== +num) {
          return it;
        }
      })
      .filter((i) => i !== undefined);
    setLocationArray(arr);
  }

  // uncomment next lines after prod
  /* const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://blablabla2.netlify.app/main.css')
  document.head.appendChild(link) */

  return (
    <div className="Weather-widget-app">
      {isLoading ? (
        <div className="Weather-widget-app__container">
          {isSettings ? (
            <h3
              className="Weather-widget-app__settings-button"
              onClick={toogleSettings}
            >
              +
            </h3>
          ) : (
            <img
              className="Weather-widget-app__settings-button"
              onClick={toogleSettings}
              src={settings}
              alt="settings"
            />
          )}
          {isSettings ? (
            <>
              <h4>Settings</h4>
              {locationArray.map((item, index) => (
                <Settings
                  key={index}
                  locationArray={locationArray}
                  id={`item-${index}`}
                  deleteElement={deleteElement}
                  apiResponse={item}
                />
              ))}
              <h4 className="Weather-widget-app__settings-add">Add location</h4>
              <div className="Weather-widget-app__settings-form">
                <input
                  className="Weather-widget-app__settings-input"
                  type="text"
                  onInput={inputNewLocation}
                />
                <img
                  className="Weather-widget-app__settings-submit"
                  src={enter}
                  alt="confirm"
                  onClick={changeNewLocation}
                />
              </div>
            </>
          ) : (
            locationArray.map((item, index) => (
              <Element key={index} apiResponse={item} />
            ))
          )}
        </div>
      ) : (
        <h3>Please wait...</h3>
      )}
    </div>
  );
}

export default App;
