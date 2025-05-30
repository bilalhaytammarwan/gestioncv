FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/opportunity-service.jar opportunity-service.jar
EXPOSE 8338
ENTRYPOINT ["java", "-jar", "opportunity-service.jar"]
