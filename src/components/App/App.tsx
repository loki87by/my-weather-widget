import React from "react";
import {
  TranslationContext,
  translations,
} from "../../utils/tranlationContext";
import Weather from "../Api/Api";
import Element from "../Element/Element";
import Settings from "../Settings/Settings";
import { Position, ResponceObject } from "../../utils/types";
import { paginationPagesArray, localSaveData } from "../../utils/helpers";
import { PAGINATION_COUNTER } from "../../utils/consts";
import settings from "../../assets/settings.svg";
import enter from "../../assets/enter-arrow.svg";
import "../../index.css";

function App(): React.ReactElement {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSettings, setSettings] = React.useState(false);
  const [apiError, setApiError] = React.useState(false);
  const [pagination, setPagination] = React.useState(false);
  const [activePaginationButton, setActivePaginationButton] = React.useState(0);
  const [locationArray, setLocationArray] = React.useState<ResponceObject[]>(
    []
  );
  const [currentLocationArray, setCurrentLocationArray] = React.useState<
    ResponceObject[]
  >(locationArray.slice(0, PAGINATION_COUNTER) as ResponceObject[]);
  const [paginationPages, setPaginationPages] = React.useState([] as number[]);
  const [newLocation, setNewLocation] = React.useState("");
  const [lang, setLang] = React.useState(0);
  const [labelText, setLabelText] = React.useState("Add location");
  const geo = navigator.geolocation;
  const localData = localStorage.getItem("weather-widget-data");

  React.useEffect(() => {
    if (!localData) {
      let pos = {};
      if (geo) {
        geo.getCurrentPosition((position: GeolocationPosition) => {
          pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            lang: "en",
          };
          const api = new Weather(pos as Position);
          Promise.resolve(api.getWeather()).then((response) => {
            setIsLoading(true);
            const responseArray = [];
            responseArray.push(response);
            localSaveData(responseArray as ResponceObject[]);
          });
        });
      }
    } else {
      const weatherData = JSON.parse(localData);
      const cyrillicData = weatherData.some((item: ResponceObject) => {
        return /[а-яА-ЯёЁ]/.test(item.name);
      });
      if (cyrillicData) {
        setLang(1);
      }
      setCurrentLocationArray(
        weatherData.slice(
          PAGINATION_COUNTER * activePaginationButton,
          PAGINATION_COUNTER * (activePaginationButton + 1)
        ) as ResponceObject[]
      );
      setIsLoading(true);
    }
  }, [geo, localData, activePaginationButton]);

  React.useEffect(() => {
    if (localData) {
      const weatherData = JSON.parse(localData);
      if (weatherData.length > PAGINATION_COUNTER) {
        if (!pagination) {
          setPagination(true);
        }
        const pages = paginationPagesArray(
          weatherData.length,
          PAGINATION_COUNTER
        );
        setPaginationPages(pages);
      } else {
        setPagination(false);
      }
    }
  }, [localData, pagination]);

  function toogleSettings() {
    const reverse = !isSettings;
    setSettings(reverse);
  }

  function changeNewLocation() {
    const obj: Position = {};
    obj.city = newLocation;
    let language = "";
    if (lang === 0) {
      language = "en";
    }
    if (lang === 1) {
      language = "ru";
    }
    obj.lang = language;
    const api = new Weather(obj);
    Promise.resolve(api.getWeather()).then((response) => {
      if (response) {
        const { name } = response as ResponceObject;
        setIsLoading(true);
        if (!locationArray.some((i) => i.name === name)) {
          const responseArray = locationArray.slice();
          responseArray.push(response as ResponceObject);
          localSaveData(responseArray);
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
    const currentArray = locationArray.slice(index, index + PAGINATION_COUNTER);
    setCurrentLocationArray(currentArray as ResponceObject[]);
    setActivePaginationButton(num);
  }

  function changeLanguage() {
    let language = "";
    if (lang === 0) {
      setLang(1);
      language = "ru";
    } else {
      setLang(0);
      language = "en";
    }
    if (localData) {
      const weatherData = JSON.parse(localData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arr: Promise<any>[] = [];
      weatherData.forEach((item: ResponceObject) => {
        const obj: Position = item.coord;
        obj.lang = language;
        const api = new Weather(obj);
        const promise = api.getWeather();
        arr.push(promise);
      });
      Promise.all(arr).then((res) => {
        localSaveData(res);
      });
    }
  }

  React.useEffect(() => {
    if (localData) {
      const oldData = JSON.stringify(locationArray);
      if (oldData !== localData) {
        const weatherData = JSON.parse(localData);
        setLocationArray(weatherData);
      }
    }
  }, [localData, locationArray]);

  // uncomment next lines after prod
  /* const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://blablabla2.netlify.app/main.css')
  document.head.appendChild(link) */

  return (
    <div className="Weather-widget-app">
      <TranslationContext.Provider value={translations[lang]}>
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
                lang={lang}
                changeLanguage={changeLanguage}
              />
            ) : pagination ? (
              <>
                {currentLocationArray.map((item, index) => (
                  <Element key={index} apiResponse={item} />
                ))}
                <nav className="Weather-widget-app__pagination-nav">
                  {paginationPages.map((item, index) => (
                    <button
                      key={index}
                      className={`Weather-widget-app__pagination-button ${
                        activePaginationButton === index &&
                        "Weather-widget-app-button_active"
                      }`}
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
      </TranslationContext.Provider>
    </div>
  );
}

export default App;
