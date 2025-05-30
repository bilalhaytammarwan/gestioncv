FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/service-registry.jar service-registry.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "service-registry.jar"]
