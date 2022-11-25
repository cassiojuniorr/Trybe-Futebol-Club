import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../../app';
import TeamsModel from '../../database/models/TeamsModel';
import { allTeamsMock, oneTeam } from '../models/TeamsModel/mock/teamsMock';
const { app } = new App();


chai.use(chaiHttp);
const { expect } = chai;

describe('Teams Controller Test', () => {
    let chaiHttpResponse: Response;

    describe('Get All', () => {
        it('allTeams', async () => {
            sinon.stub(TeamsModel, 'findAll').resolves(allTeamsMock);

            chaiHttpResponse = await chai
            .request(app)
            .get('/teams');

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMock);
        });

    });

    describe('Find By ID', () => {
        it('Correct ID', async () => {
            sinon.stub(TeamsModel, 'findByPk').resolves(oneTeam);

            chaiHttpResponse = await chai
            .request(app)
            .get('/teams/1');


            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.an('object');
            expect(chaiHttpResponse.body).to.be.deep.equal(oneTeam);
        });

        it('Wrong ID', async () => {
            sinon.stub(TeamsModel, 'findByPk').resolves(null);

            chaiHttpResponse = await chai
            .request(app)
            .get('/teams/1');


            expect(chaiHttpResponse).to.have.status(404);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('Team not Found');
        });
    });
});
