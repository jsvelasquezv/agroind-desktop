var variablesService = angular.module("variablesService", []);

variablesService.service('Variables', function ($http, config, pouchDB) {
var variablesUrl = config.apiUrl + '/variables';
var variablesDB = pouchDB("variablesDB");
// console.log(variablesUrl);

  // Returns one profile
  this.getVariable = function (id) {
    return $http.get(variablesUrl + '/' + id);
  }

  // returns all profiles
  this.getVariables = function () {
    return $http.get(variablesUrl);
  }

  this.newVariable = function (variable) {
    return $http.post(variablesUrl, variable);
  }

  this.editVariable = function (name, optimun_rating, indicators_id) {
    var data = {
      name :name,
      optimun_rating :optimun_rating,
      indicators_id :indicators_id,
    };
    return $http.patch(variablesUrl + '/' + id, data);
  }

  // this.deleteVariable = function (id) {
  //   return $http.delete(variablesUrl + '/' + id);
  // }

  this.saveToLocal = function (variables) {
    return variablesDB.destroy()
      .then(function (response) {
        console.log(response);
        variablesDB = pouchDB("variablesDB");
        variablesToPouch = setIdsToVariables(variables)
        return variablesDB.bulkDocs(variablesToPouch);
      })
      .catch(function (error) {
        console.log(error);
        // return indicatorsDB.bulkDocs(indicatorsToPouch);
      });
  }

  this.loadFromLocal = function () {
    return variablesDB.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  this.localVariablesFromIndicator = function (indicator_id) {
    // Create the index variables/indicator
    var ddoc = {
      _id: '_design/indicatorVariables',
      views: {
        by_indicator: {
          map: function mapFun(doc) {
            emit(doc.indicator_id); 
          }.toString()
        }
      }
    }
    variablesDB.put(ddoc).catch(function (error) {
      if (error.name !== 'conflict') {
        throw error;
      }
    });    
    return variablesDB.query('indicatorVariables/by_indicator', {
      key: parseInt(indicator_id),
      include_docs: true
    });
    // console.log(param);
    // return variablesDB.query(function (doc, emit) {
    //   emit(doc.indicator_id);
    // }, {key: parseInt(param), include_docs: true});
  }

  // Sets the _id property required by pouch
  function setIdsToVariables(variables) {
    var variablesToPouch = [];
    var variableToPouch = {};
    variables.forEach(function (variable, index) {
      variableToPouch = variable;
      variableToPouch._id = variable.id.toString();
      variablesToPouch.push(variableToPouch);
    });
    return variablesToPouch;
  }

});