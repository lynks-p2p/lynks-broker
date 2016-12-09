// uncomment this
import ShredHost from '../models/ShredHost.model';

function create(req, res, next) {

  const newShredHost= new ShredHost({
    shredId : req.params.shredId,
    hostId  : req.params.hostId
  });
  newShredHost.save()
    .then(savedShredHost => res.json(savedShredHost))
    .catch(e=>next(e));
}

function get(req, res, next){
  ShredHost.findOne({shredId: req.params.shredId, hostId: req.params.hostId })
    .then(shredhost => res.json(shredhost))
    .catch(e=>next(e));
}

function updateShredHost(req,res,next){
  ShredHost.findOne({shredId: req.params.shredId, hostId: req.params.hostId })
    .then((shredhost) => {
      shredhost.hostId = req.params.newhostId;
      shredhost.save()
        .then(savedShredHost => res.json(savedShredHost))
        .catch(e => next(e));
    })
    .catch(e=>next(e));
}

function remove(req, res, next){ //to be completed
  ShredHost.findOne({shredId: req.params.shredId, hostId: req.params.hostId })
    .remove()
    .exec()
    .then(shredhost => {
      return res.json(shredhost);
    })
    .catch(e=>next(e));
}


export default { create, get, updateShredHost, remove };
