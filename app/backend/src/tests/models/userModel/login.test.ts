import * as sinon from 'sinon';
import * as chai from 'chai';
const config = require('../../../database/models/index');
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../../app';
import UserModel from '../../../database/models/UserModel';
import { adminMock, tokenMock, userMock } from './mock/mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login', () => {

  it('Right Login', async () => {
    sinon.stub(config , 'execute').resolves(adminMock);
    const result = await UserModel.findOne({ where: {email: adminMock.email}});

    expect(result).to.be.deep.equal(tokenMock);
  });

  it('Wrong Login', async () => {
    sinon.stub(config , 'execute').resolves(null);
    const result = await UserModel.findOne();

    expect(result).to.be.deep.equal(null);
  });

  it('Admin LoginVal', async () => {
    sinon.stub(config , 'execute').resolves(adminMock);
    const role = await UserModel.findOne({ where: {email: adminMock.email}});

    expect(role).to.be.deep.equal('admin');
  });

  it('User LoginVal', async () => {
    sinon.stub(config , 'execute').resolves(userMock);
    const role = await UserModel.findOne({ where: {email: userMock.email}});

    expect(role).to.be.deep.equal('user');
  });

  afterEach(function () {
    sinon.restore();
  });
});
