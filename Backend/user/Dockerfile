FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/user-token.jar user-token.jar
EXPOSE 8228
ENTRYPOINT ["java", "-jar", "user-token.jar"]
