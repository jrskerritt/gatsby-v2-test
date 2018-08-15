const lazyLoadImages = require('./src/lazyLoadImages');

const getPolyfills = () => {
  if (!('IntersectionObserver' in window)) {
    require('intersection-observer');
  }
};

exports.onClientEntry = () => {
  getPolyfills();
};

exports.onInitialClientRender = () => {
  new Promise((resolve, reject) =>
    resolve(document.querySelectorAll('img.lazy'))
  ).then(images => lazyLoadImages(images));
};