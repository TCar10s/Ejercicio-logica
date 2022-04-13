import csv from 'csv-parser';
import fs from 'fs';

import { GroupedData, Percentage, RowExcel, StateDetail } from './interfaces';
import { calculatePercentage, sortArrayByState } from './utilities';

export const readCsv = (): Promise<RowExcel[]> => {
  const rows: RowExcel[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('time_series_covid19_deaths_US.csv')
      .pipe(csv())
      .on('data', (row) => {
        rows.push(formatRows(row));
      })
      .on('end', () => {
        resolve(rows);
      });
  });
};

const formatRows = (row: any): RowExcel => {
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

  const numberOfdeaths = Object.values<number>(dates);

  return {
    state,
    region,
    population: Number(population),
    totalDeaths: Number(numberOfdeaths[numberOfdeaths.length - 1]),
  };
};

export const groupDataByState = (rows: RowExcel[]): StateDetail[] => {
  const groupedData = rows.reduce((acc, curr) => {
    const { state, totalDeaths, population } = curr;

    if (acc[state]) {
      acc[state].totalDeaths += totalDeaths;
      acc[state].population += population;
    } else {
      acc[state] = { totalDeaths, population };
    }

    return acc;
  }, {} as GroupedData);

  return sortArrayByState(groupedData);
};

export const percentageOfDeaths = (stateDetails: StateDetail[]) => {
  const percentage = stateDetails.reduce((acc, curr) => {
    const { population, state, totalDeaths } = curr;

    const percentage = calculatePercentage(totalDeaths, population);

    acc.push({ state: state, percentage });

    return acc;
  }, [] as Percentage[]);

  return percentage.sort((a, b) => b.percentage - a.percentage);
};
