FROM node:12.5.0

RUN echo "deb [check-valid-until=no] http://cdn-fastly.deb.debian.org/debian jessie main" > /etc/apt/sources.list.d/jessie.list
RUN echo "deb [check-valid-until=no] http://archive.debian.org/debian jessie-backports main" > /etc/apt/sources.list.d/jessie-backports.list
RUN sed -i '/deb http:\/\/httpredir.debian.org\/debian jessie-updates main/d' /etc/apt/sources.list
RUN apt-get -o Acquire::Check-Valid-Until=false update \
  && apt-get install -y man postgresql-client-9.4 \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g --quiet \
  pm2@3.5.1 \
  @angular/cli@8.1.0

ENV PROJECT_ROOT /opt/app
ENV FRONTEND_ROOT /opt/app/server/services/frontend/angular

WORKDIR $PROJECT_ROOT

RUN mkdir -p /var/log/app && ln -sf /dev/stdout /var/log/app/app.log

COPY bin /opt/bin

COPY . $PROJECT_ROOT

RUN npm install --quiet

WORKDIR $FRONTEND_ROOT

RUN npm install --quiet

RUN ng build --prod

WORKDIR $PROJECT_ROOT

EXPOSE 80

ENTRYPOINT ["/opt/bin/entrypoint.sh"]
CMD ["/opt/bin/start.sh"]