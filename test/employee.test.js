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
            // const employees = new employees({
            //     id: '1',
            //     case_id: '1',
            //     manager_id: '20',
            //     last_day: '2020-01-30',
            //     symptom_start: '2020-01-28',
            //     managerId: '20'
            // });
          //  employees.save((err,employees)=>{
            chai.request(server)
            .get('/:id')
           // .send(employees)
            .end((err,res,req) =>{
                res.should.have.status(404);  
               // expect({id:req.params.id}).
                // res.body.should.have.property('id');  
                // res.body.should.have.property('case_id'); 
                // res.body.book.should.have.property('manager_id');
                // res.body.book.should.have.property('last_day');
                // res.body.book.should.have.property('symptom_start');
                // res.body.book.should.have.property('managerId');
              done();
            })
         //   })
        })
})




