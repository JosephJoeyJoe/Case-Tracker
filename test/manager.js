// const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai');
const server = require('../server');
const chaihttp = require('chai-http');



var should = require('chai').should();

chai.use(chaihttp);

// testing the employees GET,GET:id,POST routes
describe('Managers API', ()=>{
    
        it('It Should GET all Managers', (done) =>{
            chai.request(server)
            .get('/')
            .end((err,res) =>{
                res.should.have.status(200);    
            done();
            })
         })

        // it('It Should GET Employees by IDs', (done) =>{
        //     //const id= 1;  
        //     chai.request(server)
        //     .get('/:id')
        //     .end((err,res) =>{ 
        //         res.should.have.status(404);  
        //         res.body.should.have.a('object');  
        //       done();
        //     })
        // })
        it('It Should POST Managers username&email&password',(done)=>{
            const post={
                username: "jpmorgan",
                email: "jp@gmail.com",
                password: "password123"
            }
            chai.request(server)
            .post('/api/managers')
            .send(post)
            .end((err,res)=>{
                res.should.have.status(500);  
                res.body.should.have.a('object');  
                res.body.should.have.property(''); 
                // res.body.should.have.property('username');
                // res.body.should.have.property('email');
                // res.body.should.have.property('password');
              
                done();
            })
        })
})

