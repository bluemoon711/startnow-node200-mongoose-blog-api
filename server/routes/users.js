const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require ('mongoose');

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});


router.get('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id);
    User.findById(id)
        .then( (doc) => {
            if (!doc) {return res.status(404).end();}
            return res.status(200).json(doc);
         })
         .catch(err => res.send(err));
});

router.post('/', (req, res) => {
    var user = new User(req.body);
    user.save( (err, user) => {
        res.status(201).json(user);
    })        
});

router.put('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.body.id);
    User.findByIdAndUpdate(id, req.body)
        .then(doc => {
            res.status(204).send();
        })
        .catch(err => res.send(err));
});

router.delete('/:id', (req, res) => {
    var id = new mongoose.Types.ObjectId(req.params.id);
    User.findByIdAndRemove(id)
        .exec()
        .then(doc => {
            if (!doc) { return res.status(404).end();}
            return res.status(200).end();
        })
        .catch(err => res.send(err));
});

module.exports = router;