// uncomment this
import ShredHost from '../models/ShredHost.model';

function createShredHostEntry(shredId, hostId, next) {

  return new Promise((resolve) => {
    const newShredHost= new ShredHost({
      shred: shredId,
      host: hostId
    });

    newShredHost.save()
      .then(() => {
        resolve();
      })
      .catch(e => next(e));
  });
}

function getHostsFor(shredId, next) {
  return new Promise((resolve) => {
    ShredHost.find({shred: shredId})
      .then(hosts => {resolve(hosts);})
      .catch(e => next(e));
  });
}
//
// function getShredsOn(hostId, next) {
//   ShredHost.find({host: hostId})
//     .then(shreds => {return shreds;})
//     .catch(e => next(e));
// }

// function updateShredHost(shredId, hostId, newHostId, next) {
//   ShredHost.findOne({shred: shredId, host: hostId})
//     .then((shredHost) => {
//       shredHost.host = newHostId;
//       shredHost.save()
//         .then(savedShredHost => {return savedShredHost;})
//         .catch(e => next(e));
//     })
//     .catch(e=>next(e));
// }

// to be completed
// function removeShredHostEntry(shredId, hostId, next) {
//   ShredHost.findOne({shred: shredId, host: hostId})
//     .remove()
//     .then(shredHost => {return shredHost;})
//     .catch(e => next(e));
// }

function removeHostsHavingShred(shredId, next) {
  return new  Promise((resolve) => {
    ShredHost.remove({shred: shredId})
      .then(nRemoved => {resolve(nRemoved);})
      .catch(e => next(e));
  });
}

export default { createShredHostEntry, getHostsFor, removeHostsHavingShred };
