import * as sinon from 'sinon';
import * as chai from 'chai';
const config = require('../../../database/models/index');
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../../../database/models/TeamsModel';
import { allTeamsMock, oneTeam } from './mock/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('TeamModel test', () => {

  it(' TeamsModel.findAll', async () => {
    sinon.stub(config , 'execute').resolves(allTeamsMock);
    const allTeams = await TeamsModel.findAll();

    expect(allTeams).to.be.deep.equal(allTeamsMock);
  });

  it('Right TeamsModel.findByPk', async () => {
    sinon.stub(config , 'execute').resolves(oneTeam);
    const teams = await TeamsModel.findByPk(oneTeam.id);

    expect(teams).to.be.deep.equal(oneTeam);
  });

  it('Wrong TeamsModel.findByPk', async () => {
    sinon.stub(config , 'execute').resolves(null);
    const teams = await TeamsModel.findByPk(oneTeam.id);

    expect(teams).to.be.deep.equal(null);
  });

  afterEach(function () {
    sinon.restore();
  });
});
