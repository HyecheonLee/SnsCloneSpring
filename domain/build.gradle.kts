import org.springframework.boot.gradle.tasks.bundling.BootJar

dependencies {
	// https://mvnrepository.com/artifact/org.springframework.security/spring-security-core
	implementation("org.springframework.security:spring-security-core")

	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
}

val jar: Jar by tasks
val bootJar: BootJar by tasks

bootJar.enabled = false
jar.enabled = true