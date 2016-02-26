var express = require('express');
var router = express.Router();
var pollData;
// var mongoose = require('mongoose');


console.log('data.js called');

router.use(function(req,res,next){
    console.log('data.js router.use called');

    pollModel.find({}, function(err, polls) {
                console.log('retrieved data');
                pollData = {"pollData": polls};
                console.log(pollData);
                // mongoose.connection.close(function() {
                //     console.log(
                //         'Mongoose connection disconnected'
                //     );
                // });
                 next();
            });

});


router.get('/polldata', function(req, res) {
    res.json(pollData);    
});

module.exports = router;