/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '*.public.blob.vercel-storage.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'preventrhinoadsai.s3.ap-southeast-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    
    },
    functions: {
        maxDuration: 60,
      },
};

export default config;
