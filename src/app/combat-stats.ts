export interface CombatStats {
  name: string;
  health: number;
  poise: number;
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
    poison: number|null,
    scarletRot: number,
    hemorrhage: number,
    frostbite: number,
    sleep: number,
    madness: number,
    scarletRotImmune: boolean,
    hemorrhageImmune: boolean,
    frostbiteImmune: boolean,
    sleepImmune: boolean,
    madnessImmune: boolean,
  };
}
