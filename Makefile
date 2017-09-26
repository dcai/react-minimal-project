all: install_npm_packages
install_npm_packages:
	# yarn install --ignore-optional
	npm install --no-optional
build:
	npm run build
setup:
	heroku config:set NPM_CONFIG_PRODUCTION=false
deploy:
	git push heroku master
