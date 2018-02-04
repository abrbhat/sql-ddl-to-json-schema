/** =============================================================
 * List of keywords
 *
 * Keywords are case insensitive and prepended with 'K_'.
 */

const utils = require('../shared/utils');

const keywords = utils.stringArrayToMapping(
  [
    'STATS_SAMPLE_PAGES',
    'GEOMETRYCOLLECTION',
    'STATS_AUTO_RECALC',
    'STATS_PERSISTENT',
    'MULTILINESTRING',
    'DELAY_KEY_WRITE',
    'KEY_BLOCK_SIZE',
    'AVG_ROW_LENGTH',
    'AUTO_INCREMENT',
    'INSERT_METHOD',
    'COLUMN_FORMAT',
    'SUBPARTITION',
    'MULTIPOLYGON',
    'COMPRESSION',
    'TABLESPACE',
    'ROW_FORMAT',
    'REFERENCES',
    'PARTITIONS',
    'MULTIPOINT',
    'MEDIUMTEXT',
    'MEDIUMBLOB',
    'LINESTRING',
    'ENCRYPTION',
    'CONSTRAINT',
    'CONNECTION',
    'COMPRESSED',
    'VARBINARY',
    'TIMESTAMP',
    'TEMPORARY',
    'REDUNDANT',
    'PARTITION',
    'PACK_KEYS',
    'MEDIUMINT',
    'GENERATED',
    'DIRECTORY',
    'CHARACTER',
    'ALGORITHM',
    'TINYTEXT',
    'TINYBLOB',
    'SMALLINT',
    'RESTRICT',
    'PASSWORD',
    'MIN_ROWS',
    'MAXVALUE',
    'MAX_ROWS',
    'LONGTEXT',
    'LONGBLOB',
    'GEOMETRY',
    'FULLTEXT',
    'DATETIME',
    'DATABASE',
    'CHECKSUM',
    'VIRTUAL',
    'VARCHAR',
    'TINYINT',
    'STORAGE',
    'SPATIAL',
    'PRIMARY',
    'POLYGON',
    'PARTIAL',
    'NUMERIC',
    'INTEGER',
    'DYNAMIC',
    'DEFAULT',
    'DECIMAL',
    'COMPACT',
    'COMMENT',
    'COLUMNS',
    'COLLATE',
    'CASCADE',
    'VALUES',
    'UPDATE',
    'UNIQUE',
    'STORED',
    'SIMPLE',
    'SELECT',
    'SCHEMA',
    'RENAME',
    'PARSER',
    'MEMORY',
    'LINEAR',
    'EXISTS',
    'ENGINE',
    'DOUBLE',
    'DELETE',
    'CREATE',
    'BINARY',
    'BIGINT',
    'ALWAYS',
    'ACTION',
    'USING',
    'UNION',
    'TABLE',
    'RANGE',
    'POINT',
    'MATCH',
    'INDEX',
    'FLOAT',
    'FIXED',
    'CHECK',
    'BTREE',
    'ALTER',
    'YEAR',
    'WITH',
    'VIEW',
    'TIME',
    'THAN',
    'TEXT',
    'NULL',
    'LIST',
    'LESS',
    'JSON',
    'HASH',
    'FULL',
    'ENUM',
    'DROP',
    'DISK',
    'DESC',
    'DATE',
    'DATA',
    'CHAR',
    'BLOB',
    'SET',
    'NOT',
    'KEY',
    'INT',
    'BIT',
    'ASC',
    'ON',
    'NO',
    'IN',
    'IF',
    'BY',
    'AS',
  ],

  /*
   * Prepend K_ to keywords.
   */
  string => `K_${string}`,

  /*
   * Make case insensitive regexp from a keyword.
   * Example: WORD -> /[Ww][Oo][Rr][Dd]/
   */
  string => new RegExp(
    string.split('')
      .reduce((str, char) => {
        str += `[${char.toUpperCase()}${char.toLowerCase()}]`;
        return str;
      }, '')
  )
);

module.exports = keywords;
