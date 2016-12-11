// uncomment this
import ShredHost from '../models/ShredHost.model';

function create(req, res, next) {
  const newShredHost= new ShredHost({
    shred : req.body.shredId,
    host  : req.body.hostId
  });

  newShredHost.save()
    .then(savedShredHost => res.json(savedShredHost))
    .catch(e=>next(e));
}

function getHostsFor(req, res, next) {
  ShredHost.find({shred: req.body.shredId})
    .then(hosts => res.json(hosts))
    .catch(e => next(e));
}

function getShredsOn(req, res, next) {
  ShredHost.find({host: req.body.hostId})
    .then(shreds => res.json(shreds))
    .catch(e => next(e));
}

function updateShredHost(req, res, next) {
  ShredHost.findOne({shred: req.body.shredId, host: req.body.hostId})
    .then((shredHost) => {
      shredHost.host = req.body.newHostId;
      shredHost.save()
        .then(savedShredHost => res.json(savedShredHost))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

// to be completed
function remove(req, res, next) {
  ShredHost.findOne({shred: req.params.shredId, host: req.params.hostId })
    .remove()
    .exec()
    .then(shredHost => res.json(shredHost))
    .catch(e => next(e));
}


export default { create, getHostsFor, getShredsOn, updateShredHost, remove };
