import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../../app';
import { adminMock, userMock } from '../models/userModel/mock/mocks';
import UserModel from '../../database/models/UserModel';
const { app } = new App();


chai.use(chaiHttp);
const { expect } = chai;

describe('User Controller Test', () => {
    let chaiHttpResponse: Response;

    beforeEach(async () => {
        sinon.stub(UserModel, 'findOne').resolves(userMock);
    });

    describe('Login', () => {
        it('Correct Login', async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({ ...adminMock });

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.haveOwnProperty('token');
        });

        it('Without Fields', async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({});

            expect(chaiHttpResponse).to.have.status(400);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.haveOwnProperty('All fields must be filled');
        });

        it('Invalid Email Login', async () => {
            const mock = {
                password: 's31232131', 
            };

            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({ ...mock });

            expect(chaiHttpResponse).to.have.status(401);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.haveOwnProperty('Incorrect email or password');
        });

        it('Invalid Password Login', async () => {
            const mock = {
                email: 'adaw@dada'
            };

            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({ ...mock });

            expect(chaiHttpResponse).to.have.status(401);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.message).to.haveOwnProperty('Incorrect email or password');
        });
    });

    describe('Login Validate', () => {
        it('Correct Login Validate', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyfSwiaWF0IjoxNjY5MzQwODQxLCJleHAiOjE2Njk0MjcyNDF9.6ggP8vzGq2trlsBRHFdjjiSnOstWVWj8o14Ta5_0iKY'
            
            chaiHttpResponse = await chai
            .request(app)
            .get('/login/validate')
            .set('authorization', token);

            sinon.stub(UserModel, 'findOne').resolves({ role: 'user' } as unknown as UserModel);

            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse.body).to.haveOwnProperty('role');
            expect(chaiHttpResponse.body.role).to.haveOwnProperty('user');
        });

        it('Invalid Token', async () => {
            
            chaiHttpResponse = await chai
            .request(app)
            .get('/login/validate')
            .set('authorization', '');

            sinon.stub(UserModel, 'findOne').resolves(null as unknown as UserModel);

            expect(chaiHttpResponse).to.have.status(401);
            expect(chaiHttpResponse.body).to.haveOwnProperty('message');
            expect(chaiHttpResponse.body.role).to.haveOwnProperty('Token must be a valid token');
        });
    });

    afterEach(()=>{
        (UserModel.findOne as sinon.SinonStub).restore();
    });  
});
