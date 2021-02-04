module.exports = {
    // publicPath: '/storytelling-classification/',
    publicPath: process.env.NODE_ENV === "production" ? "/mapbox-vue-example/" : "/",
    indexPath: "/public/index.html",
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8080/class/interactiveMap/video',
    //             ws: true,
    //             changeOrigin: true
    //         }
    //     }
    // }
};