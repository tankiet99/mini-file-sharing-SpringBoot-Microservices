FROM openjdk:11
VOLUME /tmp
ADD target/mentir-auth-service.jar mentir-auth-service.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar mentir-auth-service.jar"]