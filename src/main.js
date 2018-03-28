import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import 'babel-polyfill';
import 'materialize-css';

function waitForMaterialize() {
  return new Promise((resolve, reject) => {
      let iterations = 0;
      const handler = window.setInterval(() => {
          iterations++;
          let ma = (window).Materialize;
          if (
              ma.elementOrParentIsFixed &&
              ma.escapeHash &&
              ma.fadeInImage &&
              ma.guid &&
              ma.scrollFire &&
              ma.showStaggeredList &&
              ma.toast &&
              ma.updateTextFields
          ) {
              console.log(`waited ${iterations} iterations for Materialize to finish loading`);
              window.clearInterval(handler);
              resolve();
          }
      }, 1);
  });
}

export async function configure(aurelia) {

  //await aurelia.loader.loadModule("materialize-css/dist/css");
  await waitForMaterialize();

  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))//;

   // Install and configure the plugin
   .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), b => b.useAll())
   .plugin(PLATFORM.moduleName('aurelia-validation'));  

  //  .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'), bridge => {
  //   bridge
  //     .useButton()
  //     .useCollapsible()
  //     .useModal()
  //     .useTabs();
  //  });

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  await aurelia.start();
  aurelia.setRoot(PLATFORM.moduleName('app'));
}
