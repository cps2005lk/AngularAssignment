(function(){
    "use strict";

    angular
        .module("app", ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('movielist', {
                    url: '/list',
                    templateUrl: 'app/list/movielist.html',
                    controller: 'MovieListCtrl as ml'
                })
                .state('moviedetails', {
                    url: '/detail/:id',
                    templateUrl: 'app/details/moviedetails.html',
                    controller: 'MovieDetailsCtrl as md'
                })
                .state('movieadd', {
                    url: '/add',
                    templateUrl: 'app/add/movieadd.html',
                    controller: 'MovieAddCtrl as ma'
                });

            $urlRouterProvider.otherwise('/list');
        })
        .run(function(){
        });
}());