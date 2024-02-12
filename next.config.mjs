/** @type {import('next').NextConfig} */
import withPlugins from "next-compose-plugins";
import withPWAInit from "@ducanh2912/next-pwa";
import runtimeCaching from "next-pwa/cache.js";

// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//         deviceSizes: [640, 768, 1024, 1280, 1536],
//         loader: "custom",
//         path: "/",
//     },
// };

// module.exports = withPlugins(
//     [
//         [
//             withPWA,
//             {
//                 pwa: {
//                     disable: process.env.NODE_ENV === "development",
//                     dest: "public",
//                     runtimeCaching,
//                 },
//             },
//         ],
//     ],
//     nextConfig
// );
const nextConfig = {
    reactStrictMode:true,
    images: {
        deviceSizes: [640, 768, 1024, 1280, 1536],
        loader: "custom",
        path: "/",
    },
};

export default withPlugins(
    [
        [
            withPWAInit,
            {
                pwa: {
                    disable: process.env.NODE_ENV === "development",
                    dest: "public",
                    runtimeCaching,
                },
            },
        ]
    ],
    nextConfig,
)