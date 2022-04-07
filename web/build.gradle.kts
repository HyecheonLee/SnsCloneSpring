val snippetsDir by extra { file("build/generated-snippets") }

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web") {
		// 종속성 제외 추가
		exclude("org.springframework.boot", "spring-boot-starter-tomcat")
	}
	implementation("org.springframework.boot:spring-boot-starter-undertow")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5")
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("com.h2database:h2")
	runtimeOnly("org.mariadb.jdbc:mariadb-java-client")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")


	implementation("org.mapstruct:mapstruct:1.5.0.Beta2")
	kapt("org.mapstruct:mapstruct-processor:1.5.0.Beta2")


	implementation("io.jsonwebtoken:jjwt:0.9.1")

	implementation("com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.8.0")

	implementation("org.springdoc:springdoc-openapi-ui:1.6.6")
	testImplementation("org.springframework.restdocs:spring-restdocs-mockmvc")
	testImplementation("com.epages:restdocs-api-spec-mockmvc:0.16.0")

	implementation(project(":domain"))
}


openapi3 {
	setServer("http://localhost:8080")
	title = "My Api"
	description = "My API description"
	version = "0.1.0"
	format = "yaml"
	delete("src/main/resources/static/docs/openapi3.yaml")
	copy {
		from("build/api-spec")
		into("src/main/resources/static/docs")
	}
}