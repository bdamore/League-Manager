'use strict';

angular.module('LeagueManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('players', {
        url: '/players',
        templateUrl: 'app/players/players.html',
        controller: 'PlayersCtrl as ctrl'  // sets playersctrl = ctrl
      });
  });
