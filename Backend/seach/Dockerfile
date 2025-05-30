FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/search-service.jar search-service.jar
EXPOSE 8448
ENTRYPOINT ["java", "-jar", "search-service.jar"]
