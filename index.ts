import { groupDataByState, percentageOfDeaths, readCsv } from './functions';

readCsv().then((data) => {
  const groupedData = groupDataByState(data);

  const stateWithMoreDeaths = groupedData[0];
  const stateWithLessDeaths = groupedData[groupedData.length - 1];

  console.group('Muertes por estado:');

  console.log(
    `El estado con el mayor acumulado de muertes es ${stateWithMoreDeaths.state} con ${stateWithMoreDeaths.totalDeaths} muertes`
  );

  console.log(
    `El estado con el menor acumulado de muertes es ${stateWithLessDeaths.state} con ${stateWithLessDeaths.totalDeaths} muertes`
  );

  console.table(groupedData);
  console.groupEnd();

  const percentage = percentageOfDeaths(groupedData);

  console.group('Porcentaje de muertes por estado:');
  console.table(percentage);
  console.groupEnd();
});
