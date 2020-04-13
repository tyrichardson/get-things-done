console.log("js is loaded");

const todoList = angular.module("todoList", ['ngMaterial', 'ngMessages'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});
