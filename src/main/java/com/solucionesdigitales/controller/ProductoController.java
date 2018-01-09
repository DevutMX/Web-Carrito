package com.solucionesdigitales.controller;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.solucionesdigitales.carrito.modelo.entidad.Producto;
import com.solucionesdigitales.carrito.servicio.ProductoServicio;

@RestController
@RequestMapping(path="/")
public class ProductoController 
{
	public ObjectMapper map = new ObjectMapper();
	public static final Logger LOG = LoggerFactory.getLogger(ProductoController.class);
	@Autowired
	@Qualifier("productoServicio")
	private ProductoServicio servicio;
	//GET = es para Consultar
	//DELETe = es para eliminar
	//PUT = actualizar
	
	@RequestMapping(path = "producto",method = RequestMethod.POST)
	public @ResponseBody Producto registrar(@RequestBody String productoJSON)
	{
		Producto productoEntity = new Producto();
		try 
		{
			productoEntity = map.readValue(productoJSON, Producto.class);
			LOG.info("Producto Recibido:"+productoEntity);
			servicio.insertarProducto(productoEntity);
			LOG.info("Producto Guardado....");

		}
		catch(IOException e)
		{
			LOG.error(e.getMessage());
		}
		return productoEntity;
	}
	
	@RequestMapping(path = "producto",method = RequestMethod.PUT)
	public @ResponseBody Producto actualizar(@RequestBody String productoJSON)
	{
		Producto productoEntity = new Producto();
		try 
		{
			productoEntity = map.readValue(productoJSON, Producto.class);
			LOG.info("Producto Recibido:" + productoEntity);
			servicio.actualizarProducto(productoEntity);
			LOG.info("Producto actualizado...");
		}
		catch(IOException e)
		{
			LOG.error(e.getMessage());
		}
		return productoEntity;
	}
	
	@RequestMapping(path = "producto",method = RequestMethod.DELETE)
	public @ResponseBody Producto borrar(@RequestBody String productoJSON)
	{
		Producto productoEntity = new Producto();
		try 
		{
			productoEntity = map.readValue(productoJSON, Producto.class);
			LOG.info("Producto Recibido:"+productoEntity);
			servicio.eliminarProducto(productoEntity.getIdProducto());
			LOG.info("Producto eliminado....");
		}
		catch(IOException e)
		{
			LOG.error(e.getMessage());
		}
		return productoEntity;
	}
	
	@GetMapping("producto")
	public @ResponseBody List<Producto> listarProducto(){
		return servicio.listarProductos();
	}
}
