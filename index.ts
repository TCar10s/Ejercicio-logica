import csv from 'csv-parser';
import fs from 'fs';

import { IRow } from './interfaces';
import { formatRows, groupDataByState } from './utilities';

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
  console.log(groupedData);
});