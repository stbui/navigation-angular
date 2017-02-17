// 'use strict';
//
// export default {
//     on: true, //use html_cache
//     type: 'file', //cache content store type
//     timeout: 0,
//     callback: function(key){
//         return think.md5(key);
//     },
//     rules: {
//         'home/index/index': ['index_{page}'],
//         'index/detail': ['index_{id}']
//     },
//     //adapter config
//     adapter: {
//         file: {
//             path: think.getPath('common', 'runtime') + '/html_cache' //when type is file, set cache path
//         }
//     }
// }