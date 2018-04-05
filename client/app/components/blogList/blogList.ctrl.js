function blogController($scope, blogsFactory, $location) {
    let ctrl = this;

    blogsFactory.getBlogs()
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
