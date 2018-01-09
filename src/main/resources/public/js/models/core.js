var app = angular.module('myApp', ['ui.bootstrap']);

app.controller(
				'formCtrl',
				function($scope, $http,$window) {
					
					var context = $window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"))
					//path = path.substr(1).split('/'); 
					console.log("-------------- path ------------------")
					console.log(context)
					console.log("-----------------------------------")
					$scope.accion = 0;// 0-consultar|1-registrar|2-modificar|3-eliminar
					$scope.index = 0;
					$scope.producto = {
						nombre : "",
						costo : "",
					// id : makeId()
					};
					$scope.pedido = {};
					// $scope.pedidos=[];
					$scope.pedidos = [ {
						"id" : 1,
						"productos" : [ {
							"id" : 1,
							"nombre" : "pan",
							"costo" : 20
						}, {
							"id" : 2,
							"nombre" : "jamon",
							"costo" : 30
						} ],
						"fechaDeRecepcion" : 1507172680852,
						"fechaDeEntrega" : 1507172680852,
						"costoTotal" : 50,
						"idCliente" : 1
					}, {
						"id" : 2,
						"productos" : [ {
							"id" : 1,
							"nombre" : "pan",
							"costo" : 20
						}, {
							"id" : 2,
							"nombre" : "jamon",
							"costo" : 30
						} ],
						"fechaDeRecepcion" : 1507172680852,
						"fechaDeEntrega" : 1507172680852,
						"costoTotal" : 50,
						"idCliente" : 1
					}, {
						"id" : 3,
						"productos" : [ {
							"id" : 1,
							"nombre" : "pan",
							"costo" : 20
						}, {
							"id" : 2,
							"nombre" : "jamon",
							"costo" : 30
						} ],
						"fechaDeRecepcion" : 1507172680852,
						"fechaDeEntrega" : 1507172680852,
						"costoTotal" : 50,
						"idCliente" : 1
					}, {
						"id" : 4,
						"productos" : [ {
							"id" : 1,
							"nombre" : "pan",
							"costo" : 20
						}, {
							"id" : 2,
							"nombre" : "jamon",
							"costo" : 30
						} ],
						"fechaDeRecepcion" : 1507172680852,
						"fechaDeEntrega" : 1507172680852,
						"costoTotal" : 50,
						"idCliente" : 1
					}, {
						"id" : 5,
						"productos" : [ {
							"id" : 1,
							"nombre" : "pan",
							"costo" : 20
						}, {
							"id" : 2,
							"nombre" : "jamon",
							"costo" : 30
						} ],
						"fechaDeRecepcion" : 1507172680852,
						"fechaDeEntrega" : 1507172680852,
						"costoTotal" : 50,
						"idCliente" : 1
					} ];
					$scope.productos = [ $scope.producto ];

					$scope.save = function() {
						
						if ($scope.accion === 1) {
							$http({
								url : context+'/producto',
								method : "POST",
								data : $scope.productos
							}).then(function(response) {
								console.log(response.data);
								$scope.productos = response.data;
								// console.log(response.status);
								$scope.pedido = {
									productos : $scope.productos
								};
								if (response.status === 200) {
									$scope.productos = [ $scope.producto = {
										nombre : "",
										costo : ""
									} ];
								}
								$scope.pedidos.push($scope.pedido);
								$scope.hacerAccion(0)
							}, function(response) {
								console.log(response);
							});
						} else if ($scope.accion === 2) {							
							$http({
								url : context+'/producto',
								method : "PUT",
								data : $scope.pedidos[$scope.index-1]
							}).then(function(response) {
								console.log(response.data);
								$scope.productos = response.data; // console.log(response.status);
								$scope.pedido = {
									productos : $scope.productos
								};
								if (response.status === 200) {
									$scope.productos = [ $scope.producto = {
										nombre : "",
										costo : ""
									} ];
								}
							}, function(response) {
								console.log(response);
							});
							$scope.hacerAccion(0);
						}
					};

					$scope.modificar = function(i, p) {
						$scope.index =i;
						$scope.productos = p.productos;
					};
					
					$scope.eliminar = function(i, p) {
						console.log(i);
						console.log(p);

						$scope.pedidos.splice(i, 1);

						$http({
							url : context+'/producto',
							method : "DELETE",
							data : p
						}).then(function(response) {
							console.log(response.data);
							$scope.productos = response.data; // console.log(response.status);
							$scope.pedido = {
								productos : $scope.productos
							};
							if (response.status === 200) {
								$scope.productos = [ $scope.producto = {
									nombre : "",
									costo : ""
								} ];
							}

						}, function(response) {
							console.log(response);
						});

					};

					$scope.verAccion = function(accion) {
						return $scope.accion === accion;
					}

					$scope.hacerAccion = function(accion) {
						if (accion == 0) {
							$scope.accion = 0;
							$scope.productos = [ $scope.producto = {
									nombre : "",
									costo : ""
								}];
						} else if (accion == 1) {
							$scope.accion = 1;
						} else if (accion == 2) {
							$scope.accion = 2;
						} else if (accion == 3) {
							$scope.accion = 3;
						}
					}

					$scope.listaPedidos = function() {
						$http({
							url : context+'/producto',
							method : "GET",
						}).then(function(response) {
							console.log(response);
							$scope.pedidos = response.data;

						}, function(response) {
							console.log(response);
						});
					};
					$scope.obtenerPedidoId = function(id) {
						$http({
							url : context+'/producto',
							method : "GET",
							data : {
								id : id
							}
						}).then(function(response) {
							console.log(response);
							$scope.pedidos = response.data;

						}, function(response) {
							console.log(response);
						});
					};

					function makeId() {
						var text = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

						for (var i = 0; i < 3; i++) {
							text += possible.charAt(Math.floor(Math.random()
									* possible.length));
						}
						return text;
					}

					$scope.makeIds = function() {
						var text = "";
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

						for (var i = 0; i < 3; i++) {
							text += possible.charAt(Math.floor(Math.random()
									* possible.length));
						}
						return text;
					}

				});

