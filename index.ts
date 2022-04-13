import csv from 'csv-parser';
import fs from 'fs';

import { IRow } from './interfaces';
import { formatRows, sumListOfNumbers } from './utilities';

const readCsv = (): Promise<IRow[]> => {
  const data: IRow[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('time_series_covid19_deaths_US.csv')
      .pipe(csv())
      .on('data', (row) => {
        data.push(formatRows(row));
      })
      .on('end', () => {
        resolve(data);
      });
  });
};

readCsv().then((data) => {
  const groupedData = groupDataByState(data);
  console.log(groupedData);
});

function groupDataByState(data: any[]) {
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
}
