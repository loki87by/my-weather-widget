import React from "react";
import SettingsItem from "../SettingsItem/SettingsItem";
import {
  getNextElement,
  itemsIdArray,
  localSaveData,
} from "../../utils/helpers";
import { SettingsProps, ResponceObject } from "../../utils/types";
import { PAGINATION_SETTINGS_COUNTER } from "../../utils/consts";
import { paginationPagesArray } from "../../utils/helpers";
import { TranslationContext } from "../../utils/tranlationContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Settings(props: SettingsProps): any {
  const translation = React.useContext(TranslationContext);
  const [currentPaginationPage, setCurrentPaginationPage] = React.useState(0);
  const [pagination, setPagination] = React.useState(false);

  const [currentSettingsArray, setCurrentSettingsArray] = React.useState<
    ResponceObject[]
  >(
    props.locationArray.slice(
      0,
      PAGINATION_SETTINGS_COUNTER
    ) as ResponceObject[]
  );
  const [paginationPages, setPaginationPages] = React.useState([] as number[]);
  const [isDropped, setDropped] = React.useState(false);
  const [draggedElement, setDraggedElement] = React.useState(
    document.querySelector(".Weather-widget-app")
  );

  React.useEffect(() => {
    if (props.locationArray.length > PAGINATION_SETTINGS_COUNTER) {
      if (!pagination) {
        setPagination(true);
      }
      const pages = paginationPagesArray(
        props.locationArray.length,
        PAGINATION_SETTINGS_COUNTER
      );
      setPaginationPages(pages);
      const index = currentPaginationPage * PAGINATION_SETTINGS_COUNTER;
      const currentArray = props.locationArray.slice(
        index,
        index + PAGINATION_SETTINGS_COUNTER
      );
      setCurrentSettingsArray(currentArray as ResponceObject[]);
    }
  }, [pagination, props.locationArray, currentPaginationPage]);

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
  }

  function dropElement() {
    setDropped(true);
  }

  React.useEffect(() => {
    if (isDropped) {
      const arrayPages = [];
      for (
        let i = 0;
        i < Math.ceil(props.locationArray.length / PAGINATION_SETTINGS_COUNTER);
        i++
      ) {
        arrayPages.push(
          props.locationArray.slice(
            i * PAGINATION_SETTINGS_COUNTER,
            (i + 1) * PAGINATION_SETTINGS_COUNTER
          )
        );
      }
      const idArray = itemsIdArray(arrayPages[currentPaginationPage]);
      const updatedLocationArray = [];
      for (let i = 0; i < arrayPages.length; i++) {
        if (i === currentPaginationPage) {
          updatedLocationArray.push(...idArray);
        } else {
          updatedLocationArray.push(...arrayPages[i]);
        }
      }
      props.setLocationArray(updatedLocationArray);
      localSaveData(updatedLocationArray);
      setDropped(false);
    }
  }, [isDropped, props, currentPaginationPage]);

  function inputNewLocation(event: React.FormEvent<HTMLInputElement>) {
    props.setNewLocation((event.target as HTMLInputElement).value);
  }

  function deleteElement(num: number) {
    const filteredArray = props.locationArray
      .map((it: ResponceObject, ind: number) => {
        if (ind !== +num) {
          return it;
        }
      })
      .filter((i: ResponceObject | undefined) => i !== undefined);
    props.setLocationArray(filteredArray as ResponceObject[]);
    localSaveData(filteredArray as ResponceObject[]);
  }

  function changePage(num: number) {
    setCurrentPaginationPage(num);
    const index = num * PAGINATION_SETTINGS_COUNTER;
    const currentArray = props.locationArray.slice(
      index,
      index + PAGINATION_SETTINGS_COUNTER
    );
    setCurrentSettingsArray(currentArray as ResponceObject[]);
  }

  return (
    <>
      <h4>Settings</h4>
      <section className="Weather-widget-app__settings-container">
        {currentSettingsArray.map((item: ResponceObject, index: number) => (
          <SettingsItem
            key={index}
            locationArray={props.locationArray}
            id={`item-${index}`}
            deleteElement={deleteElement}
            apiResponse={item}
            onDragStart={grabElement}
            onDragOver={dragElement}
            onDragEnd={dropElement}
          />
        ))}
      </section>
      {pagination ? (
        <nav className="Weather-widget-app__pagination-nav">
          {paginationPages.map((item, index) => (
            <button
              key={index}
              className={`Weather-widget-app__pagination-button ${
                currentPaginationPage === index &&
                "Weather-widget-app__pagination-button_active"
              }`}
              onClick={() => {
                changePage(item);
              }}
            >
              {item + 1}
            </button>
          ))}
        </nav>
      ) : (
        ""
      )}
      <div className="Weather-widget-app__settings-lang">
        <h4>{translation.chooseLang}</h4>
        <button disabled={props.lang === 0 ? true : false} className={`Weather-widget-app__settings-lang-button ${props.lang === 0 && "Weather-widget-app__settings-lang-button_disabled"}`}>EN</button>
        <button disabled={props.lang === 1 ? true : false} className={`Weather-widget-app__settings-lang-button ${props.lang === 1 && "Weather-widget-app__settings-lang-button_disabled"}`}>RU</button>
      </div>
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
