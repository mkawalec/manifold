FROM dockerfile/nodejs

MAINTAINER Michal Kawalec <michal@bazzle.me>

ENV NODE_ENV development

RUN sudo npm install -g gulp knex bower 
RUN sudo apt-get update && sudo apt-get install -y libfreetype6 libfontconfig1

RUN mkdir /code
VOLUME /code
WORKDIR /code
