var angular = require('angular');

var main = angular.module('configService', []);

main.controller("MyCtr", function($scope) {
    $scope.number = 3;
});
