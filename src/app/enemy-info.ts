/** Information about an enemy from Phil's spreadsheet. */
export interface EnemyInfo {
  /** The full name of the enemy, as it appears in the spreadsheet. */
  name: string;

  /**
   * The 1-based index of this enemy in the `Stats_Data` page of the
   * spreadsheet.
   */
  rowIndex: number;

  /** This enemy's NPC ID. */
  id: number;

  /** The human-friendly name to fill into the name field. */
  friendlyName: string;
}
