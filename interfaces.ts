export interface IRow {
  state: string;
  region: string;
  population: number;
  totalDeaths: number;
}

export interface IGroupedData {
  [key: string]: {
    totalDeaths: number;
    population: number;
  };
}

export interface IPercentage {
  state: string;
  percentage: number;
}
