// Title:
module.exports = {
  title: 'ES5Lib',
  description: 'A template for writing large ES5 Javascript libraries',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/es5lib' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',        /* / */
        'license.md',
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
