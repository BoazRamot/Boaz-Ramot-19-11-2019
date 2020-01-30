export class DayForecasts {
  public temperatureFahrenheit: number;
  public temperatureCelsius: string;
  public weatherIcon: number;
  public weatherText: string;
  public date: string;
  public cityName?: string;
  public cityCode?: string;
  public lat?: number;
  public lng?: number;
  
  constructor(spec: any, isCurrent: boolean = false, _cityName?: string, _cityCode?: string, _lat?: number, _lng?: number) {
    this.temperatureFahrenheit = isCurrent ? (spec.Temperature.Imperial.Value) : ((spec.Temperature.Maximum.Value + spec.Temperature.Minimum.Value)/2);
    this.temperatureCelsius = isCurrent ? (spec.Temperature.Metric.Value) : ((((this.temperatureFahrenheit - 32) * 5) / 9).toFixed(2));
    this.weatherIcon = isCurrent ? (spec.WeatherIcon >= 10 ? spec.WeatherIcon : "0" + spec.WeatherIcon) : (spec.Day.Icon >= 10 ? spec.Day.Icon : "0" + spec.Day.Icon);
    this.weatherText = isCurrent ? spec.WeatherText : spec.Day.IconPhrase;
    this.date = isCurrent ? spec.LocalObservationDateTime : spec.Date;
    this.cityName = isCurrent ? _cityName : "";
    this.cityCode = isCurrent ? _cityCode : "";
    this.lat = isCurrent ? _lat : 0;
    this.lng = isCurrent ? _lng : 0;
  }
}