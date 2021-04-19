FROM openjdk:11
VOLUME /tmp
ADD target/mentir-cloud-gateway-service.jar mentir-cloud-gateway-service.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar mentir-cloud-gateway-service.jar"]