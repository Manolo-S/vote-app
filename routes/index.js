var express = require('express');
var router = express.Router();

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var pollData;
// var pollName;
// var categories;
// var scores;
// var PollItemSchema = new Schema({
//     categorie: String,
//     votes: Number,
//     _id: false
// });
// var PollSchema = new Schema({
//     pollName: String,
//     pollItems: [PollItemSchema]
// });
// var pollModel = mongoose.model('polls', PollSchema);
// var data = [{
//     pollName: 'Who would you vote for?',
//     pollItems: [{
//         categorie: 'Trump',
//         votes: 45
//     }, {
//         categorie: 'Rubio',
//         votes: 20
//     }, {
//         categorie: 'Cruz',
//         votes: 22
//     }, {
//         categorie: 'Hillary',
//         votes: 52
//     }, {
//         categorie: 'Sanders',
//         votes: 48
//     }]
// }];

function pollItemsFun(pollItem) {
    return pollItem;
}

router.use(function(req,res,next){

    // pollModel.create({
    // pollName: data[0].pollName,
    // pollItems: data[0].pollItems.map(pollItemsFun)
    //     }, function(err, polls) {
    //     // if (!err) {
    //     //     // console.log('saved polldata');
    //     //     pollModel.find({}, function(err, polls) {
    //     //         console.log('retrieved data');
    //     //         pollData = {"pollData": polls};
    //     //         console.log(pollData);
    //     //         // res.json(pollData);       // send Polldata to browser

    //             mongoose.connection.close(function() {
    //                 console.log(
    //                     'data stored, Mongoose connection disconnected'
    //                 );
    //             });
                 next();
            // });

        
// });


    
});





router.get('/', function(req, res) {
    // res.json(pollData);
    // res.send('effe');
    res.render('index');
});


module.exports = router;