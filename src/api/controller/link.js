'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let method = this.http.method.toLowerCase();
        if(method === 'options'){
            this.setCorsHeader();
            this.end();
            return;
        }
        this.setCorsHeader();

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

    setCorsHeader(){
        this.header('Access-Control-Allow-Origin', this.header('origin') || '*');
        this.header('Access-Control-Allow-Headers', 'x-requested-with');
        this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
        this.header('Access-Control-Allow-Credentials', 'true');
    }
}
