import {createShred, removeShred} from '../controllers/Shred.controller';
import {selectPeers} from '../controllers/User.controller';
import {createShredHostEntry, getHostsFor, removeHostsHavingShred} from '../controllers/ShredHost.controller';
import async from 'async';

const defaultShredSize = 1024;

function store(req, res, next) {
  const hostsList = [];

  selectPeers(req.body.userId, req.body.nShreds)
    .then((peersList) => {

      // assign peers to shreds with default size
      let i = 0;
      async.whilst(
        () => {return (i < req.body.nShreds);},
        (callback) => {
          createShred(req.body.userId, ((i == req.body.nShreds - 2) ? req.body.lastSize : defaultShredSize), next)
            .then((shredId) => {

              const newShredHost = {
                shred: shredId,
                host: peersList[i]
              };

              // add entries into ShredHost collection
              createShredHostEntry(newShredHost.shred, newShredHost.host)
                .then(() => {
                  hostsList.push(newShredHost);

                  // next shred
                  i = i + 1;
                  callback(null);
                });
            });
        },
        (err) => {
          if (err) throw err;
          res.json({owner: req.body.userId, createdShreds: hostsList});
        });


      // // add entries into ShredHost collection
      // for (let i = 0; i < req.body.nShreds; i = i + 1) {
      //   createShredHostEntry(hostsList[i].shred, hostsList[i].host, next);
      // }

    });
}

function retrieve(req, res, next) {
  const hostsList = [];

  async.each(req.body.shredsIds, (shred, callback) => {
    getHostsFor(shred, next)
      .then((hosts) => {
        hosts.forEach((host) => {
          hostsList.push({shred: host.shred, host: host.host});
        });
        callback(null);
      });
  }, (err) => {
    if (err) next(err);
    res.json(hostsList);
  });
}

function remove(req, res, next) {
  const hostsList = [];
  let removedCount = 0;

  async.each(req.body.shredsIds, (shred, callback) => {
    getHostsFor(shred, next)
      .then((hosts) => {

        hosts.forEach((host) => {
          hostsList.push({shred: host.shred, host: host.host});
        });

        removeHostsHavingShred(shred, next)
          .then((nRemovedHosts) => {
            // console.log(nRemovedHosts);
            if (nRemovedHosts.result.n != hosts.length) throw 'NOT REMOVING ALL SHREDS HOSTS!';

            removeShred(shred, next)
              .then((nRemovedShreds) => {
                removedCount += nRemovedShreds.result.n;
                callback(null);
              });
          });
      });

  }, (err) => {
    if (err) next(err);
    if (req.body.shredsIds.length != removedCount) next('NOT REMOVING ALL REQUESTED SHREDS!');
    res.json({fileMap: req.body.fileMap, nRemovedShreds: removedCount});
  });
}

export default { store, retrieve, remove };
