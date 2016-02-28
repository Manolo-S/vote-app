var pollName;
var categories;
var votes;
var allPollsData;
var index = 0;
var str = '';

function changeChart() {
    console.log('changeChart called');
    var selectedPoll = document.getElementById('pollMenu').value;
    pollName = allPollsData[selectedPoll].pollName;
    categories = allPollsData[selectedPoll].pollItems.map(categoriesFun);
    categorieMenu();
    votes = allPollsData[selectedPoll].pollItems.map(votesFun);
    buildChart();
}

function buildChart() {
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
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: 'Number of votes'
            }
        },
        series: [{
            data: votes
        }]
    };

    //build chart using options above

    var chart = new Highcharts.Chart(options);
}

function pollMenuStr(poll) {
    var pollName = poll.pollName;
    str = str + '<option value=' + index + '>' + pollName + '</option>'
    index++;
}

function categorieMenuStr(categorie){
    str = str + '<option value=' + index + '>' + categorie + '</option>'
}


function pollMenu() {
    str = '';
    str += '<select id="pollMenu" onchange="changeChart()">';
    allPollsData.map(pollMenuStr);
    str += '</select>';
    $('#poll-menu').append(str);
}

function updatePoll(){
    console.log('updatePoll called');
}

function categorieMenu(){
    str = '';
    str += '<select id="categorieMenu" onchange="updatePoll()">';
    categories.map(categorieMenuStr);
    str += '</select>';
    $('#categorie-menu').empty();  
    $('#categorie-menu').append(str);   


}

function categoriesFun(pollItem) {
    return pollItem.categorie;
}


function votesFun(pollItem) {
    return pollItem.votes;
}

// function changeChart() {
//     console.log('changeChart called');
//     var selectedPoll = document.getElementById('pollMenu').value;
//     pollName = allPollsData[selectedPoll].pollName;
//     categories = allPollsData[selectedPoll].pollItems.map(categoriesFun);
//     votes = allPollsData[selectedPoll].pollItems.map(votesFun);
//     buildChart();
// }


function success(result) {
    allPollsData = result.pollData;
    pollName = result.pollData[0].pollName;
    categories = result.pollData[0].pollItems.map(categoriesFun);
    votes = result.pollData[0].pollItems.map(votesFun);
    pollMenu();
    categorieMenu();
    buildChart();
}


function abc() {
    $.getJSON('http://localhost:3000/data/polldata', success)
}