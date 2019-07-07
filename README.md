# UrlShortener

## MacOS Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [RubyGems](https://rubygems.org/)
- [Bundler.io](https://bundler.io/)

## Setting up Local Development
Just run `make setup-build`. This should build install all the dependencies and build the containers for you.

After everything is built, you can run the environment with `make start`.

Any updates done to the codebase would automatically restart the app and reflect the changes.

For the `src/server/services/frontend/angular` app, you need to run `make rebuild-angular` to build the `dist/` files and for the changes to be reflected.

## Deploying to Production
You will need to add your `SSH public key` to the server. (You can get server details from me).

You will also need to set some `environment variables`:
```
export URL_SHORTENER_PRIVATE_KEY=<your ssh private key>
export URL_SHORTENER_SERVER=<the production server ssh conn string>
```
When everything is set up, you can just run `make deploy` to deploy the app to the server.

## The Stack
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Elasticsearch](https://www.elastic.co/)
- [Hapi Framework](https://hapijs.com/)
- [Angular](https://angular.io/)
- [Shorthash](https://github.com/bibig/node-shorthash/blob/master/shorthash.js)