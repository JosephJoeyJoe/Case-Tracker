// const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const server = require('../server');
const chaihttp = require('chai-http');



var should = require('chai').should();

chai.use(chaihttp);

// testing the employees GET,GET:id,POST routes
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
        it('It Should POST Employees last_day & symptom_start',(done)=>{
            const post={
                last_day: 2020-01-30,
                symptom_start: 2020-01-28
            }
            chai.request(server)
            .get('/api/employees')
            .send(post)
            .end((err,res)=>{
                res.should.have.status(200);  
               expect [{post}].to.have.property('numbers');
                //res.body.should.have.a('object');   
                done();
            })
        })
})

