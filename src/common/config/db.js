'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: process.env['MYSQL_HOSTNAME'] || '127.0.0.1',
      port: '',
      database: process.env['MYSQL_DATABASE'] || 'navigation',
      user: process.env['MYSQL_USER'] || 'root',
      password: process.env['MYSQL_PASSWORD'] || 'root',
      prefix: 'nav_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};