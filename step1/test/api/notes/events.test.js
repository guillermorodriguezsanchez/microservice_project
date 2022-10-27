
const request = require('supertest');
const mongoose = require("mongoose");

require("dotenv").config();

const app = require('../../../index');
const { eventBuild } = require('./variables/variablesDefault');



/* Connecting to the database before each test. */
beforeEach(async () => {
     mongoose.connect(process.env.DBCONNECTION);
  });
  


describe('eventADD', () => {

    // TEST TO CREATE AN EVENT AND STORING IN THE DATA
    it('should store a event', async () => {
        
        const result = await request(app)
            .get('/addevent?name=event1&date=20221004&tickets=20')
        
        expect(result.body).toEqual(
            {
                ok: true,
                msg: 'addEvent',
                id: result.body.id,
            }
        )
    })
})

describe("GET /events", () => {
    it("should return all events", async () => {
        
      const res = await request(app)
      
      .get("/events");
      console.log(res.body);
      expect(res.body).toHaveProperty('ok', true);
      expect(res.body).toHaveProperty('msg', 'All events');
        
    });
  });

describe('eventsDELETE', () => {

    const eventsB = eventBuild();   


    // TEST TO CREATE AN EVENT AND STORING IN THE DATA
    it('should store a event', async () => {
        
        const result = await request(app)
            .get('/deleteevent?id=c2a61303-2b13-4a82-8363-3de24b4be7d1')
        
        expect(result.body).toEqual(
            {
                ok: true,
                msg: 'This event has been eliminated',
            }
        )
    })
})

describe('eventsSearch', () => {

    const eventsB = eventBuild();   


    // TEST TO CREATE AN EVENT AND STORING IN THE DATA
    it('should search a event', async () => {
        
        const result = await request(app)
            .get('/searchtickets?date=20221004&tickets=2')
        
            expect(result.body).toHaveProperty('ok', true);
    })
})

describe('ticketsADD', () => {

    const eventsB = eventBuild();   


    // TEST TO CREATE AN EVENT AND STORING IN THE DATA
    it('should store a ticket', async () => {
        
        const result = await request(app)
            .get('/reserveticket?event=c2a61303-2b13-4a82-8363-3de24b4be7d1&name=Micky Mouse')
        
        expect(result.body).toEqual(
            {
                ok: true,
                msg: 'reserveTicket',
                _id: result.body._id,
            }
        )
    })
})

describe('ticketsDELETE', () => {

    const eventsB = eventBuild();   


    // TEST TO CREATE AN EVENT AND STORING IN THE DATA
    it('should delete a ticket', async () => {
        
        const result = await request(app)
            .get('/deleteticket?id=a52a8e86-588d-4d5d-b5ec-0621ea7fa9b3')
        
        expect(result.body).toEqual(
            {
                ok: true,
                msg: 'This ticket has been eliminated',
            }
        )
    })
})

describe("GET /tickets", () => {
    it("should return all events", async () => {
        
      const res = await request(app)
      
      .get("/tickets");
      console.log(res.body);
      expect(res.body).toHaveProperty('ok', true);
      expect(res.body).toHaveProperty('msg', 'All tickets');
        
    });
  });