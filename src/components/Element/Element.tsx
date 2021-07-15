/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TranslationContext } from '../../utils/tranlationContext';
import { devPoint } from "../../utils/helpers";
import { beaufort, windDirectioon } from "../../utils/consts";
import { ElementProps, ContextProps } from "../../utils/types";
import arrow from "../../assets/arrow.svg";
import bar from "../../assets/barometr.svg";

function Element(props: ElementProps): any {
  const { name, main, weather, wind, sys, visibility } = props.apiResponse;
  const { temp, feels_like, pressure, humidity } = main;
  const { description, icon } = weather[0];
  const { speed, deg } = wind;
  const { country } = sys;
  const translation = React.useContext(TranslationContext);

  return (
    <>
      <h3>{`${name}, ${country}`}</h3>
      <div className="Weather-widget-app__block">
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="img" />
        <h2>{Math.round(temp)}℃</h2>
      </div>
      <section className="Weather-widget-app__block-container">
        <h4>{`Feels like ${Math.round(feels_like)}℃. ${(
          description as string
        ).replace(
          /^./,
          (description as string).charAt(0).toUpperCase()
        )}. ${beaufort(speed as number, translation as ContextProps)}`}</h4>
        <div className="Weather-widget-app__block">
          <img
            className="Weather-widget-app__block-img"
            style={{ transform: `rotate(${deg}deg)` }}
            src={arrow}
            alt="arrow"
          />
          <h5>{` ${speed}м/с, ${windDirectioon(deg as number, translation as ContextProps)}`}</h5>
        </div>
        <div className="Weather-widget-app__block">
          <img
            className="Weather-widget-app__block-img"
            src={bar}
            alt="barometr"
          />
          <h5>{`${pressure}гПа`}</h5>
        </div>
        <div className="Weather-widget-app__block">
          <h5>{`Влажность ${humidity}%`}</h5>
        </div>
        <div className="Weather-widget-app__block">
          <h5>{`Точка росы ${devPoint(feels_like, humidity)}℃`}</h5>
        </div>
        <div className="Weather-widget-app__block">
          <h5>{`Visibility: ${visibility / 1000}км`}</h5>
        </div>
      </section>
    </>
  );
}

export default Element;
