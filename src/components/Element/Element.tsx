/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { beaufort, windDirectioon, devPoint } from "../../utils/helpers";
import arrow from "../../assets/arrow.svg";
import bar from "../../assets/barometr.svg";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Element(props: any): any {
  const { name, main, weather, wind, sys, visibility } = props.apiResponse;
  const { temp, feels_like, pressure, humidity } = main;
  const { description, icon } = weather[0];
  const { speed, deg } = wind;
  const { country } = sys;
  // const firstDescriptionSymbol = description.bla.charAt(0).toUpperCase()
  // const camelDescription = description.replace(/^./, firstDescriptionSymbol)

  return (
    <>
      <h3>{`${name}, ${country}`}</h3>
      <div className="Weather-widget-app__subblock">
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="img" />
        <h2>{Math.round(temp)}℃</h2>
      </div>
      <h4>{`Feels like ${Math.round(feels_like)}℃. ${description.replace(/^./, description.charAt(0).toUpperCase())}. ${beaufort(
        speed
      )}`}</h4>
      <div className="Weather-widget-app__block">
        <div className="Weather-widget-app__subblock">
          <img
            className="Weather-widget-app__block-img"
            style={{ transform: `rotate(${deg}deg)` }}
            src={arrow}
            alt="arrow"
          />
          <h5>{` ${speed}м/с, ${windDirectioon(deg)}`}</h5>
        </div>
        <div className="Weather-widget-app__subblock">
          <img
            className="Weather-widget-app__block-img"
            src={bar}
            alt="barometr"
          />
          <h5>{`${pressure}гПа`}</h5>
        </div>
      </div>
      <div className="Weather-widget-app__block">
        <div className="Weather-widget-app__subblock">
          <h5>{`Влажность ${humidity}%`}</h5>
        </div>
        <div className="Weather-widget-app__subblock">
          <h5>{`Точка росы ${devPoint(feels_like, humidity)}℃`}</h5>
        </div>
      </div>
      <div className="Weather-widget-app__block">
        <h5>{`Visibility: ${visibility / 1000}км`}</h5>
      </div>
    </>
  );
}

export default Element;
