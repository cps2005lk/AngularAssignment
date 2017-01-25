(function(){
    "use strict";

    angular
        .module('app')
        .factory('PersistanceFactory', PersistanceFactory);

    PersistanceFactory.$inject = [];

    function PersistanceFactory(){
        return {
            persist: persist,
            retrieve: retrieve,
            remove: remove,
            
            key_movie_list: "key_movie_list"
        };
        ///
        function persist(key, item){
           if (typeof (Storage) !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(item));
            } else {
                alert('Local Storage Not Supported!');
            }
        }

        function retrieve(key){
            var item = window.localStorage.getItem(key);
            return JSON.parse(item);
        }

        function remove(key){
            window.localStorage.removeItem(key);
        }
    }
}());