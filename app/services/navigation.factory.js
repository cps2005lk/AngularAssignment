(function(){
    "use strict";

    angular
        .module('app')
        .factory('NavigationFactory', NavigationFactory);

    NavigationFactory.$inject = ['$state'];

    function NavigationFactory($state){
        return {
            gotoList: gotoList,
            gotoDetails: gotoDetails,
            gotoAdd: gotoAdd,
        };
        ///
        function gotoList(){
            $state.go("movielist");
        }

        function gotoDetails(movieId){
            $state.go("moviedetails", {
                id: movieId
            });
        }

        function gotoAdd(){
            $state.go("movieadd");
        }
    }
}());