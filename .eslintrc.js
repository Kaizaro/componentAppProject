module.exports = {
    root: true,
    settings: {
        "import/resolver": {
            "babel-module": {
                root: ['./src'],
                alias: {
                    '@components': './src/components',
                    '@containers': './src/containers',
                    '@lib': './src/lib',
                    '@modules': './src/modules',
                    '@assets': './src/assets',
                    '@screens': './src/screens',
                },
            }
        }
    },
    extends: '@react-native-community',
};
