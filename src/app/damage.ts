export const damageTypes = [
  'standard', 'slash', 'strike', 'pierce', 'magic', 'fire', 'lightning', 'holy'
] as const;

export type DamageType = typeof damageTypes[number];

