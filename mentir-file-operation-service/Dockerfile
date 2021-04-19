FROM openjdk:11
VOLUME /tmp
#WORKDIR /usr/src
ADD src/main/resources /usr/src
ADD target/mentir-file-operation-service.jar mentir-file-operation-service.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar mentir-file-operation-service.jar"]