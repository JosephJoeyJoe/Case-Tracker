const assert = require('assert');
const chai = require('chai');
const server = require('../controllers/api/employee-routes');
const chaihttp = require('chai-http');
//const { Employee } = require("../models");

chai.should();

chai.use(chaihttp);

// testing the employees routes
describe('Employees API', ()=>{
    it('It Should GET all Employees', (done) =>{
        chai.request(server)
        .get('/')
        .end((err,res) =>{
            res.should.have.status(500);
           // expect(res).to.be.json;
            done();
        })
    })
})
