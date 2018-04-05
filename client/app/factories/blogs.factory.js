// import { SERVER_URL } from '../config.js';
function blogsFactory($http, $q) {
    let blogsList = [];

    return {
        getArticles: function getArticles() {
            let def = $q.defer();

            if (blogsList.length) {
                def.resolve(blogsList);
                return def.promise;
            } else {
                return $http.get('/api/blogs')
                    .then(function(res) {
                        blogsList = res.data;
                        return res.data;
                    })
            }

        },
        addBlog: function addBlog(newBlog) {
            return $http.put('/api/blogs', newBlog)
                .then(function(res) {
                    blogsList.push(res.data.blog);
                    return blogsList;
                })
        },
        removeBlog: function removeBlog(id) {
            let index = blogsList.findIndex(elem => elem._id === id);

            return $http.delete('/api/blogs/' + id)
                .then(function(res) {
                    blogsList.splice(index, 1);
                    return blogsList;
                })
        },
        changeBlog: function(blogId, newBlog) {
            let index = blogsList.findIndex(elem => elem._id === blogId);
            newBlog.id = blogId;

            return $http.post('/api/blogs/update/', newBlog)
                .then(function(res) {
                    blogsList[index] = res.data.blog;
                    return blogsList;
                })
        }
    };
}

blogsFactory.$inject = ['$http', '$q'];

export default blogsFactory;
