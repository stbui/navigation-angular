'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const {page} = this.get();

        const links = await this.model('topic').select();

        return this.success(links);
    }
}