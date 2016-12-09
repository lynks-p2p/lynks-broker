import Shred from '../models/Shred.model';
/*create new shred. */
function create(req, res, next) {
  const shred = new Shred({
    ownerId: req.body.ownerid,
    shredSize: req.body.shredsize
  });

  shred.save()
    .then(savedShred => res.json(savedShred))
    .catch(e => next(e));
}
/*Load shred and append to req.*/
function get(req, res,next,id) {
  Shred.get(id)
    .then((shred) => {
      req.shred = shred;
      return next();
    })
    .catch(e => next(e));
}
/*Delete shred*/
function remove(req, res, next) {
  const shred = req.shred;
  shred.remove()
    .then(deletedShred => res.json(deletedShred))
    .catch(e => next(e));
}

export default { create,get,remove };
