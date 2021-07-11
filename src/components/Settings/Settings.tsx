/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import hamburger from "../../assets/hamburger.svg";
import trash from "../../assets/trash.svg";

function Settings(props: any): any {
  const { name, sys } = props.apiResponse;
  const { country } = sys;
  function deleteItem(event: React.MouseEvent) {
    const index = event.currentTarget.parentElement?.id.split('-')[1]
    console.log(index)
    props.deleteElement(index)
  }

  return (
    <div className="Weather-widget-app__settings-element" id={props.id}>
    <div className="Weather-widget-app__settings-item">
    <img className="Weather-widget-app__settings-hamburger" src={hamburger} alt='drag and drop anchor' />
      <h5>
        {name}, {country}
      </h5>
      </div>
      {props.locationArray.length > 1 ?
    <img className="Weather-widget-app__settings-close" onClick={deleteItem} src={trash} alt='delete' />
    : ''}
    </div>
  );
}

export default Settings;
