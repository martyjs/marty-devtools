BIN = ./node_modules/.bin

.PHONY: bootstrap bootstrap-blink start clean test docs release-docs start-chinwag;

SRC = $(shell find ./app ./injected -type f -name '*.js')

test: lint
	# @$(BIN)/karma start --single-run

bootstrap: bootstrap-blink package.json
	@npm install

bootstrap-blink:
	@git submodule init
	@git submodule foreach git pull

test-watch: lint
	# @$(BIN)/karma start

lint: bootstrap clean
	@$(BIN)/jsxcs $(SRC);
	@$(BIN)/jsxhint $(SRC);

release: test build
	@git add dist && (git diff --exit-code > /dev/null || git commit -m "Rebuilding source")
	@npm version patch
	@git push origin master && git push --tags
	@npm publish

build: lint
	@$(BIN)/browserify --require ./app/index.js  > ./dist/marty-devtools.js

build-watch:
	@$(BIN)/watchify -v --require ./app/index.js -o ./dist/marty-devtools.js

start-chinwag:
	@mkdir -p ./test/fixtures/chinwag/dist
	@node ./test/fixtures/chinwag/app/server &
	@$(BIN)/watchify -v --require ./test/fixtures/chinwag/app/main.js -o ./test/fixtures/chinwag/dist/chinwag.js