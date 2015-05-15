ESLINT = node_modules/.bin/eslint
WEBPACK = node_modules/webpack/bin/webpack.js

.PHONY: clean build install dev lint lint-quiet test

build:
	make clean
	$(WEBPACK) --optimize-minimize \
		--content-base dist/ \
		--colors \
		--progress \
		--optimize-occurence-order \
		--devtool source-map \
		--verbose \
		--display-chunks \
		--bail

install:
	./.install.sh

clean:
	rm -rf ./dist

start-docker:
	docker-compose up -d postgres

migrate:
	./.migrate.sh

setup-hooks:
	./.hooks-setup.sh

init:
	make install
	make start-docker
	make migrate
	docker-compose stop postgres
	make setup-hooks

dev: 
	make install
	make start-docker
	make clean
	NODE_ENV=development $(WEBPACK) --content-base dist/ \
		--debug \
		--watch \
		--devtool eval \
		--progress \
		--colors \
		--verbose \
		--display-chunks \
		--output-pathinfo

server:
	nf start

lint:
	$(ESLINT) -c .eslintrc --ext .js --ext .jsx .

lint-quiet:
	$(ESLINT) -c .eslintrc --ext .js --ext .jsx --quiet .
