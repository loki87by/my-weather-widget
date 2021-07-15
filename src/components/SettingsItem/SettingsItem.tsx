import React from "react";
import hamburger from "../../assets/hamburger.svg";
import trash from "../../assets/trash.svg";
import { SettingsItemProps } from "../../utils/types";

function SettingsItem(props: SettingsItemProps): React.ReactElement {
  const { name, sys } = props.apiResponse;
  const { country } = sys;

  function deleteItem(event: React.MouseEvent) {
    const index = event.currentTarget.parentElement?.id.split("-")[1];
    if (index) {
      props.deleteElement(+index);
    }
  }

  return (
    <div
      className="Weather-widget-app__settings-element"
      draggable={props.locationArray.length > 1 ? true : false}
      id={props.id}
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDragEnd={props.onDragEnd}
    >
      <div className="Weather-widget-app__settings-item">
        {props.locationArray.length > 1 ? (
          <img
            className="Weather-widget-app__settings-hamburger"
            src={hamburger}
            alt="drag and drop anchor"
          />
        ) : (
          ""
        )}
        <h5>
          {name}, {country}
        </h5>
      </div>
      {props.locationArray.length > 1 ? (
        <img
          className="Weather-widget-app__settings-close"
          onClick={deleteItem}
          src={trash}
          alt="delete"
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default SettingsItem;
