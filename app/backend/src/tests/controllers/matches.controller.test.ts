import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../../app';
import MatchesModel from '../../database/models/MatchesModel';
import { allMatches, newMatch, updateMatch } from '../models/MatchesModel/mock/matchesMock';
import { oneTeam, awayTeam } from '../models/TeamsModel/mock/teamsMock';
import TeamsModel from '../../database/models/TeamsModel';
const { app } = new App();


chai.use(chaiHttp);
const { expect } = chai;

describe.only('Teams Controller Test', () => {
    let chaiHttpResponse: Response;

    describe('Get All', () => {
        it('All Matches', async () => {
            sinon.stub(MatchesModel, 'findAll').resolves(allMatches);

            chaiHttpResponse = await chai
            .request(app)
            .get('/matches');

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
            (MatchesModel.findAll as sinon.SinonStub).restore();
        });

        it('Progress Matches', async () => {
            const progressMatches = allMatches.filter((match) => match.inProgress);
            sinon.stub(MatchesModel, 'findAll').resolves(progressMatches);

            chaiHttpResponse = await chai
            .request(app)
            .get('/matches?inProgress=true');

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(progressMatches);
            (MatchesModel.findAll as sinon.SinonStub).restore();
        });

        it('Finish Matches', async () => {
            const finishMatches = allMatches.filter((match) => !match.inProgress);
            sinon.stub(MatchesModel, 'findAll').resolves(finishMatches);

            chaiHttpResponse = await chai
            .request(app)
            .get('/matches?inProgress=false');

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(finishMatches);
            (MatchesModel.findAll as sinon.SinonStub).restore();
        });

    });

    describe('Insert New Match', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyfSwiaWF0IjoxNjY5MzkzNDU3LCJleHAiOjE2Njk0Nzk4NTd9.FWESFR16NvMPb2oowb4zQqcfrpA9ciPLERTwwytGdv8'
        
        it('Correct Insert', async () => {
            sinon.stub(TeamsModel, 'findOne')
            .onFirstCall().resolves(oneTeam)
            .onSecondCall().resolves(awayTeam);

            chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .set('authorization', token)
            .send(newMatch);
            


            expect(chaiHttpResponse).to.have.status(201);
            expect(chaiHttpResponse.body).to.be.an('object');
            expect(chaiHttpResponse.body).to.be.deep.equal(newMatch);
            (TeamsModel.findOne as sinon.SinonStub).restore();
        });

        it('Wrong Insert ID Teams', async () => {
            const mock = {
                id: 1,
                homeTeam: 99,
                homeTeamGoals: 2,
                awayTeam: 99,
                awayTeamGoals: 2,
                inProgress: true,
            } as unknown as MatchesModel;

            sinon.stub(TeamsModel, 'findOne')
            .onFirstCall().resolves(null)
            .onSecondCall().resolves(null);

            chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .set('authorization', token)
            .send(mock);
            


            expect(chaiHttpResponse).to.have.status(404);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('There is no team with such id!');
            (TeamsModel.findOne as sinon.SinonStub).restore();
        });

        it('Send Equal ID Teams', async () => {
            const mock = {
                id: 1,
                homeTeam: 4,
                homeTeamGoals: 2,
                awayTeam: 4,
                awayTeamGoals: 2,
                inProgress: true,
            } as unknown as MatchesModel;

            sinon.stub(TeamsModel, 'findOne')
            .onFirstCall().resolves(oneTeam)
            .onSecondCall().resolves(oneTeam);

            chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .set('authorization', token)
            .send(mock);
            


            expect(chaiHttpResponse).to.have.status(422);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams');
        });

        it('Invalid Token', async () => {

            sinon.stub(TeamsModel, 'findOne')
            .onFirstCall().resolves(oneTeam)
            .onSecondCall().resolves(oneTeam);

            chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .set('authorization', 'token_invalid')
            .send(newMatch);
            


            expect(chaiHttpResponse).to.have.status(401);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('Token must be a valid token');
        });

        it('Without Token', async () => {

            sinon.stub(TeamsModel, 'findOne')
            .onFirstCall().resolves(oneTeam)
            .onSecondCall().resolves(oneTeam);

            chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send(newMatch);
            


            expect(chaiHttpResponse).to.have.status(400);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('Need Token');
        });
    });

    describe('Update', () => {
        it('Correct Update', async () => {
            sinon.stub(MatchesModel, 'findByPk').resolves(allMatches[0]);
            sinon.stub(MatchesModel, 'update').resolves([1]);

            chaiHttpResponse = await chai
            .request(app)
            .patch('/matches/1')
            .send(updateMatch); 


            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.be.an('object');
            expect(chaiHttpResponse.body).to.be.deep.equal(updateMatch);
            (MatchesModel.findByPk as sinon.SinonStub).restore();
            (MatchesModel.update as sinon.SinonStub).restore();
        });

        it('Wrong UpdateId', async () => {
            sinon.stub(MatchesModel, 'findByPk').resolves(null);
            sinon.stub(MatchesModel, 'update').resolves([1]);

            chaiHttpResponse = await chai
            .request(app)
            .patch('/matches/1')
            .send(updateMatch); 


            expect(chaiHttpResponse).to.have.status(404);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.be.deep.equal('There is no team with such id!');
            (MatchesModel.findByPk as sinon.SinonStub).restore();
            (MatchesModel.update as sinon.SinonStub).restore();
            
        });
    });

    describe('Finish', () => {
        it('Correct Finish', async () => {
            sinon.stub(MatchesModel, 'update').resolves([1]);

            chaiHttpResponse = await chai
            .request(app)
            .patch('/matches/1/finish');


            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body).to.be.deep.equal('Finished');

            (MatchesModel.update as sinon.SinonStub).restore();
        });
    });
});
