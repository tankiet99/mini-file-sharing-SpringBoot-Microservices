FROM openjdk:11
VOLUME /tmp
ADD target/mentir-eureka-server.jar mentir-eureka-server.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar mentir-eureka-server.jar"]