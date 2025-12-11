import adapterStatic from '@sveltejs/adapter-static';

export default {
    kit: {
        adapter: adapterStatic(),
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/CatJuegos' : ''
        },
        prerender: {
            handleMissingId: 'ignore',
            handleUnseenRoutes: 'ignore'
        }
    }
};
