'use strict';
(function(angular){

	var app = angular.module('videoApp', ['ui.bootstrap']);

	app.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

	app.controller('playerCtrl', ['$scope', '$uibModal',
		function($scope, $uibModal){
			var video = document.getElementById('vd');

			video.oncanplay = function(){
				$scope.duration = video.duration;
			}

			//default to start on the full video
			$scope.activeId = 0;

			//hard code list of video clips
			$scope.items =[
				{ title: 'sintel trailer full', type : 'video', thumb: 'thumb.jpg', url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4'},
				{ title: 'sintel trailer clip1', type : 'clip', thumb: 'thumb.jpg', start: 6, end: 20},
				{ title: 'sintel trailer clip2', type : 'clip', thumb: 'thumb.jpg', start: 16, end: 26, tags: 'me'}
			];

			//update video url based on start time and end time
			updateUrl();

			function updateUrl(){
				angular.forEach($scope.items, function(value){
					if(value.type === 'clip'){
						value.url = $scope.items[0].url+'#t='+value.start||0;
						if(value.end){
							value.url += ','+value.end;
						}
					}
				});				
			}
			
			$scope.load = function(idx){
				//play clip
				$scope.activeId = idx;
				video.load();
				video.play();
			};

			$scope.delete = function(idx){
				//delete clip
				var modalDelete = $uibModal.open({
					animation: true,
					templateUrl: 'mDelete.html',
					controller: 'updateCtrl',
					size: 'sm',
					resolve:{
						item: function(){
							return $scope.items[idx];
						},
						idx: function(){
							return idx;
						},
						duration: function(){
							return $scope.duration;
						}
					}
				});

				modalDelete.result.then(function(idx){
					$scope.items.splice(idx, 1);
					if(idx == $scope.activeId){
						$scope.load(0);
					}else if(idx < $scope.activeId){
						$scope.activeId--;
					}					
				});
			};

			$scope.edit = function(idx){
				//edit clip
				var modalEdit = $uibModal.open({
					animation: true,
					templateUrl: 'mEdit.html',
					controller: 'updateCtrl',
					size: 'sm',
					resolve:{
						item: function(){
							return $scope.items[idx];
						},
						idx: function(){
							return idx;
						},
						duration: function(){
							return $scope.duration;
						}
					}
				});

				modalEdit.result.then(function(item){
					updateUrl();
				})
			}

			$scope.add = function(){
				//add clip
				var modalAdd = $uibModal.open({
					animation: true,
					templateUrl: 'mEdit.html',
					controller: 'addCtrl',
					size: 'sm',
					resolve:{
						duration: function(){
							return $scope.duration;
						}
					}
				});

				modalAdd.result.then(function(item){
					$scope.items.push(item);
					updateUrl();
				});
			}

		}
	]);

	app.controller('updateCtrl', ['$scope', '$uibModalInstance', 'item', 'idx', 'duration',
		function($scope, $uibModalInstance, item, idx, duration){
			$scope.item = item;
			$scope.duration = duration;
			$scope.ok = function(){
				$uibModalInstance.close(idx);
			};
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			}
	}]);

	app.controller('addCtrl', ['$scope', '$uibModalInstance', 'duration',
		function($scope, $uibModalInstance, duration){
			$scope.item = {'type': 'clip'};
			$scope.duration = duration;
			$scope.ok = function(){
				$uibModalInstance.close($scope.item);
			};
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			}
	}]);

})(angular);