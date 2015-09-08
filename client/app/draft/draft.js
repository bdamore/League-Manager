'use strict';

angular.module('LeagueManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('draft', {
        url: '/draft',
        templateUrl: 'app/draft/draft.html',
        controller: 'DraftCtrl as ctrl'
      });
  });
