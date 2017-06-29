var express = require('express');
var router = express.Router();
var async = require('async');
var util = require('util');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/api/service/marco-polo', function (req, res, next) {
    req.checkQuery('from', 'Invalid from parameter. Must be a integer between 1 to 1000000.').optional().isInt();
    req.checkQuery('to', 'Invalid from parameter. Must be a integer between 1 to 1000000.').optional().isInt();

    var response = {
        'success': 1,
        'message': 'Marco Polo problem solved.'
    };

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            response.success = 0;
            response.message = 'There have been validation errors.';
            response.error = result.array();
            return res.status(400).json(response);
        }

        var from = req.query.from == null ? 1 : parseInt(req.query.from);
        var to = req.query.to == null ? 1000000 : parseInt(req.query.to);

        if ((from > to)) {
            response.success = 0;
            response.message = 'From Value can\'t be greater than to Value.Must be a integer between 1 to 1000000.';
            return res.status(400).json(response);
        }

        if ((from>1000000)) {
            response.success = 0;
            response.message = 'From Value can\'t be greater than 1000000.Must be a integer between 1 to 1000000.';
            return res.status(400).json(response);
        }

        if ((to>1000000)) {
            response.success = 0;
            response.message = 'To Value can\'t be greater than 1000000.Must be a integer between 1 to 1000000.';
            return res.status(400).json(response);
        }

        var marcopolos = [];

        async.series([
                function (callback) {
                    try {
                        for (var i = from; i <= to; i++) {
                            if (i % 4 == 0 && i % 7 == 0) {
                                marcopolos.push('marcopolo');
                            } else if (i % 4 == 0) {
                                marcopolos.push('marco');
                            } else if (i % 7 == 0) {
                                marcopolos.push('polo');
                            } else {
                                marcopolos.push(i);
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
                    response.success = 0;
                    response.message = 'Error occured while solving the Marco Polo problem.';
                    return res.json(response);
                }

                response.data = marcopolos;
                res.json(response);
            });
    });
});

router.post('/api/service/invoice-numbers', multipartMiddleware, function (req, res, next) {
    var segmented_file = req.files && req.files.segmented_file;
    
    var response = {
        'success': 1,
        'message': 'Invoice-Numbers problem solved.'
    };
    if (segmented_file && segmented_file.path) {
        var o = {
            segmented_file: segmented_file.path,
            cb: function (obj) {
                if (obj.err) {
                    response.success = 0;
                    response.message = 'Error occured while solving the Invoice-Numbers problem.'+obj.err;
                    return res.json(response);
                }

                response.data = obj.data;
                return res.json(response);
            }
        };
        req.app.em.emit('parse_segment_file', o);
    } else {
        response.success = 0;
        response.message = 'Error occured while solving the Invoice-Numbers problem,as there is no segmented file to parse.';
        return res.json(response);
    }
});

// router.post('/api/service/top-secret', multipartMiddleware, function (req, res, next) {
//     var segmented_file = req.files && req.files.segmented_file;
//     //req.app.emit('')
// });

module.exports = router;
