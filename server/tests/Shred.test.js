import mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;


//
// const user = {
//   _id: ObjectID(),
//   username: 'James',
//   capacity: 200,
//   fileMap: ''
// };

const user = {
  '__v': 0,
  '_id' : new ObjectId(),
  'capacity' : 500,
  'fileMap' : 'DEADBEEF',
  'username' : 'James'
};


before((done) => {
  mongoose.connection.collection('users').insert(user);
  done();
});

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  // mongoose.connection.collections['shreds'].drop( (err) => {
  //   if (err) return done(err);
  // });
  // mongoose.connection.collections['users'].drop( (err) => {
  //   if (err) return done(err);
  // });
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Shreds APIs', () => {

  const newShredsRequest = {
    userId: user._id,
    nShreds: 5,
    lastSize: 99 // in Bytes
  };

  const getHostsRequest = {
    userId: user._id,
    shredsIds: []
  };

  const deleteShredsRequest = {
    userId: user._id,
    shredsIds: [],
    fileMap: 'BBBBBCCCCCC'
  };

  let hostsList;

  describe('# POST /api/shreds/new', () => {
    it('should create a new shred(s) record', (done) => {
      request(app)
        .post('/api/shreds/new')
        .send(newShredsRequest)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.owner).to.equal(newShredsRequest.userId.toString());
          expect(res.body.createdShreds).to.be.an('array');
          res.body.createdShreds.forEach((shredHost) => {
            expect(shredHost).to.have.property('shred');
            expect(shredHost).to.have.property('host');
          });
          hostsList = res.body.createdShreds;
          done();
        })
        .catch(done);
    });
  });


  describe('# GET /api/shreds/get_hosts', () => {
    it('should get list of hosts having some given shreds identifiers', (done) => {
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
            hostsList.forEach((el) => {
              if (shredHost.shred === el.shred) expect(shredHost.host).to.equal(el.host);
            });
          });
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/shreds/delete', () => {
    it('should delete the shreds requested by user, and return exactly number of those deleted', (done) => {
      hostsList.forEach((shredHost) => {
        deleteShredsRequest.shredsIds.push(shredHost.shred);
      });
      request(app)
        .delete('/api/shreds/delete')
        .send(deleteShredsRequest)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.fileMap).to.equal(deleteShredsRequest.fileMap);
          expect(res.body.nRemovedShreds).to.equal(deleteShredsRequest.shredsIds.length);
          // expect(res.body.undeletedShreds).to.be.an('array');
          // res.body.undeletedShreds.forEach((shredHost) => {
          //   expect(shredHost).to.have.property('shred');
          //   expect(shredHost).to.have.property('host');
          // });
          done();
        })
        .catch(done);
    });
  });

});
