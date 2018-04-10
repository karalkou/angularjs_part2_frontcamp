const express = require('express');
const router = express.Router();
const BlogModel = require('../models/blog');

/**
 * GETs articles in database.
 */
const getArticles = (req, res, next) => {
    BlogModel.find({})
        .then(blogs => {
            res.json(blogs);
        })
        .catch(err => {
            err.status = 404;
            next(err)
        });
};
router.get('/', getArticles);

/**
 * GETs article instanace by ID.
 */
const getArticle = (req, res, next) => {
    BlogModel.findById(req.params.id)
        .then(blog => {
            if (!blog) {
                let err = new Error('Not found');
                err.status = 404;
                next(err);
                return;
            }
            res.send(blog);
        })
        .catch(err => {
            err.status = 404;
            next(err)
        });
};
router.get('/:id', getArticle);

/**
 * POSTs created article instance
 */
const postArticle = (req, res, next) => {
    let blog = new BlogModel(req.body);
    blog.save()
        .then(createdBlog => {
            res.json(createdBlog);
        })
        .catch(err => {
            err.status = 412;
            next(err)
        });
};
router.post('/', postArticle);

/**
 * PUTs updates article instance
 */
const putUpdated = (req, res, next) => {
    BlogModel.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true})
        .then(blog => {
            res.json(blog);
        })
        .catch(err => {
            err.status = 404;
            next(err);
        });
};
router.put('/:id', putUpdated);

/**
 * DELETEs article instance
 */
const deleteArticle = (req, res, next) => {
    BlogModel.findByIdAndRemove(req.params.id)
        .then(deletedBlog => {
            res.json({
                id: deletedBlog.id
            });
        })
        .catch(err => {
            err.status = 404;
            next(err);
        });
};
router.delete('/:id', deleteArticle);

module.exports = router;
