const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require ('mongoose');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => res.send(err));
});

router.get('/featured', (req, res) => {
    Blog
        .where({featured: req.params.featured})
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findById(id)
        .then( (doc) => {
            if (!doc) {return res.status(404).end();}
            return res.status(200).json(doc);
         })
        .catch(err => res.send(err));
});

router.post('/', (req, res) => {
    let dbUser = null;
    User.findById(req.query.userId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save()
                .then(() => res.status(201).json(blog))
                .catch(err => res.send(err));
        })
        .catch(err => res.send(err));

});

router.put('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findByIdAndUpdate(id, req.body)
        .then(doc => {
            res.status(204).send();
        })
        .catch(e => res.send(e));
});

router.delete('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findByIdAndRemove(req.params.id)
        .exec()
        .then(doc => {
            if (!doc) { return res.status(404).end();}
            return res.status(200).end();
        })
        .catch(err => res.send(err));
});

module.exports = router;