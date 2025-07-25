import { sum } from 'lodash';
import { getActiveFestivals } from '@helpers/festival';

export function getExplorationTickMultiplier(): number {
  return sum(
    getActiveFestivals().map((f) => f?.effects?.exploration?.ticks ?? 0),
  );
}
