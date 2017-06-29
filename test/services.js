//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
//let expect = chai.expect();
let assertArrays = require('chai-arrays');
let fs = require("fs");
let filename = 'input.txt';
let boundary = Math.random();
let perf = require('chai-performance');
let expect = require('chai').expect;
let siege = require('siege');
let benchrest = require('bench-rest');

chai.use(chaiHttp);
chai.use(assertArrays);
chai.use(perf);


describe('services', () => {

	/*
	 * Test the /GET route Marco-Polo Problem
	 */
	// describe('/GET /api/service/marco-polo', () => {

	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when First parameter not int.
	// 	 */
	// 	it('it should return error regarding first parameter to be int.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 'akhilesh', to: 28 })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.equal(0);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('There have been validation errors.');
	// 				res.body.should.have.property('error');
	// 				res.body.error.should.be.a('array');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when Second parameter not int.
	// 	 */
	// 	it('it should return error regarding second parameter to be int.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 1, to: 'akhilesh' })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.equal(0);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('There have been validation errors.');
	// 				res.body.should.have.property('error');
	// 				res.body.error.should.be.a('array');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when Both parameter not int.
	// 	 */
	// 	it('it should return error regarding both parameter to be int.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 'akhilesh', to: 'saini' })
	// 			.end((err, res) => {
	// 				// console.log('err');
	// 				// console.log(err);

	// 				// console.log('res.body');
	// 				// console.log(res.body);

	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.equal(0);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('There have been validation errors.');
	// 				res.body.should.have.property('error');
	// 				res.body.error.should.be.a('array');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when First > Second.
	// 	 */
	// 	it('it should return a message From Value can\'t be greater than to Value.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 28, to: 1 })
	// 			.end((err, res) => {
	// 				//console.log(err,res.body);
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(0);
	// 				res.body.should.have.property('message');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when Second > 1000000.
	// 	 */
	// 	it('it should return a message to Value can\'t be greater than 1000000.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 1, to: 10000000 })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(0);
	// 				res.body.should.have.property('message');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when First > 1000000.
	// 	 */
	// 	it('it should return a message from Value can\'t be greater than 1000000.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 10000000, to: 28 })
	// 			.end((err, res) => {
	// 				res.should.have.status(400);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(0);
	// 				res.body.should.have.property('message');
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when parameter sent i.e. default values which are 1 and 1000000.
	// 	 */
	// 	it('it should GET marco-polo numbers from 1 to 1000000.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(1);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('Marco Polo problem solved.');
	// 				res.body.should.have.property('data');
	// 				res.body.data.should.be.a('array');
	// 				res.body.data.should.have.lengthOf(1000000);
	// 				//res.body.data.should.be.eql(finalRes);
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when First 1 and second is 28.
	// 	 */
	// 	it('it should GET marco-polo numbers from 1 to 28.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 1, to: 28 })
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(1);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('Marco Polo problem solved.');
	// 				res.body.should.have.property('data');
	// 				res.body.data.should.be.a('array');
	// 				res.body.data.should.have.lengthOf(28);
	// 				res.body.data.should.be.eql([1, 2, 3, 'marco', 5, 6, 'polo', 'marco', 9, 10, 11, 'marco', 13, 'polo', 15, 'marco', 17, 18, 19, 'marco', 'polo', 22, 23, 'marco', 25, 26, 27, 'marcopolo']);
	// 				done();
	// 			});
	// 	});


	// 	/*
	// 	 * Test the /GET route Marco-Polo Problem when First parameter not int.
	// 	 */
	// 	it('it should GET marco-polo numbers from 1 to 1000000.', (done) => {
	// 		chai.request(server)
	// 			.get('/api/service/marco-polo')
	// 			.query({ from: 1, to: 1000000 })
	// 			.end((err, res) => {
	// 				res.should.have.status(200);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(1);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('Marco Polo problem solved.');
	// 				res.body.should.have.property('data');
	// 				res.body.data.should.be.a('array');
	// 				res.body.data.should.have.lengthOf(1000000);
	// 				//res.body.data.should.be.eql(finalRes);
	// 				done();
	// 			});
	// 	});
	// });


	/*
	 * Test the /POST route Invoice-Numbers Problem
	 */

	// describe('/POST /api/service/invoice-numbers', () => {

	// 	/*
	// 	 * Test the /POST route Invoice-Numbers Problem
	// 	 */
	// 	it('it upload the file return a array of numbers.', (done) => {
	// 		chai.request(server)
	// 			.post('/api/service/invoice-numbers')
	// 			.set('Content-Type', 'multipart/form-data; boundary=' + boundary)
	// 			.attach('segmented_file', fs.readFileSync('test/' + filename), filename)
	// 			.end((err, res) => {
	// 				console.log(res.body);
	// 				res.should.have.status(200);
	// 				res.body.should.be.a('object');
	// 				res.body.should.have.property('success');
	// 				res.body.success.should.be.eql(1);
	// 				res.body.should.have.property('message');
	// 				res.body.message.should.be.eql('Invoice-Numbers problem solved.');
	// 				res.body.should.have.property('data');
	// 				res.body.data.should.be.a('array');
	// 				res.body.data.should.have.lengthOf(2);
	// 				res.body.data.should.be.eql(['600143155', '650408454']);
	// 				done();
	// 			});
	// 	});

	// 	// /*
	// 	//  * Test the /POST route Invoice-Numbers Problem
	// 	//  */
	// 	// it('it upload the file return a array of numbers.', (done) => {
	// 	// 	chai.request(server)
	// 	// 		.post('/api/service/invoice-numbers')
	// 	// 		.set('Content-Type', 'multipart/form-data; boundary=' + boundary)
	// 	// 		.attach('segmented_file', fs.readFileSync('test/' + filename), filename)
	// 	// 		.end((err, res) => {
	// 	// 			console.log(res.body);
	// 	// 			res.should.have.status(200);
	// 	// 			res.body.should.be.a('object');
	// 	// 			res.body.should.have.property('success');
	// 	// 			res.body.success.should.be.eql(1);
	// 	// 			res.body.should.have.property('message');
	// 	// 			res.body.message.should.be.eql('Invoice-Numbers problem solved.');
	// 	// 			res.body.should.have.property('data');
	// 	// 			res.body.data.should.be.a('array');
	// 	// 			res.body.data.should.have.lengthOf(2);
	// 	// 			res.body.data.should.be.eql(['600143155', '650408454']);
	// 	// 			done();
	// 	// 		});
	// 	// });


	// });

	// describe('chai-performance', function () {
	// 	it('division should be as fast as multiplication', function (done) {
	// 		this.timeout(50e3)
	// 		var amount = 1e6
	// 		expect(function () {
	// 			for (var i = 0, j; i < amount; i++) {
	// 				j = i * 10
	// 			}
	// 		}).performance({
	// 			margin: 1,
	// 			loop: 10,
	// 			method: function () {
	// 				for (var i = 0, j; i < amount; i++) {
	// 					j = i / 10
	// 				}
	// 			}
	// 		}, done)
	// 	})
	// });


	describe('/GET /api/service/marco-polo load test', () => {

		/*
		 * Test the /POST route Invoice-Numbers Problem
		 */
		// it('it siege.', (done) => {
		// 	siege(server)
		// 		.wait(1000)
		// 		.get('/api/service/marco-polo')
		// 		.attack();
		// });

		it('it bench-rest.', (done) => {
			let runOptions = {
				limit: 10, // concurrent connections
				iterations: 100 // number of iterations to perform
			};
			//let flow = 'http://localhost:8081/api/service/marco-polo?from=1&to=28';
			//chai.request(server);
			var flow = {
				main: [
					{ get: 'http://localhost:8081/api/service/marco-polo?from=1&to=28' }
				]
			};

			benchrest(flow, runOptions)
				.on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
				.on('end', function (stats, errorCount) {
					console.log('error count: ', errorCount);
					console.log('stats', stats);
					//done();
				});
			done();
		});

	});


});
