import angular from 'angular';
import messages from 'angular-messages';
import route from 'angular-route';
import resource from 'angular-resource';
import blogsListComponent from './components/blogList/blogList.js';
import addEditBlogComponent from './components/addEditArticle/addEditArticle.js';
import addBlogBtnComponent from './components/addArticleButton/addArticleButton.js';
import paginationComponent from './components/pagination/pagination.js';
import addEditValidationDir from './directives/addEditValidation.directive.js';
import blogsFactory from './factories/blogs.factory.js';

import '../main.scss';

let app = angular.module('blogsApp', [route, messages, resource]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/blogs', {
            template: `
			<blogs-list blogs="$ctrl.blogs"></blogs-list>
			<add-blog-btn></add-blog-btn>
		`
        })
        .when('/blog/add', {
            template: '<add-edit-blog></add-edit-blog>'
        })
        .when('/blog/edit/:id', {
            template: '<add-edit-blog></add-edit-blog>'
        })
        .otherwise({redirectTo: '/blogs'})

    $locationProvider.html5Mode(true);
});

app.filter('range', function () {
    return function (val, range) {
        range = parseInt(range);
        for (let i = 0; i < range; i += 1)
            val.push(i);
        return val;
    };
});

app.directive('addEditValidation', addEditValidationDir);

app.factory('blogsFactory', blogsFactory);

app.controller('blogsAppController', ['$scope', 'blogsFactory', function ($scope, blogsFactory) {
    let ctrl = this;
    ctrl.isLoading = true;

    blogsFactory.getArticles()
        .then(function (res) {
            ctrl.blogs = res;
            ctrl.isLoading = false;
        })
}]);


app.component('blogsList', blogsListComponent);
app.component('addBlogBtn', addBlogBtnComponent);
app.component('addEditBlog', addEditBlogComponent);
app.component('pagination', paginationComponent);
