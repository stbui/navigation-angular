'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: process.env.MYSQL_HOSTNAME || '127.0.0.1',
      port: '',
      database: 'navigation',
      user: 'root',
      password: 'root',
      prefix: 'nav_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};