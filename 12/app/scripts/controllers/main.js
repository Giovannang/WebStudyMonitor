'use strict'

/**
 * @ngdoc function
 * @name testApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testApp
 */

var urlTemplate = "http://bea.ep.corp.local/BaseActivites/openUrl.jsp?mode=read&amp;currentModel=etude&amp;idActivite=";
var BEAUrl = "http://bea.ep.corp.local/BaseActivites/jspCommon/mediator.jsp";
//var studiesCreatedPath = "..\\..\\Config\\Studies_Created.csv";
var studiesCreatedPath ="C:\\Web\\TEST\\12\\Config\\Studies_Created.csv";
var restApiUrlAllStudies = "http://localhost:8080/api/all";
var studiesCreateeed = readTextFile("file:///C:/Web/TEST/12/app/scripts/controllers/Studies_Created.txt");







angular.module('testApp')
  .controller('MainCtrl', function ($window, $scope, $timeout, $interval, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]
    $scope.openStudy = function(){
        alert('Opening your study in W://...');
        
    }
    $scope.createStudy = function(study){
        study.created = 1;
        // initialize ActiveXObject and create an object of Scripting.FileSystemObject.  
        var fso = new ActiveXObject("Scripting.FileSystemObject");  

        // creates a folder with specified name at the specified location  
        fso.CreateFolder("C:\\Web\\myFolder");  

        fso = null;  
        alert('Creating Study in W://...')
    }
    $scope.selectedFiles = []
    $scope.baseBEAUrl = BEAUrl
    $scope.url = urlTemplate
    if (!$scope.studies)
        $http.get(restApiUrlAllStudies)
        .then(function(response) {
            $scope.studies = response.data
            isStudiesCreated($scope.studies);
            }
         );
  });


function isStudyCreated(study){
    for(var i=0; i< studiesCreateeed.length; i++){
        //console.log(studiesCreateeed[i].reference);
        if (studiesCreateeed[i].reference==study.reference){
            //alert("VICTOIRE");
            //study.created = 1;
            return 1;
        }
    }
    return 0;
    
}




function isStudiesCreated(studies){    

    for (var i=0; i< studies.length ; i++){
        studies[i].created = isStudyCreated(studies[i]);
    }
  
/*    studies.forEach(function(study){
        study.created = isStudyCreated(study);
                
    });*/
}




function readTextFile(file)
{
    
    
    var rawFile = new XMLHttpRequest();
    var createdStudies = new Array();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var allTextLines= allText.split('\n');
                
                
                for(var i =0 ; i< allTextLines.length; i++) {
                    var allCases = allTextLines[i].split(";");
                    var studyCreated = new StudyCreated(allCases[0], allCases[1], allCases[2], allCases[3]);
                    createdStudies.push(studyCreated);
                    
                }
                
                
            }
        }
    }
    rawFile.send(null);
   return createdStudies;
    
    
}





function StudyCreated(date, igg, path, reference) {

    this.date = date;

    this.igg = igg;

    this.path = path;

    this.reference = reference;


}




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}