import { EnemyInfo } from './enemy-info';

export type Resistance = Array<Array<number|null>>|null;

export interface CombatStats {
  name: string|EnemyInfo;
  health: Array<number|null>;
  defense: Array<number|null>;
  runes: Array<number|null>;
  stance: number;
  parriable: boolean;
  parriesPerCrit: number;
  critable: boolean;
  damageTypes: {
    standard: boolean,
    slash: boolean,
    strike: boolean,
    pierce: boolean,
    magic: boolean,
    fire: boolean,
    lightning: boolean,
    holy: boolean,
  },
  statusTypes: {
    poison: boolean,
    scarletRot: boolean,
    hemorrhage: boolean,
    frostbite: boolean,
    deathBlight: boolean,
  },
  absorptions: {
    physical: {
      standard: number,
      slash: number,
      strike: number,
      pierce: number,
    },
    magic: {
      magic: number,
      fire: number,
      lightning: number,
      holy: number,
    },
  };
  resistances: {
    poison: Resistance,
    scarletRot: Resistance,
    hemorrhage: Resistance,
    frostbite: Resistance,
    sleep: Resistance,
    madness: Resistance,
  };
}
