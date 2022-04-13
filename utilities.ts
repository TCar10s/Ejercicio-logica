import { GroupedData, StateDetail } from './interfaces';


export const calculatePercentage = (
  totalDeaths: number,
  population: number
): number => {
  if (population === 0) return 0;
  const percentage = ((totalDeaths * 100) / population).toFixed(3);

  return Number(percentage);
};

export const sortArrayByState = (groupedData: GroupedData): StateDetail[] => {
  return Object.entries(groupedData)
    .map(([state, { totalDeaths, population }]) => {
      return {
        state,
        totalDeaths,
        population,
      };
    })
    .sort((a, b) => b.totalDeaths - a.totalDeaths);
};
