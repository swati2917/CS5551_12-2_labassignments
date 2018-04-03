// Declare app level module which depends on views, and components
var app = angular.module('lab5',[]);

app.controller('loginCtrl', function ($scope, $http, $window)
{
    $scope.login = function ()
    {
        var userid = document.getElementById("txt_userid").value;
        var userpass = document.getElementById("txt_userpass").value;
        localStorage.setItem("user", userid);

        if (userid != "" && userpass != "")
        {

            $http({url:"/login/u=" + userid + "&p=" + userpass , method: 'POST'}).then(function(data, status){

                if(data.data == "fail") {
                    alert("User not found");
                }
                else if(data.data == "noMatch")
                {
                    alert("User and/or Password do not match");
                }
                else
                {
                    //alert(data.data);
                    $window.location.href = "/home.html";
                }
            });
        }
        else
        {
            alert("Please enter a Username and Password");
        }
    }
});

app.controller('registerController',function($scope,$http,$window){
    $scope.register = function() {

        var userid = document.getElementById("txt_userid").value;
        var userpass = document.getElementById("txt_userpass").value;

        if (userid != "" && userpass != "")
        {

            $http({url:"/register/u=" + userid + "&p=" + userpass, method: 'POST'}).then(function(data, status){

                if(data.data == "fail") {
                    alert("Insertion Failed");
                }
                else
                {
                    //alert(data.data);
                    $window.location.href = "/index.html";
                }
            });
        }
        else
        {
            alert("Please enter a Username and Password");
        }
    }
});

app.controller('homeCtrl',function($scope,$http){
    $scope.update = function() {

        var user = localStorage.getItem("user");
        var color = document.getElementById("txt_color").value;
        var height = document.getElementById("txt_height").value;
        var weight = document.getElementById("txt_weight").value;

        if (color != "" && height != "" && weight != "" && user != "") {

            $http({url: "/update/u=" + user + "&c=" + color + "&h=" + height + "&w=" + weight, method: 'POST'}).then(function (data, status) {
                if(data.data == "success") {
                    alert("Insertion Succeeded");
                    $scope.init();
                }
            });
        }
    }

    $scope.delete = function() {

        var user = localStorage.getItem("user");

        if (user != "") {

            $http({url: "/delete/u=" + user, method: 'POST'}).then(function (data, status) {
                if(data.data == "success") {
                    alert("Deletion Succeeded");
                    $scope.init();
                }
            });
        }
    }

    $scope.init = function ()
    {
        var user = localStorage.getItem("user");

        if (user != "") {

            $http({url:"/get/u=" + user, method: 'POST'}).then(function(data, status){
                if(data.data == "fail") {
                    alert("Reteival Failed");
                }
                else
                {
                    //alert(data.data.Username);
                    $scope.user = data.data.Username;
                    $scope.color = data.data.Color;
                    $scope.height = data.data.Height;
                    $scope.weight = data.data.Weight;
                    $scope.amazon = data.data.Amazon;
                }

            });
        }
    }
});