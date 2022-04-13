import { IRow } from './interfaces';

export function formatDates([date, value]: [date: any, value: any]) {
  const auxDate = new Date(date);
  const formattedDate = `${auxDate.getDate()}/${
    auxDate.getMonth() + 1
  }/${auxDate.getFullYear()}`;

  return {
    date: formattedDate,
    value: parseInt(value),
  };
}

const getHighestNumberOfDeaths = (deaths: number[]): number =>
  Math.max(...deaths);

export function formatRows(row: any): IRow {
  const {
    UID,
    iso2,
    iso3,
    code3,
    FIPS,
    Admin2,
    Province_State: state,
    Country_Region: region,
    Lat,
    Long_,
    Combined_Key,
    Population: population,
    ...dates
  } = row;

  return {
    state,
    region,
    population: Number(population),
    totalDeaths: getHighestNumberOfDeaths(Object.values(dates)),
  };
}

export const sumListOfNumbers = (list: number[]): number =>
  list.reduce((acc, curr) => acc + curr, 0);