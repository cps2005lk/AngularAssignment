(function(){
    "use strict";

    angular
        .module('app')
        .factory('HardCodeDataFactory', HardCodeDataFactory);

    HardCodeDataFactory.$inject = ['$http', '$q', '$timeout'];

    function HardCodeDataFactory($http, $q, $timeout){
        return {
            getFileData: getFileData
        };
        ///

        function getFileData(fileName){
            var deferObj = $q.defer();
            $timeout(function(){
                $http.get(fileName).then(function(data){
                    deferObj.resolve(data);
                }, function(error){
                    deferObj.reject(error);
                });
            }, Math.floor(Math.random()) * 1000);
            return deferObj.promise;
        }
    }
}());