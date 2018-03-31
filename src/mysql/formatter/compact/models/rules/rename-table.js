/* eslint no-unused-vars: 0 */
const Table = require('../table');
const Database = require('../database');

/**
 * Formatter for P_RENAME_TABLE rule's parsed JSON.
 */
class RenameTable {

  /**
   * RenameTable constructor.
   */
  constructor() {

    /**
     * @type {Database}
     */
    this.database = undefined;
  }

  /**
   * Get table with given name.
   *
   * @param {string} name Table name.
   * @returns {Table} Table result.
   */
  getTable(name) {
    return this.database.getTable(name);
  }

  /**
   * Setter for database.
   *
   * @param {Database} database Database instance.
   * @returns {void}
   */
  setDatabase(database) {
    this.database = database;
  }

  /**
   * Renames one of the tables.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {void}
   */
  handleDef(json) {
    if (json.id !== 'P_RENAME_TABLE') {
      throw new TypeError(`Expected P_RENAME_TABLE rule to be handled but received ${json.id}`);
    }

    const table = this.tables.find(t => t.name === json.def.table);

    // TODO: rename foreign key references.

    if (!table) {
      // throw new Error(`Found "RENAME TABLE" statement for an unexisting table ${json.def.table}`);
      return;
    }

    table.name = json.def.newName;
  }
}

module.exports = RenameTable;
