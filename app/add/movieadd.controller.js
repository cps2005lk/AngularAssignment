(function () {
    'use strict';

    angular
        .module('app')
        .controller('MovieAddCtrl', MovieAddCtrl);

    MovieAddCtrl.$inject = ['NavigationFactory', 'DataFactory'];

    function MovieAddCtrl(NavigationFactory, DataFactory) {
        var vm = this;

        vm.navigateBack = navigateBack;
        vm.ratingList = [];
        vm.langList = ["English-US", "English-UK"];
        vm.addMovie = addMovie;
        vm.formData = {};
        vm.characterData = {
            name: '',
            actor: ''
        };
        vm.isAddingMovie = true;

        init();
        /////
        function init() {
            clearFormData();
            for (var i = 1; i <= 10; i++) {
                vm.ratingList.push(i);
            }
            vm.formData.rate = vm.ratingList[0];
        }

        function clearFormData() {
            vm.formData = {
                id: '',
                title: '',
                releasedYear: (new Date()).getFullYear(),
                rate: 0,
                description: '',
                directedBy: '',
                language: vm.langList[0],
                characters: []
            };
        }

        function addMovie() {
            if (vm.isAddingMovie) {//movie
                DataFactory.addMovie(vm.formData).then(function (response) {
                    vm.formData.id = response.data;
                    vm.isAddingMovie = !vm.isAddingMovie;
                }, function (err) {
                    console.error(err);
                });
            } else {//character
                DataFactory.addCharacter(vm.characterData, vm.formData.id).then(function (response) {
                    vm.formData = response.data;
                    vm.characterData.name = '';
                    vm.characterData.actor = '';
                }, function (err) {
                    console.error(err);
                });
            }
        }

        function navigateBack() {
            if (vm.isAddingMovie) {
                NavigationFactory.gotoList();
            } else {
                clearFormData();
                vm.isAddingMovie = !vm.isAddingMovie;
            }
        }
    }
} ());