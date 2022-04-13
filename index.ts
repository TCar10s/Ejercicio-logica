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
  // console.log(data
  //   .filter(row => row.state === 'California')
  // );

  // console.log(combineDataByState(data));
  console.log(data);
  
  
  // console.log(combineDataByState(data));
});

function combineDataByState(data: IRow[]) {
  // combine data and sum deaths, population by state
  // for(const item in data) {
  //   const state = data[item].state;
  //   const deaths = data[item].totalDeaths;
  //   const population = data[item].population;
  //   const stateData = data.filter(row => row.state === state);
  //   const deathsSum = sumListOfNumbers(stateData.map(row => row.totalDeaths));
  //   const populationSum = sumListOfNumbers(stateData.map(row => row.population));
  //   const stateDataCombined = {
  //     state,
  //     deaths: deathsSum,
  //     population: populationSum,
  //   };
  //   console.log(stateDataCombined);
  // }
}



// function groupSubDataByState(data: Row[]) {
//   const groupedData: { [key: string]: Row[] } = {};

//   data.forEach((row) => {
//     const { state } = row;
//     if (!groupedData[state]) {
//       groupedData[state] = [];
//     }
//     groupedData[state].push(row);
//   });

//   return groupedData;
// }

// function combineDataByState(data: IRow[]) {
//   const groupedData: { [key: string]: IRow[] } = {};

//   data.forEach((row) => {
//     const { state } = row;
//     if (!groupedData[state]) {
//       groupedData[state] = [];
//     }
//     groupedData[state].push(row);
//   });

//   return groupedData;
// }

// function stateWithHighestDeaths(data: Row[]) {
//   const stateWithHighestDeaths = data
//     .sort((a, b) => b.dates[b.dates.length - 1].value - a.dates[a.dates.length - 1].value)
//     .map((row) => row.state)
//     .slice(0, 1);

//   return stateWithHighestDeaths;
// }

// function stateWithFewestDeaths(data: Row[]) {
//   const stateWithFewestDeaths = data
//     .sort((a, b) => a.dates[a.dates.length - 1].value - b.dates[b.dates.length - 1].value)
//     .map((row) => row.state)
//     .slice(0, 1);

//   return stateWithFewestDeaths;
// }
