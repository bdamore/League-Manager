'use strict';

angular.module('LeagueManagerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'My Team',
      'link': '/myTeam'
    },
    {
      'title': 'Players',
      'link': '/players'
    },
    {
      'title': 'Draft',
      'link': '/draft'
    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
