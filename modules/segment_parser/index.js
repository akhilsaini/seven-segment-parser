var config = require('config');
const readline = require('readline');
var fs = require('fs');
var async = require('async');

var hexToNumeric = {
	63: 0, // 0x3F
	6: 1, // 0x06
	91: 2, // 0x5B
	79: 3, // 0x4F
	102: 4, // 0x66
	109: 5, // 0x6D
	125: 6, // 0x7D
	7: 7, // 0x07
	127: 8, // 0x7F
	111: 9 // 0x67
};


function SegmentParser(app) {

	this.app = app;
	this.app.em.on('parse_segment_file', this.parse_segment_file, this);
	this.init();
};

SegmentParser.prototype.parse_segment_file = function (obj) {
	var row1 = [];
	var row2 = [];
	var row3 = [];
	var line = 0;
	var segmentedRows = 1;
	var o = {};
	var nums = [];

	if (obj && obj.segmented_file) {
		const rl = readline.createInterface({
			input: fs.createReadStream(obj.segmented_file)
		});

		rl.on('line', (input) => {
			line++;
			if (line == 1) {
				row1.push(input.split(''));
			} else if (line == 2) {
				row2.push(input.split(''));
			} else if (line == 3) {
				row3.push(input.split(''));
			} else {
				line = 0;
				segmentedRows++;
			}
		}).on('close', () => {
			if (segmentedRows > 1000) {
				o.err = 'Can\'t parse more than 1000 segmented rows at a time.'
				return obj.cb(o);
			}

			async.series([
					function (callback) {
						try {
							for (var i = 0; i < segmentedRows; i++) {
								if (row1[i] && row2[i] && row3[i] && row1[i].length == 27 && row2[i].length == 27 && row3[i].length == 27) {
									var counter = 0;
									var sum = 0;
									var finals = [];
									for (var j = 0; j <= 27; j++) {
										counter++;

										if (j % 3 == 0) {
											finals.push(hexToNumeric[sum]);
											counter = 0;
											sum = 0;
										}

										if (counter == 0) {
											if (row2[i][j] == '|')
												sum += 32;
											if (row3[i][j] == '|')
												sum += 16;
										} else if (counter == 1) {
											if (row1[i][j] == '_')
												sum += 1;
											if (row2[i][j] == '_')
												sum += 64;
											if (row3[i][j] == '_')
												sum += 8;
										} else if (counter == 2) {
											if (row2[i][j] == '|')
												sum += 2;
											if (row3[i][j] == '|')
												sum += 4;
										}
									}
									nums.push(finals.join(''));
									finals.length = 0;
								}
							}
							callback(null);
						} catch (err) {
							callback(err);
						}
					}
				],
				function (err, results) {
					if (err) {
						o.err = err && err.message
						return obj.cb(o);
					}

					o.data = nums;
					return obj.cb(o);
				});
		});
	} else {
		o.err = 'No File to parse.'
		obj.cb(o);
	}
}; //parse_segment_file

SegmentParser.prototype.init = function () {

}; //init

module.exports = SegmentParser;
