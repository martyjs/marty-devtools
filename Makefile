BIN = ./node_modules/.bin

.PHONY: bootstrap bootstrap-blink start clean build;

SRC = $(shell find ./app -type f -name '*.js')

build-watch:
	@grunt build-watch

bootstrap: bootstrap-blink package.json
	@npm install

bootstrap-blink:
	@git submodule update --init

lint: bootstrap clean
	@$(BIN)/jsxcs $(SRC);
	@$(BIN)/jsxhint $(SRC);

release:
	@sh ./build/release.sh

zip:
	@zip -r dist/marty-devtools.zip app dist/*.js blink manifest.json LICENSE

build:
	@mkdir -p dist
	@grunt build
