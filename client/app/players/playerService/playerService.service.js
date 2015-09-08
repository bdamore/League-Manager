'use strict';

angular.module('LeagueManagerApp')
  .service('playerService', function ($http, socket) {

 var that = this;

  that.findPlayerById = function(id) {
    return $http.get('/api/players/' + id);
  };

  that.getPlayers = function() {
    return $http.get('/api/players');
  };
});