angular.module('myApp').controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
	  var $ctrl = this;
	  $ctrl.items = ['item1', 'item2', 'item3'];

	  $ctrl.animationsEnabled = true;

	  $ctrl.open = function (size, parentSelector) {
	    var parentElem = parentSelector ? 
	      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
	    var modalInstance = $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title',
	      ariaDescribedBy: 'modal-body',
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      controllerAs: '$ctrl',
	      size: size,
	      appendTo: parentElem,
	      resolve: {
	        items: function () {
	          return $ctrl.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $ctrl.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };

	  $ctrl.openComponentModal = function () {
	    var modalInstance = $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      component: 'modalComponent',
	      resolve: {
	        items: function () {
	          return $ctrl.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $ctrl.selected = selectedItem;
	    }, function () {
	      $log.info('modal-component dismissed at: ' + new Date());
	    });
	  };

	  $ctrl.openMultipleModals = function () {
	    $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title-bottom',
	      ariaDescribedBy: 'modal-body-bottom',
	      templateUrl: 'stackedModal.html',
	      size: 'sm',
	      controller: function($scope) {
	        $scope.name = 'bottom';  
	      }
	    });

	    $uibModal.open({
	      animation: $ctrl.animationsEnabled,
	      ariaLabelledBy: 'modal-title-top',
	      ariaDescribedBy: 'modal-body-top',
	      templateUrl: 'stackedModal.html',
	      size: 'sm',
	      controller: function($scope) {
	        $scope.name = 'top';  
	      }
	    });
	  };

	  $ctrl.toggleAnimation = function () {
	    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
	  };
	});

	// Please note that $uibModalInstance represents a modal window (instance) dependency.
	// It is not the same as the $uibModal service used above.

	angular.module('myApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
	  var $ctrl = this;
	  $ctrl.items = items;
	  $ctrl.selected = {
	    item: $ctrl.items[0]
	  };

	  $ctrl.ok = function () {
	    $uibModalInstance.close($ctrl.selected.item);
	  };

	  $ctrl.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };
	});

	// Please note that the close and dismiss bindings are from $uibModalInstance.

	angular.module('myApp').component('modalComponent', {
	  templateUrl: 'myModalContent.html',
	  bindings: {
	    resolve: '<',
	    close: '&',
	    dismiss: '&'
	  },
	  controller: function () {
	    var $ctrl = this;

	    $ctrl.$onInit = function () {
	      $ctrl.items = $ctrl.resolve.items;
	      $ctrl.selected = {
	        item: $ctrl.items[0]
	      };
	    };

	    $ctrl.ok = function () {
	      $ctrl.close({$value: $ctrl.selected.item});
	    };

	    $ctrl.cancel = function () {
	      $ctrl.dismiss({$value: 'cancel'});
	    };
	  }
	});