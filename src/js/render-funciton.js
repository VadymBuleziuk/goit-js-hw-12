export const photoList = document.querySelector('.gallery');
export const createImgList = imgInfo => {
  return `
  <div class="photo-el">
  <a href="${imgInfo.largeImageURL}">
    <img class="mini-image" src="${imgInfo.webformatURL}" alt="${imgInfo.tags}">
  </a>
  <div class="photo-descr">
  <div class="descr-el"><h2 class="descr-header">Likes</h2><p class="descr-text">${imgInfo.likes}</p></div>
  <div class="descr-el"><h2 class="descr-header">Views</h2><p class="descr-text">${imgInfo.views}</p></div>
  <div class="descr-el"><h2 class="descr-header">Comments</h2><p class="descr-text">${imgInfo.comments}</p></div>
  <div class="descr-el"><h2 class="descr-header">Downloads</h2><p class="descr-text">${imgInfo.downloads}</p></div>
  </div>
  </div>`;
};
