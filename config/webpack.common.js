/**
 * Webpack common build configuration
 *
 * @author Chiho Sin
 */

const webpack = require('webpack');
const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//noinspection JSUnresolvedVariable
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * Webpack show info and base path
 */
const METADATA = {
  title: 'Lokra Platform Web Application Starter',
  baseUrl: '/'
};

//noinspection JSUnresolvedFunction
/**
 * Webpack configuration
 *
 * configuration detail see: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /**
   * Static metadata for index.html
   */
  metadata: METADATA,

  /**
   * Cache generated modules and chunks to improve performance for multiple incremental builds
   *
   * see: http://webpack.github.io/docs/configuration.html#cache
   */
  cache: true,

  /**
   * Entry point for the bundle
   *
   * see: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {

    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.browser.ts'

  },

  /**
   * Options affecting the resolving of modules.
   *
   * see: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /**
     * An array of extensions that should be used to resolve modules.
     *
     * see: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js'],

    /**
     * Make sure root is src
     */
    root: helpers.root('src'),

    /**
     * Remove other default values
     */
    modulesDirectories: ['node_modules']

  },

  /**
   * Options affecting the normal modules.
   *
   * see: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /**
     * An array of applied pre and post loaders.
     *
     * see: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */
    preLoaders: [

      /*
       * Tslint loader support for *.ts files
       *
       * see: https://github.com/wbuchwalter/tslint-loader
       */
      //{test: /\.ts$/, loader: 'tslint-loader', exclude: [helpers.root('node_modules')]},

      /**
       * Source map loader support for *.js files
       *
       * extracts SourceMaps for source files that as added as sourceMappingURL comment,
       * see: https://github.com/webpack/source-map-loader
       */
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular2-material')
        ]
      }

    ],

    /**
     * An array of automatically applied loaders.
     *
     * see: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [

      /**
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * see: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      /**
       * Json loader support for *.json files.
       *
       * see: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      /**
       * Raw loader support for *.css files
       *
       * returns file content as string, see: https://github.com/webpack/raw-loader
       */
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },

      /**
       * Raw loader support for *.html
       *
       * returns file content as string, see: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      }

    ]

  },

  /**
   * Add additional plugins to the compiler.
   *
   * see: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /**
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin(),

    /**
     * Plugin: OccurenceOrderPlugin
     * Description: Varies the distribution of the ids to get the smallest id length
     * for often used ids.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     * See: https://github.com/webpack/docs/wiki/optimization#minimize
     */
    new webpack.optimize.OccurenceOrderPlugin(true),

    /**
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: helpers.reverse(['polyfills', 'vendor'])
    }),

    /**
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),

    /**
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: helpers.packageSort(['polyfills', 'vendor', 'main'])
    })

  ],

  /**
   * Include polyfills or mocks for various node stuff
   *
   * see: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
