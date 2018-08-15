import axios from 'axios';

function getBlogPostInfo(blogCategory, url, maxCards) {
  const cards = [];
    
  return axios
    .get(url)
    .then(response => response.data)
    .then(data => {
      const promises = [];
      for (let i = 0; i < maxCards; i++) {
        const card = {};
        const wpContent = data[i]._links['wp:featuredmedia'][0].href;

        card.title = data[i].title.rendered;

        const shortExcerpt = data[i].excerpt.rendered.substr(0, 100);
        const finalExcerpt = `${shortExcerpt }...</p>`;

        card.excerpt = finalExcerpt;
        card.url = data[i].link;

        promises.push(axios.get(wpContent)
          .then(response => response.data)
          .then(data => {
            card.img = data.media_details.sizes.medium.source_url;
            cards.push(card);
          })
          .catch(error => {
            console.log(error);
          }));
      }

      return Promise.all(promises);
    })
    .then(() => cards)
    .catch(error => {
      console.log(error);
    });
}
export { getBlogPostInfo };
