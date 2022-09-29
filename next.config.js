/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
    domains: ['picsum.photos', 'i.scdn.co', 'newjams-images.scdn.co', 'mosaic.scdn.co'],
  },
};

module.exports = nextConfig;
