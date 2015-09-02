// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html'
  })

  .state('main.profiles', {
    url: 'main/profiles',
    views: {
        'member-tab': {
          templateUrl: 'templates/ViewProfiles.html',
          controller: 'ProfCtrl'
        }
    }
  })
  .state('main.home', {
    url: 'main/home',
    views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
    }
  })
  .state('main.Smallads', {
    url: 'main/Smallads',
    views: {
        'Smallads-tab': {
          templateUrl: 'templates/Smallads.html',
          controller: 'SmlCtrl'
        },
    
    },
  
  });
  $urlRouterProvider.otherwise('/login');
})



