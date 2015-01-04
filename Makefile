BIN = ./node_modules/.bin

.PHONY: bootstrap bootstrap-blink start clean test docs release-docs start-chat build devtools-build-watch;

SRC = $(shell find ./app -type f -name '*.js')

test: lint
	@NODE_ENV=test $(BIN)/karma start --single-run

bootstrap: bootstrap-blink package.json
	@npm install

bootstrap-blink:
	@git submodule update --init

test-watch: lint
	@NODE_ENV=test $(BIN)/karma start

lint: bootstrap clean
	@$(BIN)/jsxcs $(SRC);
	@$(BIN)/jsxhint $(SRC);

release:
	@sh ./build/release.sh

zip:
	@zip -r dist/marty-devtools.zip app dist/app.js blink manifest.json LICENSE

build:
	@mkdir -p dist
	@grunt build

build-watch:
	@grunt build-watch

start-chat:
	@mkdir -p ./test/fixtures/chat/dist
	@node ./test/fixtures/chat/app/server &
	@$(BIN)/watchify -v --require ./test/fixtures/chat/app/main.js -o ./test/fixtures/chat/dist/chat.js