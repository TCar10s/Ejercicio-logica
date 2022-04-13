import { groupDataByState, percentageOfDeaths, readCsv } from './functions';

readCsv().then((data) => {
  const groupedData = groupDataByState(data);

  const stateWithMoreDeaths = groupedData[0];
  const stateWithLessDeaths = groupedData[groupedData.length - 1];
  const percentage = percentageOfDeaths(groupedData);

  console.group('→ Muertes por estado:');
  console.info(`  El estado con el mayor acumulado de muertes es ${stateWithMoreDeaths.state} con ${stateWithMoreDeaths.totalDeaths} muertes.` );
  console.info(`  El estado con el menor acumulado de muertes es ${stateWithLessDeaths.state} con ${stateWithLessDeaths.totalDeaths} muertes.`);
  // console.table(groupedData);
  console.groupEnd();

  
  console.group('→ Porcentaje de muertes por estado:');
  console.info(`  El estado con mayor porcentaje de muertes es ${percentage[0].state} con ${percentage[0].percentage}% de muertes.`);
  console.groupEnd();

  console.group('→ Estado mas afectado por covid-19:');
  console.info(`  El estado más afectado fue New Jersey debido a su relacion entre cantidad de muertes 
  y poblacion, es decir, cuenta con el mayor porcentaje de muertes. Ver en la siguiente tabla.`);

  console.table(percentage.slice(0, 5));
  console.log('⚠️ Mostrando 5 de 58 estados ⚠️');
  
  console.groupEnd();
});
