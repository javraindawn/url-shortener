setup: bundle-install pull-images pull-dependencies

setup-build: bundle-install rebuild pull-dependencies

pull-dependencies: pull-dependencies-app

bundle-install:
	bundle install --path .bundle/gems

rebuild:
	docker-compose build

start:
	bundle exec docker-sync-stack start

clean:
	bundle exec docker-sync-stack clean

rebuild-angular:
	for i in 1; do (cd src/server/services/frontend/angular && ng build --prod); done;

pull-images:
	docker pull jaraindawn.azurecr.io/url-shortener_app

push-images:
	docker push jaraindawn.azurecr.io/url-shortener_app

logs-app:
	docker-compose logs --tail=25 -f url-shortener_app

pull-dependencies-app:
	@echo "Pulling dependencies from jaraindawn.azurecr.io/url-shortener_app:latest..."
	@docker run --rm -e DBLESS=1 jaraindawn.azurecr.io/url-shortener_app:latest tar -cf - node_modules server/services/frontend/angular/node_modules | tar -xvC src 2>&1 | while read l; do echo -ne "\033[2K\r$$l"; done; echo -ne "...done!\n"

build-app:
	docker-compose build app

deploy: rebuild
	docker push jaraindawn.azurecr.io/url-shortener_app:latest
	ssh -i ${URL_SHORTENER_PRIVATE_KEY} ${URL_SHORTENER_SERVER} './deploy-url-shortener.sh'