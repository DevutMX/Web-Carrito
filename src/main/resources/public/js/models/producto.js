var app = angular.module('appProducto',[]);

app.controller('productoController', function($scope, $http)
{	
	$scope.producto={};
	$scope.productos=[];
	$scope.texto = "";
	$scope.accion = 0;
	
	$scope.verAccion = function(accion)
	{
		return accion === $scope.accion;
	}
	
	$scope.hacerAccion = function(accion)
	{
		$scope.accion = accion;
	}
	
	$scope.resetForm = function ()
    {
		$scope.producto = {};
		$scope.agregarForm.$setPristine();
    };
	
	function mensaje($scope)
	{
		alert($scope.texto);
	}
	
	$scope.verProductos = function()
	{
		$http
		({
			url:'/producto',
			method:"GET"
		}).then(function(response)
		{
			$scope.productos=response.data;
			console.log(response.data);
		}, function(response)
		{
			console.log(response);
		});
	};
	
	$scope.guardarProducto = function(producto)
	{
		$http
		({
			url:'/producto',
			method:"POST",
			data: producto
		}).then(function(response)
		{
			console.log(response.data);
			$scope.resetForm();
			$scope.texto = "Se registro " + producto.nombre + " correctamente.";
			mensaje($scope);
			$scope.verProductos();
			$scope.hacerAccion(0);
		}, function(response)
		{
			console.log(response);
		});
	};
	
	$scope.eliminarProducto = function(producto)
	{
		$http
		({
			url:'/producto',
			method:"DELETE",
			data: producto
		}).then(function(response)
		{
			console.log(response.data);
			$scope.texto = "Se borro " + producto.nombre + " correctamente.";
			mensaje($scope);
			$scope.verProductos();
		}, function(response)
		{
			console.log(response);
		});
	};
	
	$scope.actualizarProducto = function(producto)
	{
		$http
		({
			url:'/producto',
			method:"PUT",
			data: producto
		}).then(function(response)
		{
			console.log(response.data);
			$scope.texto = "Se actualizó a " + producto.nombre + " correctamente.";
			mensaje($scope);
			$scope.producto={};
			$scope.verProductos();
			$scope.hacerAccion(0);
		}, function(response)
		{
			console.log(response);
		});
	};
	
	$scope.preparar = function(producto)
	{
		$scope.producto = producto;
		$scope.hacerAccion(2);
	};
});
