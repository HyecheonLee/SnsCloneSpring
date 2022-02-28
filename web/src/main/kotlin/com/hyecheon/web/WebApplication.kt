package com.hyecheon.web

import com.hyecheon.domain.entity.EntityConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication(
	scanBasePackageClasses = [EntityConfig::class],
	scanBasePackages = ["com.hyecheon.web"]
)
class WebApplication

fun main(args: Array<String>) {
	runApplication<WebApplication>(*args)
}
