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

        const {page} = this.get();

        const links = await this.model('topic').select();

        return this.success(links);
    }

    setCorsHeader(){
        this.header('Access-Control-Allow-Headers', 'x-requested-with');
        this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
        this.header('Access-Control-Allow-Credentials', 'true');
    }
}