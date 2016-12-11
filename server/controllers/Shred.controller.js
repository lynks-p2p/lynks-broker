import Shred from '../models/Shred.model';

// create new shred
function createShred(ownerId, shredSize, next) {
  const shred = new Shred({
    owner: ownerId,
    size: shredSize
  });

  let shredId;
  shred.save()
    .then((savedShred) => {
      shredId = savedShred._id;
    })
    .catch(e => next(e));

  return shredId;
}

// Load shred and return it in response
function getShred(shredId) {
  return Shred.findOne({_id: shredId});
}

// remove shred
function removeShred(shredId) {
  return Shred.findOne({_id: shredId}).remove();
}

export default { createShred, getShred, removeShred };
