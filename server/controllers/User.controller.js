import User from '../models/User.model';

function create(req, res, next) {

  const newuser= new User({
    username: req.params.username,
    capacity: req.params.capacity,
    fileMap: ''
  });
  newuser.save()
    .then(savedUser => res.json(savedUser))
    .catch(e=>next(e));
}

function get(req, res, next){
  User.findOne({username: req.params.username})
    .then(user => res.json(user))
    .catch(e=>next(e));

}

function remove(req, res, next){ //to be completed
  User.findOne({username: req.params.username})
    .then(user => {
      // signal to delete the data of the leaving user
      // remove the shreds entries related to the leaving user
      // get the shreds hosted on the leaving user, and ask
      //    other peers who have the same shreds to send them to other
      //    selected peer
      // create new enteries concering the new selected peer and the shreds(that was once hosted on the leaving peer)
      // get user id, remove id from user table
      res.json(user);
    }
      )
    .catch(e=>next(e));

}

function updateCapacity(req,res,next){
  User.findOne({username: req.params.username})
    .then((user) => {
      user.capacity = req.params.capacity;
      user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

function updateFilemap(req,res,next){
  User.findOne({username: req.params.username})
    .then((user) => {
      user.fileMap = req.params.fileMap;
      user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

export default { create, get, remove, updateFilemap, updateCapacity };
