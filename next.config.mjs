/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                'css-loader',
                'postcss-loader',
            ],
        });
        return config;
    },
};

export default nextConfig;