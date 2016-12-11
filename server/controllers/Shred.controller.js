import Shred from '../models/Shred.model';

// create new shred
function create(req, res, next) {
  const shred = new Shred({
    owner: req.body.owner,
    size: req.body.shredsize
  });

  shred.save()
    .then(savedShred => res.json(savedShred))
    .catch(e => next(e));
}

// Load shred and return it in response
function get(req, res, next) {
  Shred.findOne({_id: req.body.shredId})
    .then((shred) => res.json(shred)})
    .catch(e => next(e));
}

// remove shred
function remove(req, res, next) {
  Shred.findOne({_id: req.body.shredId})
    .then(deletedShred => {
      Shred.remove({_id: deletedShred._id})
        .then(() => res.json(deletedShred))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

export default { create, get, remove };
