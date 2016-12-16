'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const {topicId} = this.get();

        const catalog = await this.model('catalog').where({topic_id: topicId}).select();

        return this.success(catalog);
    }
}