import adapter from '@sveltejs/adapter-static';

const isVercel = process.env.VERCEL === "1";

export default {
    kit: {
        adapter: adapter(),
        paths: {
            base: isVercel ? '' : '/CatJuegos'
        },
        prerender: {
            handleMissingId: 'ignore',
            handleUnseenRoutes: 'ignore'
        }
    }
};
