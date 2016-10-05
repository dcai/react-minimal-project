all: build
build:
	npm run build
setup:
	heroku config:set NPM_CONFIG_PRODUCTION=false
deploy:
	git push heroku master
