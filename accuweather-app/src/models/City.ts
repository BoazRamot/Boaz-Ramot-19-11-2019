import ICity from "./ICity";

export class City {
  public label: string;
  public value: string;
  public code: string;
  
  constructor(spec: ICity) {
    this.label = spec.label;
    this.value = spec.value;
    this.code = spec.code;
  }
}