'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const {page, topicId, keyword} = this.get();
        const linksModel = this.model('links');
        let result;

        if (!think.isEmpty(topicId)) {
            result = await linksModel.where({topic_id: topicId}).page(page, 20).countSelect();
        } else if (!think.isEmpty(keyword)) {
            result = await linksModel.where({'title': ['like', '%' + keyword + '%']}).select();
        } else {
            result = await linksModel.page(page, 20).countSelect();
        }

        return this.json(result);
    }
}
