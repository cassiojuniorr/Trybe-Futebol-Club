import * as sinon from 'sinon';
import * as chai from 'chai';
const config = require('../../../database/models/index');
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../../app';
import UserModel from '../../../database/models/UserModel';
import { userMock, tokenMock } from './mock/mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login', () => {
  // const userModel = new UserModel();

  it('Right Login', () => {
    sinon.stub(config , 'execute').resolves(userMock);
    const result = UserModel.findOne({ where: {email: userMock.email}});

    expect(result).to.be.deep.equal(tokenMock);
  });

  it('Wrong Login', () => {
    const err = { type: 'invalidLogin' };
    sinon.stub(config , 'execute').resolves(err);
    const result = UserModel.findOne();

    expect(result).to.be.deep.equal(err);
  });

  afterEach(function () {
    sinon.restore();
  });
});
