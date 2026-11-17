# Build everything and run the Spring Boot app:  docker build -t portfolio . && docker run -p 8080:8080 portfolio
FROM node:22-alpine AS web
WORKDIR /web
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# vite writes to ../backend/src/main/resources/static and export-data to ../backend/src/main/resources
RUN npm run export-data && npm run build

FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn -q -B dependency:go-offline
COPY backend/src ./src
COPY --from=web /backend/src/main/resources ./src/main/resources
RUN mvn -q -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/portfolio-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
