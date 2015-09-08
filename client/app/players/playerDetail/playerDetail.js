'use strict';

angular.module('LeagueManagerApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('playerDetail', {
      url: '/players/:playerId',
      templateUrl: 'app/players/playerDetail/playerDetail.html',
      controller: 'PlayerDetailCtrl as ctrl'
    });
});
