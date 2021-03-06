
    var 
        path        = require('path'),
        Q           = require('q'),
        util        = require('util')
    ;
    
    function main(){
    
        var 
            deferred    = Q.defer()
        ;
        
        Q   
            .fcall(function(){ return true; })
            .then(require('./assets/parseWro'))          // returns wro.xml as js object -> wro
            .then(require('./assets/getLessPackages'))   // returns raw less packages & classpath & group-ref dependencies
            .then(require('./assets/putAbsolutePath'))   // returns wro w/classpath replaced by rel to process root path, ie for common resources
            .then(require('./assets/evaluateGroupRef'))  // returns wro with group-ref replaced by original group
            .then(require('./assets/lessCompilation'))   // compiles groups and returns report
            .then(function(report){
                console.log( util.inspect(report, false, null) );
                deferred.resolve({"data": report});
            }, function(err){
                deferred.reject(err);
            })
        ;
        
        return deferred.promise;
        
    }
    
    if(!module.parent) { main(); } else { module.exports = main; }
    
    