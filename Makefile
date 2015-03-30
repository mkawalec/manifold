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
	npm install --ignore-scripts

clean:
	rm -rf ./dist

dev: 
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
