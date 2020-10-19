import format from './format';
import moment from 'moment';

function usStats(data) {
  return parseStats(data.data[0]);
}

function stateStats(state, data) {
  const stateRawData = data.data.find((d) => d.State === state);
  console.log(stateRawData);

  return parseStats(stateRawData);
}

function parseStats(rawStats) {
  return {
    idNation: format.string(rawStats["ID Nation"]),
    nation: format.string(rawStats.Nation),
    idYear: format.string(rawStats["ID Year"]),
    year: rawStats.Year,
    population: format.number(rawStats.Population),
    slugNation: format.string(rawStats["Slug Nation"])
  };
}

export default {
  usStats,
  stateStats,
};
