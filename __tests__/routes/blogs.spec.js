process.env.NODE_ENV = 'test';

const Blog = require('../../server/app/models/blog.js');

const app = require('../../server/server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Blogs', () => {
    let dummyBlog1 = {
        author: 'Test McTest',
        title: 'title',
        body: 'message'
    };
    let dummyBlog2 = {
        author: 'Test McTest 2',
        title: 'title2',
        body: 'message2'
    };
    beforeEach((done) => {
        Blog.remove({}, (err) => {
            done();
        });
    });

    describe('/GET articles', () => {
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
        it('should get all articles', (done) => {
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

    describe('/GET/:id article', () => {
        it('should get specific article', (done) => {
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
        it('should return 404 if no article founded', (done) => {
            chai.request(app)
                .get('/api/blogs/' + 123)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });
    });

    describe('/POST article', () => {
        it('should post article if all is ok', (done) => {
            let blog = {
                title: 'title',
                author: 'Test McTest',
                body: 'message'
            };

            chai.request(app)
                .post('/api/blogs')
                .set('form', 'json')
                .send(blog)
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it('should not post article without title', (done) => {
            let blog = {
                author: 'Test McTest',
                message: 'message'
            };

            chai.request(app)
                .post('/api/blogs')
                .set('form', 'json')
                .send(blog)
                .end((err, res) => {
                    if(err) done(err);
                    res.should.have.status(412);
                    res.body.should.be.a('object');
                    done();
                })
        })
    });

    describe('/DELETE article', () => {
        it('should delete article', (done) => {
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
