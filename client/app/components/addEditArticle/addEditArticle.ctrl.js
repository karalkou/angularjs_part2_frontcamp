function addEditBlogController($scope, blogsFactory, $routeParams, $location) {
    let ctrl = this;

    ctrl.submitted = true;
    ctrl.changingBlogId = $routeParams.id || '';

    if (ctrl.changingBlogId) {
        blogsFactory.getArticles()
            .then(function(res) {
                let blog = res.find(elem => elem._id === ctrl.changingBlogId);
                ctrl.newBlogTitle = blog.title;
                ctrl.newBlogAuthor = blog.author;
                ctrl.newBlogMessage = blog.body;
            })
    }

    ctrl.getNewBlog = function() {
        let newBlog = {
            title: ctrl.newBlogTitle,
            author: ctrl.newBlogAuthor,
            body: ctrl.newBlogMessage
        };

        ctrl.submitted = true;
        ctrl.newBlogTitle = '';
        ctrl.newBlogAuthor = '';
        ctrl.newBlogMessage = '';

        return newBlog;
    };

    ctrl.addBlog = function () {
        let newBlog = ctrl.getNewBlog();

        if (!newBlog.title || !newBlog.author || !newBlog.body) {
            ctrl.submitted = false;
            return;
        }

        blogsFactory.addBlog(newBlog);
        $location.url('/');
    };

    ctrl.editTodo = function() {
        let newBlog = ctrl.getNewBlog();

        if (!newBlog.title || !newBlog.author || !newBlog.body) {
            ctrl.submitted = false;
            return;
        }

        blogsFactory.changeBlog(ctrl.changingBlogId, newBlog);
        $location.url('/');
    }

}

addEditBlogController.$inject = ['$scope', 'blogsFactory', '$routeParams', '$location'];

export default addEditBlogController
