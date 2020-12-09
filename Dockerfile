FROM openjdk:12-alpine

COPY TD-Circuit-Boards-1.0-SNAPSHOT-jar-with-dependencies.jar demo.jar

CMD ["java", "-cp", "demo.jar", "RestfulServer"]