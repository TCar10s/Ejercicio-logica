import { IRow } from './interfaces';

const getTheLastRecordOfList = (deaths: number[]): number => {
  return Number(deaths[deaths.length - 1]);
};

export const formatRows = (row: any): IRow => {
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

  const deaths = Object.values<number>(dates);

  return {
    state,
    region,
    population: Number(population),
    totalDeaths: getTheLastRecordOfList(deaths),
  };
};

export const groupDataByState = (data: any[]) => {
  const groupedData = data.reduce((acc, curr) => {
    const { state, totalDeaths, population } = curr;

    if (acc[state]) {
      acc[state].totalDeaths += totalDeaths;
      acc[state].population += population;
    } else {
      acc[state] = { totalDeaths, population };
    }

    return acc;
  }, {});

  return groupedData;
};
