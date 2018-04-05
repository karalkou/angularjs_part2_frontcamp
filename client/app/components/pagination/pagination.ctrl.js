import { ARTICLES_PER_PAGE } from '../config.js';

function paginationController($scope, blogsFactory) {
    let ctrl = this;

    blogsFactory.getArticles()
        .then(function(res) {
            ctrl.pagesCount = Math.ceil(res.length / ARTICLES_PER_PAGE);
            console.log(ctrl.pagesCount);
        });

    ctrl.setPage = function(pageNumber) {
        ctrl.page = pageNumber;
    };

    ctrl.activateEditBlog = function(id) {
        $location.url('/blog/edit/' + id);
    }
}
paginationController.$inject = ['$scope', 'blogsFactory'];

export default paginationController;
