export const statusTypes = [
  'poison', 'scarletRot', 'hemorrhage', 'frostbite', 'sleep', 'madness',
  'deathBlight',
] as const;

export const inflictedStatusTypes =
    ['poison', 'scarletRot', 'hemorrhage', 'frostbite', 'deathBlight'] as const;

export const resistedStatusTypes = [
  'poison', 'scarletRot', 'hemorrhage', 'frostbite', 'sleep', 'madness'
] as const;

export type StatusType = typeof statusTypes[number];

export type InflictedStatusType = typeof inflictedStatusTypes[number];

export type ResistedStatusType = typeof resistedStatusTypes[number];
