
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pinimg.com'
            },
            {
                protocol: 'https',
                hostname: 'images.genius.com'
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co'
            },
        ],
      },
};

export default nextConfig;
