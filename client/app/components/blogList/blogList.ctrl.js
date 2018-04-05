import { ARTICLES_PER_PAGE } from '../config.js';

function blogController($scope, blogsFactory, $location) {
    let ctrl = this;

    ctrl.page = 0;
    ctrl.articlesPerPage = ARTICLES_PER_PAGE;

    blogsFactory.getArticles()
        .then(function(res) {
            ctrl.blogs = res;
        });

    ctrl.removeBlog = function(id) {
        blogsFactory.removeBlog(id);
    };

    ctrl.activateEditBlog = function(id) {
        $location.url('/blog/edit/' + id);
    }
}
blogController.$inject = ['$scope', 'blogsFactory', '$location'];

export default blogController
