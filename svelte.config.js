import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV !== 'production';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html',
      strict: false
    }),
    appDir: 'app',
    paths: {
      base: dev ? '' : '/CatJuegos'
    },
    prerender: {
      entries: []
    }
  }
};
