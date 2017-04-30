import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;


after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  // mongoose.connection.collections['users'].drop( (err) => {
  //   if (err) return done(err);
  // });
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  let user = {
    username: 'John',
    capacity: 200 // MB
  };

  describe('# POST /api/users/signup', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.capacity).to.equal(user.capacity);
          expect(res.body.fileMap).to.equal('');
          user = res.body;
          done();
        })
        .catch(done);
    });
  });
  describe('# POST /api/users/signin', () => {
    it('should login the new user', (done) => {
      request(app)
        .post('/api/users/signin')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.capacity).to.equal(user.capacity);
          expect(res.body.fileMap).to.equal(user.fileMap);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });
  describe('# PUT /api/users/update_capacity', () => {
    it('should change capacity of the user', (done) => {
      user.capacity = 500;

      request(app)
        .put('/api/users/update_capacity')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.capacity).to.equal(500);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });
  describe('# PUT /api/users/update_filemap', () => {
    it('should  change FileMap of the user', (done) => {
      user.fileMap = 'AAAAFFFF';

      request(app)
        .put('/api/users/update_filemap')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.fileMap).to.equal('AAAAFFFF');
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/leave', () => {
    it('should remove the user from the system', (done) => {
      request(app)
        .delete('/api/users/leave')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.capacity).to.equal(user.capacity);
          expect(res.body.fileMap).to.equal(user.fileMap);
          user = res.body;
          done();
        })
        .catch(done);
    });
  });

  //write the implementation of remove in user controller first
  // describe('# POST /api/users/signin', () => {
  //   it('should Fail cause the  user isn\'t on the system ', (done) => {
  //     request(app)
  //       .post('/api/users/signin')
  //       .send(user)
  //       .expect(httpStatus.OK)
  //       .then((res) => {
  //         expect(res.body.username).to.equal(user.username);
  //         expect(res.body.capacity).to.equal(user.capacity);
  //         expect(res.body.fileMap).to.equal(user.fileMap);
  //         user = res.body;
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });


});
