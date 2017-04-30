import Shred from '../models/Shred.model';

// create new shred
function createShred(ownerId, shredSize, next) {
  return new Promise((resolve) => {

    const shred = new Shred({
      owner: ownerId,
      size: shredSize
    });

    shred.save()
      .then((savedShred) => {
        resolve(savedShred._id);
      })
      .catch(e => next(e));

  });
}

// Load shred and return it in response
// function getShred(shredId) {
//   return Shred.findOne({_id: shredId});
// }

// remove shred
function removeShred(shredId, next) {
  return new Promise(function(resolve) {
    Shred.remove({_id: shredId})
      .then((nRemoved) => {
        resolve(nRemoved);
      })
      .catch((e) => next(e));
  });
}

export default { createShred, removeShred };
