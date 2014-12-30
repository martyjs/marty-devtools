BIN = ./node_modules/.bin

.PHONY: bootstrap bootstrap-blink start clean test docs release-docs start-chat;

SRC = $(shell find ./app ./injected -type f -name '*.js')

test: lint
	@$(BIN)/karma start --single-run

bootstrap: bootstrap-blink package.json
	@npm install

bootstrap-blink:
	@git submodule init
	@git submodule foreach git pull

test-watch: lint
	# @$(BIN)/karma start

lint: bootstrap clean
	# @$(BIN)/jsxcs $(SRC);
	# @$(BIN)/jsxhint $(SRC);

release: test build
	@git add dist && (git diff --exit-code > /dev/null || git commit -m "Rebuilding source")
	@npm version patch
	@git push origin master && git push --tags
	@npm publish

build:
	@mkdir -p dist
	@$(BIN)/browserify ./app/index.js -t reactify -o ./dist/app.js -d

build-watch:
	@mkdir -p dist
	@$(BIN)/watchify ./app/index.js -o ./dist/app.js -v -t reactify -d

start-chat:
	@mkdir -p ./test/fixtures/chat/dist
	@node ./test/fixtures/chat/app/server &
	@$(BIN)/watchify -v --require ./test/fixtures/chat/app/main.js -o ./test/fixtures/chat/dist/chat.js