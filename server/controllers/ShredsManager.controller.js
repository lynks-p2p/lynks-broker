import {createShred} from '../controllers/Shred.controller';
import {selectPeers} from '../controllers/User.controller';
import { createShredHostEntry } from '../controllers/ShredHost.controller';

const defaultShredSize = 1024;

function store(req, res, next) {
  const hostList = [];

  // select peers from user controller
  const peersList = selectPeers(req.body.userId, req.body.nShreds);

  // assign peers to shreds with default size
  for (let i = 0; i < req.body.nShreds - 1; i = i + 1) {
    hostList.push({
      shred: createShred(req.body.userId, defaultShredSize, next),
      host: peersList[i]
    });
  }


    // console.log('hi');
    // console.log(peersList);
  // assign a peer to the last shred with size < default size
  hostList.push({
    shred: createShred(req.body.userId, req.body.lastSize, next),
    host: peersList[req.body.nShreds - 1]
  });

  // add entries into ShredHost collection
  for (let i = 0; i < req.body.nShreds; i = i + 1) {
    createShredHostEntry(hostList[i].shred, hostList[i].host, next);
  }

  return hostList;
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
