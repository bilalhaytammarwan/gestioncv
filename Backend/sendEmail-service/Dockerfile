FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/send-email-service.jar send-email-service.jar
EXPOSE 8668
ENTRYPOINT ["java", "-jar", "send-email-service.jar"]
