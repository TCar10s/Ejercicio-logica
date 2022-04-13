import csv from 'csv-parser';
import fs from 'fs';

import { IRow } from './interfaces';
import {
  formatRows,
  getStateWithTheHighestAccumulated,
  getStateWithTheLowestAccumulated,
  groupDataByState,
  percentageOfDeaths,
} from './utilities';

const readCsv = (): Promise<IRow[]> => {
  const rows: IRow[] = [];

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

readCsv().then((data) => {
  const groupedData = groupDataByState(data);

  const lowestAccumulated = getStateWithTheLowestAccumulated(groupedData);
  const highestAccumulated = getStateWithTheHighestAccumulated(groupedData);

  console.log(
    `El estado con el mayor acumulado de muertes es ${highestAccumulated.state} con ${highestAccumulated.totalDeaths} muertes`
  );

  console.log(
    `El estado con el menor acumulado de muertes es ${lowestAccumulated.state} con ${lowestAccumulated.totalDeaths} muertes`
  );

  console.log(groupedData);
  

  console.log(`El porcentaje de muertes en cada estado es:`);
  console.table(percentageOfDeaths(groupedData));
});

// Percentage of deaths vs. total population by state


