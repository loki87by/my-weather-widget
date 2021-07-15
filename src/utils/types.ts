import { Dispatch, SetStateAction } from "react";

export interface Position {
  lat?: number;
  lng?: number;
  city?: string;
}

interface ResponceObjectNumberProps {
  [key: string]: number;
}
interface ResponceObjectMixedProps {
  [key: string]: number | string;
}

export interface ResponceObject {
  name: string;
  main: ResponceObjectNumberProps;
  weather: ResponceObjectMixedProps[];
  wind: ResponceObjectMixedProps;
  sys: ResponceObjectMixedProps;
  visibility: number;
}

export interface ElementProps {
  apiResponse: ResponceObject;
}

export interface SettingsProps {
  changeNewLocation: VoidFunction;
  enter: string;
  setNewLocation: Dispatch<SetStateAction<string>>;
  locationArray: ResponceObject[];
  apiError: boolean;
  labelText: string;
  setLocationArray: Dispatch<SetStateAction<ResponceObject[]>>;
  newLocation: string;
  lang: number;
  setLang: Dispatch<SetStateAction<number>>;
}

export interface SettingsItemProps {
  locationArray: ResponceObject[];
  id: string;
  deleteElement: (num: number) => void;
  apiResponse: ResponceObject;
  onDragStart: (event: React.MouseEvent) => void;
  onDragOver: (event: React.MouseEvent) => void;
  onDragEnd: () => void;
}

export type ContextProps = { 
  [key: string]: string
};
