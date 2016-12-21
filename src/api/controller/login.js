'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        const params = this.post();
        let {username, password} = {username: 'admin', password: 'admin'};
        password = think.md5(password);
        let result = await this.model('admin').where({username, password}).find();

        if (think.isEmpty(result)) {
            return this.fail(1001, '操作失败', params);
        }

        this.session('userInfo', result);
        this.success({username}, '操作成功');
    }

    async loginAction() {
        const params = this.post();
        let {username, password} = {username: 'admin', password: 'admin'};
        password = think.md5(password);
        let result = await this.model('admin').where({username, password}).find();

        if (think.isEmpty(result)) {
            return this.fail(1001, '操作失败', params);
        }

        this.session('userInfo', result);
        this.success({username}, '操作成功');
    }

    async logoutAction() {
        this.session('userInfo', null);

        if (this.isAjax()) {
            this.success({}, '操作成功');
        } else {
            return this.redirect('/my.html');
        }
    }
}