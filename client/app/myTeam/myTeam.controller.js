'use strict';

angular.module('LeagueManagerApp')
.controller('MyTeamCtrl', function ($state, playerService, teamService, socket, Auth) {

  var that = this;
  that.isAdmin = Auth.isAdmin;

  that.getUserTeam = function(){
    teamService.getTeam().then(function(json) {
      that.userTeam = json.data; }).then(function() {
        that.totalPts = 0;
        for(var i = 0; i < that.userTeam.length; i++) {
        that.totalPts += that.userTeam[i].projPts;
        console.log(that.userTeam[i].projPts);
        console.log(that.totalPts);
        }
        console.log(that.totalPts);
    });
  };

  that.removePlayer = function(player) {
    teamService.removePlayer(player).then(function(json) {
      console.log('the player removed is' + player._id + 'from team: ' + that.userTeam);
      that.userTeam = json.data;
      that.getUserTeam();


    }, function(err) {
      console.log('ERROR: removePlayer delete: ' + JSON.stingify(err));
    });
  };
  that.clearTeam = function() {
    teamService.clearTeam().then(function(json) {
      that.team = json.data;
      that.total = teamService.getTotal(that.team);
    }, function(err) {
      console.log('clearTeam delete ERROR: ' + JSON.stingify(err));
    });
  };

  that.getUserTeam();
});
