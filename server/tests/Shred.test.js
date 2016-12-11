import mongoose, {ObjectId} from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

const user = {
  _id: new ObjectId(),
  username: 'John',
  capacity: 200,
  fileMap: ''
};

before((done) => {
  mongoose.connection.collections['users'].insert(user);
  done();
});

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.connection.collections['shreds'].drop( (err) => {
    if (err) return done(err);
  });
  mongoose.connection.collections['users'].drop( (err) => {
    if (err) return done(err);
  });
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {

  const newShredsRequest = {
    owner: user._id,
    nShreds: 11,
    lastSize: 103 // in Bytes
  };

  const getHostsRequest = {
    owner: user._id,
    shredsIds: []
  };

  const deleteShredsRequest = {
    owner: user._id,
    shredsIds: [],
    fileMap: 'BBBBBCCCCCC'
  };

  let hostsList = [];

  describe('# POST /api/shreds/new', () => {
    it('should create a new shred(s) record', (done) => {
      request(app)
        .post('/api/shreds/new')
        .send(newShredsRequest)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.owner).to.equal(deleteShredsRequest.owner);
          expect(res.body.createdShreds).to.be.an('array');
          res.body.forEach((shredHost) => {
            expect(shredHost).to.have.property('shred');
            expect(shredHost).to.have.property('host');
          });
          hostsList = res.body;
          done();
        })
        .catch(done);
    });
  });


  describe('# GET /api/shreds/get_hosts', () => {
    it('should get list of hosts consering n shreds of a certain userid', (done) => {
      hostsList.forEach((shredHost) => {
        getHostsRequest.shredsIds.push(shredHost.shred);
      });
      request(app)
        .get('/api/shreds/get_hosts')
        .send(getHostsRequest)
        .expect(httpStatus.OK)
        .then((res) =>{
          expect(res.body).to.be.an('array');
          res.body.forEach((shredHost) => {
            expect(shredHost).to.have.property('shred');
            expect(shredHost).to.have.property('host');
          });
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/shreds/delete', () => {
    it('should change capacity of the user', (done) => {
      hostsList.forEach((shredHost) => {
        deleteShredsRequest.shredsIds.push(shredHost.shred);
      });
      request(app)
        .delete('/api/shreds/delete')
        .send(deleteShredsRequest)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.fileMap).to.equal(deleteShredsRequest.fileMap);
          expect(res.body.undeletedShreds).to.be.an('array');
          res.res.body.undeletedShreds.forEach((shredHost) => {
            expect(shredHost).to.have.property('shred');
            expect(shredHost).to.have.property('host');
          });
          done();
        })
        .catch(done);
    });
  });



});
