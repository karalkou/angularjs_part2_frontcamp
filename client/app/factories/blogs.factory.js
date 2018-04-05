function blogsFactory($http, $q, $resource) {
    let blogsList = [];

    return {
        getArticles: function getArticles() {
            let def = $q.defer();

            if (blogsList.length) {
                def.resolve(blogsList);
                return def.promise;
            } else {
                /*let getArticlesResponse = $resource("/api/blogs").query(
                    { method: "GET" },
                    response => {
                        return response;
                    }
                );
                console.log('--- ', getArticlesResponse);*/
                return $http({
                    method: 'GET',
                    url: '/api/blogs'
                })
                    .then(function(res) {
                        blogsList = res.data;
                        return res.data;
                    })
            }

        },

        addBlog: function addBlog(newBlog) {
            return $http({
                method: 'POST',
                url: '/api/blogs',
                data: `title=${newBlog.title}&author=${newBlog.author}&body=${newBlog.body}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function(res) {
                    blogsList.push(res.data);
                    return blogsList;
                })
        },

        removeBlog: function removeBlog(id) {
            let index = blogsList.findIndex(elem => elem._id === id);

            return $http({
                method: 'DELETE',
                url: `/api/blogs/${id}`
            })
                .then(function(res) {
                    blogsList.splice(index, 1);
                    return blogsList;
                })
        },

        changeBlog: function(blogId, newBlog) {
            let index = blogsList.findIndex(elem => elem._id === blogId);
            newBlog.id = blogId;

            return $http({
                method: 'PUT',
                url: `/api/blogs/${blogId}`,
                data: `title=${newBlog.title}&author=${newBlog.author}&body=${newBlog.body}`,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .then(function(res) {
                    blogsList[index] = res.data;
                    return blogsList;
                })
        }
    };
}

blogsFactory.$inject = ['$http', '$q', '$resource'];

export default blogsFactory;
