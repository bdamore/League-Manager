'use strict';

angular.module('LeagueManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myTeam', {
        url: '/myTeam',
        templateUrl: 'app/myTeam/myTeam.html',
        controller: 'MyTeamCtrl as ctrl'
      });
  });
