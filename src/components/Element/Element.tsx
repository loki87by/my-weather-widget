/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { beaufort, windDirectioon, devPoint } from "../../utils/helpers";
import arrow from "../../arrow.svg";
import bar from "../../barometr.svg";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Element(props: any): any {
  const { name, main, weather, wind, sys, visibility } = props.currentLocation;
  const { feels_like, pressure, humidity } = main;
  const { description, icon } = weather[0];
  const { speed, deg } = wind;
  const { country } = sys;

  return (
    <div className="Weather-widget-app">
      <h2>{`${name}, ${country}`}</h2>
      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="img" />
      <h3>{`Feels like ${Math.round(feels_like)}℃. ${description}. ${beaufort(
        speed
      )}`}</h3>
      <div className="Weather-widget-app__block">
        <div className="Weather-widget-app__subblock">
          <img
            className="Weather-widget-app__block-img"
            style={{ transform: `rotate(${deg}deg)` }}
            src={arrow}
            alt="arrow"
          />
          <h4>{` ${speed}м/с, ${windDirectioon(deg)}`}</h4>
        </div>
        <div className="Weather-widget-app__subblock">
          <img
            className="Weather-widget-app__block-img"
            src={bar}
            alt="barometr"
          />
          <h4>{`${pressure}гПа`}</h4>
        </div>
      </div>
      <div className="Weather-widget-app__block">
        <div className="Weather-widget-app__subblock">
          <h4>{`Влажность ${humidity}%`}</h4>
        </div>
        <div className="Weather-widget-app__subblock">
          <h4>{`Точка росы ${devPoint(feels_like, humidity)}℃`}</h4>
        </div>
      </div>
      <div className="Weather-widget-app__block">
        <h4>{`Visibility: ${visibility / 1000}км`}</h4>
      </div>
    </div>
  );
}

export default Element;
