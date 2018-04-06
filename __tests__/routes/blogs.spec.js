process.env.NODE_ENV = 'test';

const Blog = require('../../server/app/models/blog.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server/server.js');
const should = chai.should();

chai.use(chaiHttp);

describe('Blogs', () => {
    let dummyBlog1 = {
        author: 'ololo',
        title: 'title',
        body: 'message'
    };
    let dummyBlog2 = {
        author: 'ololo2',
        title: 'title2',
        body: 'message2'
    };
    beforeEach((done) => {
        Blog.remove({}, (err) => {
            done();
        });
    });

    describe('/GET blogs', () => {
        it('should get all blogs even if there is no blogs', (done) => {
            chai.request(app)
                .get('/api/blogs')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        });
        it('should get all blogs', (done) => {
            let blog = new Blog(dummyBlog1);
            let blog2 = new Blog(dummyBlog2);
            blog.save(() => {
                blog2.save(() => {
                    chai.request(app)
                        .get('/api/blogs')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(2);
                            done();
                        })
                })
            })
        });
    });

    describe('/GET/:id blog', () => {
        it('should get particular blog', (done) => {
            let blog = new Blog(dummyBlog1);
            blog.save((err, blog) => {
                chai.request(app)
                    .get('/api/blogs/' + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('author');
                        res.body.should.have.property('body');
                        done();
                    })
            })
        });
        it('should return 404 if no blog', (done) => {
            chai.request(app)
                .get('/api/blogs/' + 123)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });
    });

    describe('/POST blog', () => {
        it('should post blog if all is ok', (done) => {
            let blog = {
                author: 'ololo',
                title: 'title',
                body: 'message'
            };

            chai.request(app)
                .post('/api/blogs')
                .send(blog)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });
    });

    describe('/DELETE blog', () => {
        it('should delete blog', (done) => {
            let blog = new Blog(dummyBlog1);
            blog.save((err, blog) => {
                chai.request(app)
                    .delete('/api/blogs/' + blog.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    })
            })
        })
    })
});
