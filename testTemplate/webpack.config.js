const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "test",
    publicPath: "auto",

  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({

        name: "test",
        library: { type: "module" },
        filename: "remoteEntry.js",
        exposes: {
            './web-components': './src/bootstrap.ts',
        },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "http://localhost:3000/remoteEntry.js",

        // },

        shared: share({
          "@angular/common/http": { requiredVersion : 'auto' }, 
          "@angular/core": { requiredVersion:'auto' }, 
          "@angular/common": { requiredVersion:'auto' }, 
          "@angular/router": { requiredVersion:'auto' },
          "rxjs": { requiredVersion:'auto' },
          
          ...sharedMappings.getDescriptors()
        })
        
        
    }),
    sharedMappings.getPlugin()
  ],
};
