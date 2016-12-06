module.exports = {
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "extends": "eslint:recommended",
    "env": {
        "mocha": true,
        "jasmine": true,
        "jquery": true,
        "browser": true,
        "node": true
    },
    "rules": {
        "no-unused-vars": "off",
        "linebreak-style": ["error", "unix"],
        "semi": ["error", "always"],
        "no-console": "off"
    },
    "globals": {
        "console": true
    }
};
