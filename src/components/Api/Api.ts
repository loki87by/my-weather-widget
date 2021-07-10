import { Position } from "../../utils/types";

export default class Weather {
  baseUrl: string;
  key: string;
  param: Position;

  constructor(param: Position) {
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    this.key = "b91d3843eaeb709975d89c9061d73042";
    this.param = param;
  }

  getWeather<T>(): Promise<T> {
    let url: string;
    if (this.param.city) {
      url = `${this.baseUrl}q=${this.param.city}&appid=${this.key}&units=metric&lang=ru`;
    } else {
      url = `${this.baseUrl}lat=${this.param.lat}&lon=${this.param.lng}&appid=${this.key}&units=metric&lang=ru`;
    }

    return fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((e) => {
        return e;
      });
  }
}
