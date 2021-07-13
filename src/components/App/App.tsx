/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Weather from "../Api/Api";
import Element from "../Element/Element";
import Settings from "../Settings/Settings";
import { Position } from "../../utils/types";
import { PAGINATION_COUNTER, paginationPagesArray } from "../../utils/consts";
import settings from "../../assets/settings.svg";
import enter from "../../assets/enter-arrow.svg";
import "../../index.css";

function App(): any {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSettings, setSettings] = React.useState(false);
  const [apiError, setApiError] = React.useState(false);
  const [pagination, setPagination] = React.useState(false);
  const [locationArray, setLocationArray] = React.useState([] as any[]);
  const [currentlocationArray, setCurrentLocationArray] = React.useState(
    locationArray.slice(0, 3)
  );
  const [paginationPages, setPaginationPages] = React.useState([] as number[]);
  const [newLocation, setNewLocation] = React.useState("");
  const [labelText, setLabelText] = React.useState("Add location");

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
          setIsLoading(true);
          const responseArray = [];
          responseArray.push(response);
          setLocationArray(responseArray);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toogleSettings() {
    const reverse = !isSettings;
    setSettings(reverse);
    setCurrentLocationArray(locationArray.slice(0, 3));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const app = document.querySelector(".Weather-widget-app");
    const appHeight = (app as HTMLElement).offsetHeight;
    if (appHeight > window.innerHeight) {
      setPagination(true);
      const pages = paginationPagesArray(locationArray.length);
      setPaginationPages(pages);
    }
  });

  function changeNewLocation() {
    const obj: Position = {};
    obj.city = newLocation;
    const api = new Weather(obj);
    Promise.resolve(api.getWeather()).then((response) => {
      if (response) {
        const { name } = response as any;
        setIsLoading(true);
        if (!locationArray.some((i) => i.name === name)) {
          const arr = locationArray.slice();
          arr.push(response);
          setLocationArray(arr);
        }
        setNewLocation("");
      } else {
        setLabelText("Wrong city, please retry");
        setApiError(true);
        setTimeout(() => {
          document
            .querySelector(".Weather-widget-app__settings-add")
            ?.removeAttribute("color");
          setLabelText("Add location");
          setApiError(false);
        }, 5000);
      }
    });
  }

  function changePage(num: number) {
    const index = num * PAGINATION_COUNTER;
    const arr = locationArray.slice(index, index + PAGINATION_COUNTER);
    setCurrentLocationArray(arr);
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
            <Settings
              changeNewLocation={changeNewLocation}
              enter={enter}
              setNewLocation={setNewLocation}
              locationArray={locationArray}
              apiError={apiError}
              labelText={labelText}
              setLocationArray={setLocationArray}
              newLocation={newLocation}
            />
          ) : pagination ? (
            <>
              {currentlocationArray.map((item, index) => (
                <Element key={index} apiResponse={item} />
              ))}
              <nav className="App__pagination-nav">
                {paginationPages.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      changePage(item);
                    }}
                  >
                    {item + 1}
                  </button>
                ))}
              </nav>
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
