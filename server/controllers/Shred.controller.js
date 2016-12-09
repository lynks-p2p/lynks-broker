import Shred from '../models/Shred.model';
/*create new shred. */
function create(req, res, next) {
  const shred = new Shred({
    ownerId: req.params.ownerid,
    shredSize: req.params.shredsize
  });

  shred.save()
    .then(savedShred => res.json(savedShred))
    .catch(e => next(e));
}
/*Load shred and append to req.*/
function get(req, res,next) {
  Shred.get(req.params.shredId)
    .then((shred) => {
      req.shred = shred;
      return res.json(shred);
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
