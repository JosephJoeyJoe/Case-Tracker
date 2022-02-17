// const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const server = require('../server');
const chaihttp = require('chai-http');



var should = require('chai').should();

chai.use(chaihttp);

// testing the employees routes
describe('Employees API', ()=>{
    
        it('It Should GET all Employees', (done) =>{
            chai.request(server)
            .get('/')
            .end((err,res) =>{
                res.should.have.status(200);    
            done();
            })
        })

        it('It Should GET Employees by IDs', (done) =>{
            //const id= 1;  
            chai.request(server)
            .get('/:id')
            .end((err,res) =>{ 
                res.should.have.status(404);  
                res.body.should.have.a('object');  
              done();
            })
        })
})

