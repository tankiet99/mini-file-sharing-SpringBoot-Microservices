FROM openjdk:11
VOLUME /tmp
ADD target/mentir-user-service.jar mentir-user-service.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar mentir-user-service.jar"]