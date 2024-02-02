import path from 'path';

const rooPath = __dirname;

const config = {
    rooPath,
    publicPath: path.join(rooPath, 'public'),
};

export default config;