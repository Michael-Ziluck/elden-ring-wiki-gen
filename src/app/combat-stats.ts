import { EnemyInfo } from './enemy-info';
import { DamageType } from './damage';
import { InflictedStatusType, ResistedStatusType } from './status';

export type Resistance = Array<Array<number|null>>|null;

export interface CombatStats {
  name: string|EnemyInfo;
  location: string;
  health: Array<number|null>;
  defense: Array<number|null>;
  runes: Array<number|null>;
  stance: number;
  parriable: boolean;
  parriesPerCrit: number;
  critable: boolean;
  optional: boolean;
  multiplayerAllowed: boolean;
  summonsAllowed: boolean;
  inflictedDamageTypes: {[key in DamageType]: boolean},
  inflictedStatusTypes: {[key in InflictedStatusType]: boolean},
  absorptions: {[key in DamageType]: number},
  resistances: {[key in ResistedStatusType]: Resistance};
}
