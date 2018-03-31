/* eslint no-unused-vars: 0 */
const IndexColumn = require('./index-column');
const ColumnReference = require('./column-reference');
const Table = require('./table');
const Column = require('./column');

const utils = require('../../../../shared/utils');

/**
 * Foreign key of a table.
 */
class ForeignKey {

  /**
   * Creates a foreign key from a JSON def.
   *
   * @param {any} json JSON format parsed from SQL.
   * @returns {ForeignKey} Created foreign key.
   */
  static fromDef(json) {
    if (json.id === 'O_CREATE_TABLE_CREATE_DEFINITION') {
      return ForeignKey.fromObject(json.def.foreignKey);
    }

    throw new TypeError(`Unknown json id to build foreign key from: ${json.id}`);
  }

  /**
   * Creates a foreign key from an object containing needed properties.
   * Properties are 'columns', 'reference', and 'name'.
   *
   * @param {any} json Object containing properties.
   * @returns {ForeignKey} Resulting foreign key.
   */
  static fromObject(json) {
    const foreignKey = new ForeignKey();
    foreignKey.columns = json.columns.map(IndexColumn.fromDef);
    foreignKey.reference = ColumnReference.fromDef(json.reference);

    if (json.name)   { foreignKey.name   = json.name; }

    return foreignKey;
  }

  /**
   * ForeignKey constructor.
   */
  constructor() {

    /**
     * @type {string}
     */
    this.name = undefined;

    /**
     * @type {IndexColumn[]}
     */
    this.columns = [];

    /**
     * @type {ColumnReference}
     */
    this.reference = undefined;
  }

  /**
   * JSON casting of this object calls this method.
   *
   * @returns {any} JSON format.
   */
  toJSON() {
    const json = {
      columns: this.columns.map(c => c.toJSON()),
      reference: this.reference.toJSON()
    };

    if (utils.isDefined(this.name))   { json.name   = this.name; }

    return json;
  }

  /**
   * Create a deep clone of this model.
   *
   * @returns {ForeignKey} Clone.
   */
  clone() {
    const key = new ForeignKey();

    key.columns = this.columns.map(c => c.clone());
    key.reference = this.reference.clone();

    if (utils.isDefined(this.name))   { key.name       = this.name; }

    return key;
  }

  /**
   * Push an index column to columns array.
   *
   * @param {IndexColumn} indexColumn Index column to be pushed.
   * @returns {void}
   */
  pushColumn(indexColumn) {
    this.columns.push(indexColumn);
  }

  /**
   * Drops a column from index.
   *
   * @param {string} name Column name to be dropped.
   * @returns {boolean} Whether column was removed.
   */
  dropColumn(name) {
    let pos;
    const found = this.columns.some((c, i) => {
      pos = i;
      return c.column === name;
    });
    if (!found) { return false; }

    const end = this.columns.splice(pos);
    end.shift();
    this.columns = this.columns.concat(end);
    return true;
  }

  /**
   * Get the columns in given table which this foreign key's index columns refer to.
   *
   * @param {Table} table Table in question.
   * @returns {Column[]} Found columns.
   */
  getColumnsFromTable(table) {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    );
  }

  /**
   * Whether the given table has all of this foreign key's owner table columns.
   *
   * @param {Table} table Table in question.
   * @returns {boolean} Test result.
   */
  hasAllColumnsFromTable(table) {
    return table.columns.filter(tableColumn =>
      this.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    ).length === this.columns.length;
  }

  /**
   * Whether the given table has all of this foreign key's referenced table columns.
   *
   * @param {Table} table Referenced table in question.
   * @returns {boolean} Test result.
   */
  hasAllColumnsFromRefTable(table) {
    return table.columns.filter(tableColumn =>
      this.reference.columns.some(indexColumn => indexColumn.column === tableColumn.name)
    ).length === this.reference.columns.length;
  }

  /**
   * Get referenced table by this foreign key, from array
   * of given tables. Returns null if no table was found.
   *
   * @param {Table[]} tables Table array to search.
   * @returns {Table} Table found or null if no such table was found.
   */
  getReferencedTable(tables) {
    return tables.find(t => t.name === this.reference.table) || null;
  }
}

module.exports = ForeignKey;
