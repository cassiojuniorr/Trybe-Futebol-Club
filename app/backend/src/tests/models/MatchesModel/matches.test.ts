import * as sinon from 'sinon';
import * as chai from 'chai';
const config = require('../../../database/models/index');
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../../../app';
import MatchesModel from '../../../database/models/MatchesModel';
import { allMatches, newMatch, updateMatch } from './mock/matchesMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login', () => {

  it('MatchesModel.findAll', async () => {
    sinon.stub(config , 'execute').resolves(allMatches);
    const matches = await MatchesModel.findAll();

    expect(matches).to.be.deep.equal(allMatches);
  });

  it('MatchesModel.create', async () => {
    sinon.stub(config , 'execute').resolves(newMatch);
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = newMatch;
    const match = await MatchesModel.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });

    expect(match).to.be.deep.equal(newMatch);
  });

  it('MatchesModel.update', async () => {
    sinon.stub(config , 'execute').resolves(updateMatch);
    const { homeTeamGoals, awayTeamGoals, id } = updateMatch;
    const update = await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    expect(update).to.be.deep.equal(updateMatch);
  });

  it('MatchesModel.findByPk', async () => {
    sinon.stub(config , 'execute').resolves(updateMatch);
    const { id } = updateMatch;
    const findMatch = await MatchesModel.findByPk(id);

    expect(findMatch).to.be.deep.equal(updateMatch);
  });

  afterEach(function () {
    sinon.restore();
  });
});
