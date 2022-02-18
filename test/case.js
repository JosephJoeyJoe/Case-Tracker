// const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const server = require('../server');
const chaihttp = require('chai-http');



var should = require('chai').should();

chai.use(chaihttp);
// testing the Cases GET and DELETE routes
describe('CASES API', ()=>{
    
    it('It Should GET all CASES', (done) =>{
        chai.request(server)
        .get('/api/cases')
        .end((err,res) =>{
            res.should.have.status(200);   
        done();
        })
     })

    it('DELETE BY ID', (done) =>{
        chai.request(server)
        .get('/api/cases/1')
        .end((err,res) =>{ 
            res.should.have.status(404);  
            res.body.should.have.a('object');  
          done();
        })
    })
})