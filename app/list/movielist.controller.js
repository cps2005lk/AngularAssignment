(function () {
    'use strict';

    angular
        .module('app')
        .controller('MovieListCtrl', movieListCtrl);

    movieListCtrl.$inject = ['DataFactory', 'NavigationFactory'];

    function movieListCtrl(DataFactory, NavigationFactory) {
        var vm = this;

        vm.onAdd = onAdd;
        vm.movieList = [];
        vm.onMovieClick = onMovieClick;

        init();
        /////
        function init() {
            DataFactory.fetchMovieList().then(function (response) {
                vm.movieList = response.data;
            }, function (error) {
                console.error(error.msg);
            });
        }
        
        function onAdd() {
            NavigationFactory.gotoAdd();
        }

        function onMovieClick(movie) {
            NavigationFactory.gotoDetails(movie.id);
        }
    }
} ());