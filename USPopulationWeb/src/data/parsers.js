import format from './format';
import moment from 'moment';

function usStats(data) {
  return parseStats(data.data[0]);
}

function stateStats(state, data) {
  const stateRawData = data.find((d) => d.state === state);

  return parseStats(stateRawData);
}

function parseStats(rawStats) {
  return {
    idNation: rawStats["ID Nation"],
    nation: rawStats.Nation,
    idYear: rawStats["ID Year"],
    year: rawStats.Year,
    population: format.number(rawStats.Population),
    slugNation: rawStats["Slug Nation"]
  };
}

export default {
  usStats,
  stateStats,
};
