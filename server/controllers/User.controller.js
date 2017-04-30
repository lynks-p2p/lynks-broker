import User from '../models/User.model';
import mongoose from 'mongoose';
import SHA1 from 'crypto-js/sha1';
import async from 'async';

function create(req, res, next) {
  const newUser=  new User({
    username: req.body.username,
    networkID: SHA1(req.body.username),
    fileMap: new Buffer(req.body.fileMap)
  });

  User.findOne({username: newUser.username})
    .then((user) => {
      if (user) {
        res.status(500).send({
         message: 'User already exists'
        })
      } else {
        newUser.save()
          .then(savedUser => {
            res.json({userID: savedUser._id})
            })
          .catch(e => {console.log(e); return next(e)});
      }
    });

  // newUser.save()
  //   .then(savedUser => res.json(savedUser))
  //   .catch(e => next(e));
}

function get(req, res, next) {
  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) {
        res.status(500).send({
         message: 'User does not exist'
        })
      } else {
        res.json({userID: user.networkID, fileMap: user.fileMap})
      }
    })
    .catch(e => next(e));
}

// to be completed
function remove(req, res, next) {
  User.findOne({_id: req.body._id})
    .then(user => {
      // signal to delete the data of the leaving user
      // remove the shreds entries related to the leaving user
      // get the shreds hosted on the leaving user, and ask
      //    other peers who have the same shreds to send them to other
      //    selected peer
      // create new enteries concering the new selected peer and the shreds(that was once hosted on the leaving peer)
      // get user id, remove id from user table
      res.json(user);
    })
    .catch(e => next(e));
}

function updateCapacity(req,res,next){
  User.findOne({_id: req.body._id})
    .then((user) => {
      user.capacity = req.body.capacity;
      user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

function updateFilemap(req, res, next){
  User.findOne({_id: req.body._id})
    .then((user) => {
      user.fileMap = req.body.fileMap;
      user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

function selectPeers(userId, nPeers) {

  return new Promise((resolve, reject) => {
    const peersList = [];

    async.waterfall([
      (callback) => {
        User.count().then((count) => {
          callback(null, count);
        });
      },
      (count, callback) => {
        // Get a random entry
        const randoms = [];

        for (let i = 0; i < nPeers; i = i + 1) randoms.push(Math.floor(Math.random() * count));

        async.each(randoms, (random, callbackInner) => {
          User.findOne()
            .skip(random)
            .then((result) => {
              // Tada! random user
              peersList.push(result._id);
              callbackInner();
            });
        }, (err) => {
          if (err) throw err;
          else callback();
        });

      }
    ], (err) => {
      if (err) reject(err);
      else resolve(peersList);
    });
  });
}

export default { create, get, remove, updateFilemap, updateCapacity, selectPeers };
