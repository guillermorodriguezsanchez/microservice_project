const expect = require('chai').expect;
const request = require('supertest');

const User = require('../../../src/models/events');
const app = require('../../../index');
const conn = require('../../../src/database/configdb');


