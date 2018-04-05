import paginationController from './pagination.ctrl.js';

const paginationComponent = {
    templateUrl: '/client/app/components/pagination/pagination.template.html',
    controller: paginationController,
    bindings: {
        blogs: '=',
        page: '='
    }
};

export default paginationComponent
