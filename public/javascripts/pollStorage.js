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
    str = str + '<input type="radio" name="vote-cat" value=' + index + '>' + categorie + '</input><br>'
    index++;
}


function pollMenu() {
    str = '';
    str += '<select id="pollMenu" onchange="changeChart()">';
    allPollsData.map(pollMenuStr);
    str += '</select>';
    $('#poll-menu').append(str);
    index = 0;
}

function updatePoll(){
    var voteCategorie = $('input:checked').val();
    var selectedPoll = document.getElementById('pollMenu').value;
    var poll = allPollsData[selectedPoll];
    console.log('selected poll data', poll);
    var votes = poll.pollItems[voteCategorie].votes;
    poll.pollItems[voteCategorie].votes = votes + 1;
    console.log(poll.pollItems[voteCategorie].votes);
    //TODO send updated polldata to DB, find poll, update no of votes of poll in DB
    var updatedPoll = {updatedPoll: poll};
    $.post('http://localhost:3000/store-vote', updatedPoll);
}

function categorieMenu(){
    str = '';
    str += '<form id="categorieMenu">';
    categories.map(categorieMenuStr);
    str += '</form>';
    $('#categorie-menu').empty();  
    $('#categorie-menu').append(str);   
    index = 0;

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