const handleIntersection = (entries, observer) => {
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].intersectionRatio > 0) {
      loadImage(entries[i].target);
    }
  }
};

const loadImage = image => {
  // if the image has a src, it's already been loaded
  if (image.src) {
    return;
  }

  const src = image.dataset.src;
  fetchImage(src).then(() => {
    image.src = src;
  });
};

const fetchImage = url =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject();
    }

    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });

module.exports = images => {
  if (!images) {
    return;
  }

  const options = {
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  for (let i = 0; i < images.length; i++) {
    observer.observe(images[i]);
  }
};