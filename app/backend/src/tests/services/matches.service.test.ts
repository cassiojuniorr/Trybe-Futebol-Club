import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import MatchesService from '../../services/MatchesService';
import MatchesModel from '../../database/models/MatchesModel';
import { allMatches, newMatch } from '../models/MatchesModel/mock/matchesMock';
import TeamsModel from '../../database/models/TeamsModel';
import { oneTeam, awayTeam } from '../models/TeamsModel/mock/teamsMock';
const { expect } = chai;

describe('Matches Service Test', () => {
  describe('Get All', function() {
    it('All matches', async () => {
       sinon.stub(MatchesModel, 'findAll').resolves(allMatches);

       const teams = await MatchesService.getAll('');

       expect(teams).to.be.deep.equal(allMatches);
    });

    it('Progress Matches', async () => {
        const matches = allMatches.filter((m) => m.inProgress);
        sinon.stub(MatchesModel, 'findAll').resolves(matches);
 
        const teams = await MatchesService.getAll('true');
 
        expect(teams).to.be.deep.equal(matches);
    });

    it('Finalizeted Matches', async () => {
        const matches = allMatches.filter((m) => !m.inProgress);
        sinon.stub(MatchesModel, 'findAll').resolves(matches);
 
        const teams = await MatchesService.getAll('false');
 
        expect(teams).to.be.deep.equal(matches);
    });
  });

  describe('Insert', function() {
    it('Correct', async () => {
        sinon.stub(TeamsModel, 'findOne')
        .onFirstCall().resolves(oneTeam)
        .onSecondCall().resolves(awayTeam);

        sinon.stub(MatchesModel, 'create').resolves(newMatch);

        const team = await MatchesService.insert(newMatch);

        expect(team).to.be.deep.equal(newMatch);
    });
  });
});
