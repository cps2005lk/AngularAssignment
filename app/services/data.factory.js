(function () {
    "use strict";

    angular
        .module('app')
        .factory('DataFactory', DataFactory);

    DataFactory.$inject = ['HardCodeDataFactory', '$q', 'PersistanceFactory'];

    function DataFactory(HardCodeDataFactory, $q, PersistanceFactory) {
        var movieList = null,
            movieMap = null,
            deferred = {
                list: null,
                details: null,
                add: null,
                character: null
            };

        return {
            fetchMovieList: fetchMovieList,
            fetchMovie: fetchMovie,
            addMovie: addMovie,
            addCharacter: addCharacter
        };
        ///
        function fetchMovieList() {
            if (deferred.list) {
                deferred.list.reject({ 'status': 'cancelled' });
            }
            deferred.list = $q.defer();
            if (movieList !== null) {
                deferred.list.resolve({ 'status': 'success', 'data': movieList });
            } else {
                movieList = PersistanceFactory.retrieve(PersistanceFactory.key_movie_list);
                if (movieList === null) {
                    HardCodeDataFactory.getFileData('data/movie.list.json').then(movieListFetchSuccess, movieListFetchFailed);
                } else {
                    deferred.list.resolve({ 'status': 'success', 'data': movieList });
                }
            }
            return deferred.list.promise;
        }

        function movieListFetchSuccess(response) {
            if (response && response.data && response.data instanceof Array) {
                movieList = response.data;
                PersistanceFactory.persist(PersistanceFactory.key_movie_list, movieList);
                deferred.list.resolve({ 'status': 'success', 'data': movieList });
            } else {
                deferred.list.reject({ 'status': 'error', 'msg': 'not_an_array' });
            }
        }

        function movieListFetchFailed() {
            deferred.list.reject({ 'status': 'error', 'msg': 'no_file' });
        }

        function fetchMovie(id) {
            if (deferred.details) {
                deferred.details.reject({ 'status': 'cancelled' });
            }
            deferred.details = $q.defer();
            if (movieMap !== null) {
                getMovieById(id);
            } else {
                fetchMovieList().then(function (response) {
                    populateMovieMap(response.data);
                    getMovieById(id);
                }, function () {
                    deferred.details.reject({ 'status': 'error', 'msg': 'movie_list_blank' });
                });
            }
            return deferred.details.promise;
        }

        function populateMovieMap(movieList) {
            if (movieList instanceof Array && movieList.length > 0) {
                movieMap = {};
                angular.forEach(movieList, function (movie, idx) {
                    movieMap[movie.id] = movie;
                });
            }
        }

        function getMovieById(id) {
            var movieObj = movieMap[id];
            if (typeof movieObj === "undefined") {
                deferred.details.reject({ 'status': 'error', 'msg': 'no_movie_for_id' });
            } else {
                deferred.details.resolve({ 'status': 'success', 'data': movieObj });
            }
        }

        function addMovie(movieObj) {
            if (deferred.add) {
                deferred.add.reject({ 'status': 'cancelled' });
            }
            deferred.add = $q.defer();
            if (movieList === null || movieMap === null) {
                fetchMovieList().then(function (response) {
                    populateMovieMap(response.data);
                    addToExistingList(movieObj);
                }, function () {
                    deferred.add.reject({ 'status': 'error', 'msg': 'movie_list_blank' });
                });
            } else {
                addToExistingList(movieObj);
            }
            return deferred.add.promise;
        }

        function addToExistingList(movieObj) {
            var movieCopy = angular.copy(movieObj);
            var newId = movieList.length + 1;
            if (typeof movieMap[newId] === "undefined") {
                movieCopy.id = newId;
                movieMap[newId] = movieCopy;
                movieList.push(movieCopy);
                PersistanceFactory.persist(PersistanceFactory.key_movie_list, movieList);
                deferred.add.resolve({ 'status': 'success', 'data': newId });
            } else {
                deferred.add.reject({ 'status': 'error', 'msg': 'id_exists' });
            }
        }

        function addCharacter(characterObj, movieId) {
            if (deferred.character) {
                deferred.character.reject({ 'status': 'cancelled' });
            }
            deferred.character = $q.defer();
            fetchMovie(movieId).then(function (response) {
                var movieObj = response.data;
                movieObj.characters.push(angular.copy(characterObj));
                PersistanceFactory.persist(PersistanceFactory.key_movie_list, movieList);
                deferred.character.resolve({ 'status': 'success', 'data': movieObj });
            }, function (error) {
                deferred.character.reject({ 'status': 'error', 'msg': error.msg });
            });
            return deferred.character.promise;
        }
    }
} ());