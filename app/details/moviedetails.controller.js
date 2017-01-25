(function () {
    'use strict';

    angular
        .module('app')
        .controller('MovieDetailsCtrl', MovieDetailsCtrl);

    MovieDetailsCtrl.$inject = ['$stateParams', 'NavigationFactory', 'DataFactory'];

    function MovieDetailsCtrl($stateParams, NavigationFactory, DataFactory) {
        var vm = this;

        vm.movie = null;
        vm.navigateBack = navigateBack;

        init();
        /////
        function init() {
            if ($stateParams.id) {
                DataFactory.fetchMovie($stateParams.id).then(function (response) {
                    vm.movie = response.data;
                }, function (error) {
                    console.error(error);
                });
            } else {
                console.error('movie id is not valid');
            }
        }

        function navigateBack() {
            NavigationFactory.gotoList();
        }
    }
} ());