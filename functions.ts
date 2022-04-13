import csv from 'csv-parser';
import fs from 'fs';

import {
  calculatePercentage,
  parsePopulationAndDeathsToNumber,
  sortArrayByState,
} from './utilities';
import { GroupedData, Percentage, RowExcel, StateDetail } from './interfaces';

export const readCsv = (): Promise<RowExcel[]> => {
  const rows: RowExcel[] = [];

  return new Promise((resolve) => {
    fs.createReadStream('time_series_covid19_deaths_US.csv')
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.toLowerCase(),
          mapValues: (row) => parsePopulationAndDeathsToNumber(row),
        })
      )
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
    uid,
    iso2,
    iso3,
    code3,
    fips,
    admin2,
    province_state: state,
    country_region: region,
    lat,
    long_,
    combined_key,
    population,
    ...dates
  } = row;

  const totalDeaths = Object.values(dates).pop() as number;

  return {
    state,
    region,
    population,
    totalDeaths,
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
