import {createShred} from '../controllers/Shred.controller';
import {selectPeers} from '../controllers/User.controller';
import { createShredHostEntry } from '../controllers/ShredHost.controller';
// import async from 'async';

const defaultShredSize = 1024;

function store(req, res, next) {
  const hostsList = [];

  selectPeers(req.body.userId, req.body.nShreds)
    .then((peersList) => {

      // assign peers to shreds with default size
      for (let i = 0; i < req.body.nShreds - 1; i = i + 1) {
        hostsList.push({
          shred: createShred(req.body.userId, defaultShredSize, next),
          host: peersList[i]
        });
      }

      // assign a peer to the last shred with size < default size
      hostsList.push({
        shred: createShred(req.body.userId, req.body.lastSize, next),
        host: peersList[req.body.nShreds - 1]
      });

      // add entries into ShredHost collection
      for (let i = 0; i < req.body.nShreds; i = i + 1) {
        createShredHostEntry(hostsList[i].shred, hostsList[i].host, next);
      }

    });

  return hostsList;
}

function retrieve(req, res, next) {
  return req + res + next * defaultShredSize;

    //
    // .then((shred) => res.json(shred))
    // .catch(e => next(e));
}

function remove(req, res, next) {
  return req + res + next;


    // .then(deletedShred => {
    //   Shred.remove({_id: deletedShred._id})
    //     .then(() => res.json(deletedShred))
    //     .catch(e => next(e));
    // })
    // .catch(e => next(e));
}

export default { store, retrieve, remove };
