DIR_JS = "public/assets/js"
DIR_CSS = "public/assets/css"
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
download_bootstrap_files:
	wget "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" -P "$(DIR_CSS)"
	wget "https://code.jquery.com/jquery-3.2.1.slim.min.js" -P "$(DIR_JS)"
	wget "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" -P "$(DIR_JS)"
	wget "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" -P "$(DIR_JS)"
