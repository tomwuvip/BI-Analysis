define(['app', 'window', 'jquery', 'funnel', 'WdatePicker', 'chart', 'dataToChartConfig', 'filters', 'dashboardCustomerServices', 'toastr'], function (app, w, $) {
	//console.dir(app);
	app.register.controller('DashboardCustomerController', ['$location', '$modal', '$filter', '$scope', '$rootScope', '$state', '$interval', '$timeout', 'util', 'charts', 'dataToChartConfig', 'dashboardCustomerServices', 'toastr', function ($location, $modal, $filter, $scope, $rootScope, $state, $interval, $timeout, util, charts, dataToChartConfig, dashboardCustomerServices, toastr) {
	
		$scope.initializeController = function () {
			$scope.loaded = false;//默认未请求到数据
			$scope.getData();

		}


		$scope.getData = function(){
			dashboardCustomerServices.getData({}, function(response, status){
				$scope.loaded = true;//已请求到数据
				//业主
				$scope.owner = response.owner;

				//投诉
				$scope.complaint = response.complaint;

				//报修
				$scope.repair = response.repair;

				//各类型业主比例
				$scope.ownersAllTypes = response.ownersAllTypes;

				//本月预计入伙楼盘
				$scope.thisMonthBuildings = response.thisMonthBuildings;

				//本月投诉、报修情况概览
				$scope.thisMonthReport = response.thisMonthReport;
				$scope.objThisMonthReport = {
					categories: $scope.thisMonthReport.categories,
					columnSeries: $scope.thisMonthReport.columnSeries,
					splineSeries: $scope.thisMonthReport.splineSeries,
					yAxisTitle: ['投诉次数', '保修次数'],
					units:['次', '次'],
					height: 360
				}

				$scope.chartThisMonthReport = charts.mix3($scope.objThisMonthReport);
			}, function(response, status){
				toastr.warning('获取数据失败', '提示', {
					closeButton: true,
					timeOut: 5000
				});
			})
		};


		//转成漏斗数据格式
		$scope.toFunnelData = function(title, data){
			return {
				"options": {
					"chart": {
						"type": "funnel"
					},
					"title": {
						"text": null
					},
					/*tooltip: {
			        	enabled: false
			        },*/
					colors:['#27a9e3', '#28b779', '#fa9507', '#8356ab'],
				},
				"series": [
					{
			            name: title,
			            tooltip: {
				        	enabled: false
				        },
				        dataLabels: {
				        	enabled: false
				        },
			            data: data
			        }
				],
				"size": {
					"height": "280"
				},
				"credits": {
					"enabled": false
				}

			}
		}


	}]);
});

