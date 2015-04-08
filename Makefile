ESLINT = node_modules/.bin/eslint
WEBPACK = node_modules/webpack/bin/webpack.js

.PHONY: clean build install dev lint lint-quiet test

build:
	make clean
	$(WEBPACK) --optimize-minimize \
		--optimize-occurence-order \
		--devtool source-map \
		--verbose \
		--display-chunks \
		--bail

install:
	export $(cat .env|xargs)
	npm install --python=$(PYTHON) --ignore-scripts

clean:
	rm -rf ./dist

start-docker:
	fig up -d postgres

migrate:
	export $(cat .env|xargs)
	mariner migrate up

init:
	make install
	make start-docker
	make migrate
	fig stop postgres

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
