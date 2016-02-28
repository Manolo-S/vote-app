var pollName;
var categories;
var votes;
var allPollsData;
var index = 0;
var str = '';

function changeChart() {
    console.log('changeChart called');
    var selectedPoll = document.getElementById('menuSelector').value;
    pollName = allPollsData[selectedPoll].pollName;
    categories = allPollsData[selectedPoll].pollItems.map(categoriesFun);
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

function buildMenuStr(poll) {
    var pollName = poll.pollName;
    str = str + '<option value=' + index + '>' + pollName + '</option>'
    index++;
}

function buildMenu() {
    str += '<select id="menuSelector" onchange="changeChart()">';
    allPollsData.map(buildMenuStr);
    str += '</select>';
    $('#menu').append(str);
}

function categoriesFun(pollItem) {
    return pollItem.categorie;
}


function votesFun(pollItem) {
    return pollItem.votes;
}

function changeChart() {
    console.log('changeChart called');
    var selectedPoll = document.getElementById('menuSelector').value;
    pollName = allPollsData[selectedPoll].pollName;
    categories = allPollsData[selectedPoll].pollItems.map(categoriesFun);
    votes = allPollsData[selectedPoll].pollItems.map(votesFun);
    buildChart();
}


function success(result) {
    console.log('succes func called');
    console.log('result', result);
    // console.log('result.polldata', result.pollData[0].pollName);
    allPollsData = result.pollData;
    console.log('allPollsData', allPollsData)
    pollName = result.pollData[0].pollName;
    categories = result.pollData[0].pollItems.map(categoriesFun);
    votes = result.pollData[0].pollItems.map(votesFun);
    console.log(pollName, categories, votes)
    buildMenu();
    buildChart();
}


function abc() {
    $.getJSON('http://localhost:3000/data/polldata', success)
}