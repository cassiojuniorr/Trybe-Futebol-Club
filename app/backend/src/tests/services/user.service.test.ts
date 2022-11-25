import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../../database/models/UserModel';
import UserService from '../../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Service Test', () => {
  describe('Login', function() {
    it('Correct Login', async () => {
        const mock = {
            id: 1,
            username: 'fulano',
            role: 'admin',
            email: 'test@test.com',
            password: '1234',
          
        } as unknown as UserModel;
       sinon.stub(UserModel, 'findOne').resolves(mock);

       const user = await UserService.login({ email: mock.email, password: mock.password });

       expect(user).to.be.deep.equal(mock);
    });

    it('Wrong Login', async () => {
        sinon.stub(UserModel, 'findOne').resolves(null);

        const user = await UserService.login({ email: '', password: '' });

        expect(user).to.be.deep.equal(null);
    });
  });
});
