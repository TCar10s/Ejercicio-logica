import { IGroupedData, IPercentage, IRow } from './interfaces';

export const getTheLastRecordOfList = (deaths: number[]): number => {
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

export const groupDataByState = (row: IRow[]) => {
  const groupedData = row.reduce((acc, curr) => {
    const { state, totalDeaths, population } = curr;

    if (acc[state]) {
      acc[state].totalDeaths += totalDeaths;
      acc[state].population += population;
    } else {
      acc[state] = { totalDeaths, population };
    }

    return acc;
  }, {} as IGroupedData);

  return groupedData;
};

export const getStateWithTheHighestAccumulated = (array: IGroupedData) => {
  const { state, totalDeaths } = Object.entries(array).reduce(
    (acc, curr) => {
      const [key, value] = curr;

      if (value.totalDeaths > acc.totalDeaths) {
        return { state: key, totalDeaths: value.totalDeaths };
      }

      return acc;
    },
    { state: '', totalDeaths: 0 }
  );

  return { state, totalDeaths };
};

export const getStateWithTheLowestAccumulated = (array: IGroupedData) => {
  const { state, totalDeaths } = Object.entries(array).reduce(
    (acc, curr) => {
      const [key, value] = curr;

      if (value.totalDeaths <= acc.totalDeaths) {
        return { state: key, totalDeaths: value.totalDeaths };
      }

      return acc;
    },
    { state: '', totalDeaths: 0 }
  );

  return { state, totalDeaths };
};

export const percentageOfDeaths = (row: IGroupedData) => {
  const percentage = Object.entries(row).reduce((acc, curr) => {
    const [key, value] = curr;

    const percentage = calculatePercentage(value.totalDeaths, value.population);

    acc.push({ state: key, percentage });

    return acc;
  }, [] as IPercentage[]);

  return percentage.sort((a, b) => b.percentage - a.percentage);
};

const calculatePercentage = (totalDeaths: number, population: number): number => {
  if (population === 0) return 0;
  const percentage = ((totalDeaths * 100) / population).toFixed(3);

  return Number(percentage);
};
