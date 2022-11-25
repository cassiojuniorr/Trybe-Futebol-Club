import * as sinon from 'sinon';
import * as chai from 'chai';
const config = require('../../../database/models/index');
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../../database/models/TeamsModel';
import { allTeamsMock, oneTeam } from '../models/TeamsModel/mock/teamsMock';
import TeamsService from '../../services/TeamsService';

chai.use(chaiHttp);


const { expect } = chai;

describe('Teams Service Test', () => {
  describe('Get All', function() {
    it('Teams.FindAll', async () => {
       sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock);

       const teams = await TeamsService.getAll();

       expect(teams).to.be.deep.equal(allTeamsMock);
    });
  });

  describe('Find By Id', function() {
    it('Correct ID', async () => {
       sinon.stub(TeamsModel, 'findByPk').resolves(oneTeam);

       const team = await TeamsService.findById('1');

       expect(team).to.be.deep.equal(oneTeam);
    });

    it('Wrong ID', async () => {
        sinon.stub(TeamsModel, 'findByPk').resolves(null);

        const team = await TeamsService.findById('1');

        expect(team).to.be.deep.equal(null);
    });
  });
});
