package com.solucionesdigitales.webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.solucionesdigitales.webapp.Application;

@SpringBootApplication
@ComponentScan(basePackages = {"com.solucionesdigitales"})
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
