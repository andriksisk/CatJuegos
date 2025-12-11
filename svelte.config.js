import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV !== 'production';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    paths: {
      base: dev ? '' : '/CatJuegos'
    },
    prerender: {
      entries: ['*']
    }
  }
};
