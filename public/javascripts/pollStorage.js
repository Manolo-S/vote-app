function abc () {

var pollName;
var categories;
var votes;

console.log('pollstorage file read');

function categoriesFun (pollItem){
    return pollItem.categorie;
}


function votesFun (pollItem){
    return pollItem.votes;
}

function buildChart(){
    var options = {
              chart: {
                        renderTo: 'container',
                        type: 'bar'
                    },
                    title: {
                        text: pollName
                    },
                    subtitle: {
                        text: 'xxxxxxx'  
                    },
                    xAxis:  {categories: categories},
                    yAxis: {
                        title: {
                            text: 'Votes'
                        }
                    },
                    series: [{
                        data: votes
                    }]
            };
    
//build chart using options above

var chart = new Highcharts.Chart(options);
}

function success(result){
    console.log('succes func called');
    // console.log('result', result);
    // console.log('result.polldata', result.pollData[0].pollName);
    pollName = result.pollData[0].pollName;
    categories = result.pollData[0].pollItems.map(categoriesFun);
    votes = result.pollData[0].pollItems.map(votesFun);
    console.log(pollName, categories, votes)
    buildChart();
}
console.log('call getjson');
$.getJSON('http://localhost:3000/data/polldata', success)
}

