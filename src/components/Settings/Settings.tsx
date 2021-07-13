/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SettingsItem from "../SettingsItem/SettingsItem";
import { getNextElement, itemsIdArray } from "../../utils/helpers";

function Settings(props: any): any {
  const [draggedElement, setDraggedElement] = React.useState(
    document.querySelector(".Weather-widget-app")
  );

  function enterInput(event: React.KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.key === "Enter") {
      props.changeNewLocation();
    }
  }

  function grabElement(event: React.MouseEvent) {
    const targetElement = (event.target as HTMLHtmlElement).parentElement
      ?.parentElement;
    setDraggedElement(targetElement as HTMLHtmlElement);
  }

  function dragElement(event: React.MouseEvent) {
    event.preventDefault();
    const currentElement = event.target;
    const isMoveable =
      draggedElement?.id !== (currentElement as HTMLElement).id &&
      (currentElement as HTMLElement).classList.contains(
        "Weather-widget-app__settings-element"
      );
    if (!isMoveable) {
      return;
    }
    const nextElement = getNextElement(
      event.clientY,
      currentElement as HTMLHtmlElement
    );
    if (
      (nextElement && draggedElement === nextElement.previousElementSibling) ||
      draggedElement === nextElement
    ) {
      return;
    }
    document
      .querySelector(".Weather-widget-app__settings-container")
      ?.insertBefore(
        draggedElement as HTMLHtmlElement,
        nextElement as HTMLHtmlElement
      );
    const settingsItemsList = Array.from(
      document.querySelectorAll(".Weather-widget-app__settings-element")
    );
    const idArray = itemsIdArray(settingsItemsList, props.locationArray);
    props.setLocationArray(idArray);
  }

  function inputNewLocation(event: React.FormEvent<HTMLInputElement>) {
    props.setNewLocation((event.target as HTMLInputElement).value);
  }

  function deleteElement(num: number) {
    const filetredArray = props.locationArray
      .map((it: any, ind: number) => {
        if (ind !== +num) {
          return it;
        }
      })
      .filter((i: any) => i !== undefined);
    props.setLocationArray(filetredArray);
  }

  return (
    <>
      <h4>Settings</h4>
      <section className="Weather-widget-app__settings-container">
        {props.locationArray.map((item: any, index: number) => (
          <SettingsItem
            key={index}
            locationArray={props.locationArray}
            id={`item-${index}`}
            deleteElement={deleteElement}
            apiResponse={item}
            onDragStart={grabElement}
            onDragOver={dragElement}
          />
        ))}
      </section>
      <h4
        className="Weather-widget-app__settings-add"
        style={{ color: props.apiError ? "red" : "" }}
      >
        {props.labelText}
      </h4>
      <div className="Weather-widget-app__settings-form">
        <input
          className="Weather-widget-app__settings-input"
          type="text"
          onInput={inputNewLocation}
          onKeyUp={enterInput}
          value={props.newLocation}
        />
        <img
          className="Weather-widget-app__settings-submit"
          src={props.enter}
          alt="confirm"
          onClick={props.changeNewLocation}
        />
      </div>
    </>
  );
}

export default Settings;
