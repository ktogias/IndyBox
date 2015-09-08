/* global angular, Indynet */

angular.module('indybox', ['ngRoute','indyLogin', 'indySignup'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'loginpage.html',
    })
    .when('/signup', {
      templateUrl:'signuppage.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

