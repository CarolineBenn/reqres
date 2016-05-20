var Group = Group || {};

Group.ajaxRequest = function(method, owner, data, tpl) {
  return $.ajax({
    method:     method,
    url:        "https://api.github.com/repos/" + owner + "/wdi-project-3/contributors?sha=development",
    data:       data,
    beforeSend: this.setRequestHeader
  }).done(function(data) {
    // console.log(data)
    Group.getCommitNumberData(data)
  }).fail(function(data) {
    console.log("Failed to get data", data)
  });
}

Group.addToLeaderBoard = function(team, users, totalNumberOfCommits){

  usernames = users

  $('#leaderboard').append("<h5>" + team + "</h5><span class='users'>" + users[0] + ", " + users[1] + " and " + users[2] + "</span><br><span class='commitnumber'>" + totalNumberOfCommits + " commits</span><br>")
}


Group.getCommitNumberData = function(data) {
  var team;
  var totalNumberOfCommits = 0;
  var users = [];

  $.each(data, function(i, contributor){
    var username = contributor.login
    users.push(username)
    usernames = users.join(" and ")
    var numberOfContributions = contributor.contributions
    totalNumberOfCommits += numberOfContributions
  })

  if (users.indexOf("matmenzl") > -1) {
    team = "Team Rampage";
  } else if (users.indexOf("rosierossington") > -1) {
    team = "RAP";
  } else if (users.indexOf("BellaT") > -1) {
    team = "PB&J";
  } else if (users.indexOf("SebastienLouit") > -1) {
    team = "Internationales"
  } else if (users.indexOf("trcywu") > -1) {
    team = "Team Dogging"
  }
  $('.team-details').hide();
  $('.team-details').css('background-color', '#1a8')
  $('.team-details').fadeIn();



  $('.teamname').html("<h1>" + team + "</h1>")
  $('.teammembers').html("<h4>" + users[0] + ", " + users[1] + " and " + users[2] + "</h4>")
  $('.infoboard').html("Total number of commits for " + team + " is <strong>" + totalNumberOfCommits + "</strong>" )

  setTimeout(function(){ 
    Group.addToLeaderBoard(team, users, totalNumberOfCommits)
   
  }, 1000);   
}

Group.findInput = function(){
    event.preventDefault();
    console.log("FindInput")
    var username = $('input').val();
    // if (username != 'matmenzl' || username != '') {
    //   alert("NO!")
    // } else {
      Group.ajaxRequest("GET", username)      
    // }
}

Group.bindFormSubmits = function(){
  $('form').on('submit', Group.findInput)
}


Group.initialize = function(){
  Group.bindFormSubmits();
};

$(function(){
  Group.initialize();
});









