export interface RowExcel {
  state: string;
  region: string;
  population: number;
  totalDeaths: number;
}

export interface GroupedData {
  [key: string]: {
    totalDeaths: number;
    population: number;
  };
}

export interface Percentage {
  state: string;
  percentage: number;
}

export interface StateDetail {
  state: string;
  totalDeaths: number;
  population: number;
}