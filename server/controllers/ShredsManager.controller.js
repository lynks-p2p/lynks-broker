import ShredCtrl from '../controllers/Shred.controller';


const defaultShredSize = 1024;

function store(req, res, next) {
  const ownerId = req.param.userId;
  const lastShredSize = req.param.lastSize;
  const nShreds = req.param.nShreds;

  for (let i = 0; i < nShreds - 1)

  ShredCtrl.create(req, res, next);
}

function retrieve(req, res, next) {

}

function remove(req, res, next) {

}

export default { store, retrieve, remove };
