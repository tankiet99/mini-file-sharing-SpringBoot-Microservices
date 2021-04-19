package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.repository")
@ComponentScan(basePackages = "com.controller")
@ComponentScan(basePackages = "com.service")
@EnableFeignClients
@EnableEurekaClient
public class FileOperationApplication {

    public static void main(String[] args) {
        SpringApplication.run(FileOperationApplication.class, args);
    }
}
