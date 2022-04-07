import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	val kotlinVersion = "1.6.10"

	kotlin("jvm") version kotlinVersion
	kotlin("kapt") version kotlinVersion
	kotlin("plugin.spring") version kotlinVersion apply false
	kotlin("plugin.jpa") version kotlinVersion apply false

	id("org.springframework.boot") version "2.6.3"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"

	id("org.asciidoctor.convert") version "1.5.8"
	id("com.epages.restdocs-api-spec") version "0.16.0"

	idea
}

java.sourceCompatibility = JavaVersion.VERSION_11
java.targetCompatibility = JavaVersion.VERSION_11

allprojects {

	group = "com.hyecheon"
	version = "1.0.0"
	repositories {
		mavenCentral()
	}
}

subprojects {
	apply {
		plugin("kotlin")
		plugin("kotlin-kapt")
		plugin("kotlin-spring")
		plugin("kotlin-jpa")

		plugin("org.springframework.boot")
		plugin("io.spring.dependency-management")

		plugin("org.asciidoctor.convert")
		plugin("com.epages.restdocs-api-spec")

	}
	configurations {
		compileOnly {
			extendsFrom(configurations.annotationProcessor.get())
		}
	}

	dependencies {
		implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
		implementation("org.jetbrains.kotlin:kotlin-reflect")
		implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	}

	tasks.withType<KotlinCompile> {
		kotlinOptions {
			freeCompilerArgs = listOf("-Xjsr305=strict")
			jvmTarget = "11"
		}
	}

	tasks.withType<Test> {
		useJUnitPlatform()
	}

}