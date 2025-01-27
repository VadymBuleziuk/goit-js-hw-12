import * as file2 from './render-funciton';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const loadingIndicator = document.querySelector('.loader');
export const loadButton = document.querySelector('.load-button');
export const form = document.querySelector('.js-form');
let pageNum = 1;
let lightbox;
let input;
let totalImage;

const fetchImgs = (value, input) => {
  return axios.get(
    `https://pixabay.com/api/?key=48328522-58f8fcf940ace01c2f71e55b2&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${value}&per_page=15`
  );
};
const renderImg = async () => {
  try {
    pageNum = 1;
    const { data } = await fetchImgs(pageNum, input);
    loadingIndicator.style.display = 'none';
    if (data.totalHits === 0) {
      iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
      });
      form.reset();
      file2.photoList.innerHTML = '';
      loadButton.style.display = 'none';

      return;
    }
    const galleryTemplate = data.hits
      .map(el => file2.createImgList(el))
      .join('');
    file2.photoList.innerHTML = galleryTemplate;
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 500,
    });
    totalImage = data.hits.length;
    if (totalImage < 15) {
      loadButton.style.display = 'none';
      iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
      });
      return;
    }
    loadButton.style.display = 'block';
  } catch (err) {
    loadingIndicator.style.display = 'none';
    console.log(err);
  }
};

export const formSubmit = async event => {
  try {
    event.preventDefault();
    loadingIndicator.style.display = 'block';
    input = form.elements.input.value.trim();
    if (input === '') {
      iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        message: 'Please enter data to search',
        position: 'center',
      });
      loadingIndicator.style.display = 'none';
      form.reset();
      return;
    }

    await renderImg();

    loadButton.addEventListener('click', loadMore);
  } catch (err) {
    console.log(err);
  }
};

const loadMore = async event => {
  try {
    event.preventDefault();
    loadingIndicator.style.display = 'block';
    loadButton.style.display = 'none';
    pageNum++;
    input = form.elements.input.value.trim();
    const { data } = await fetchImgs(pageNum, input);
    const galleryTemplate = data.hits
      .map(el => file2.createImgList(el))
      .join('');
    loadingIndicator.style.display = 'none';
    file2.photoList.insertAdjacentHTML('beforeend', galleryTemplate);

    lightbox.refresh();
    totalImage += data.hits.length;
    if (data.hits.length < 15 || totalImage >= data.totalHits) {
      loadButton.style.display = 'none';
      loadButton.removeEventListener('click', loadMore);
      iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
      });
      return;
    }
    loadButton.style.display = 'block';
    const cart = file2.photoList.querySelector('.photo-el');
    const rect = cart.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * rect,
      behavior: 'smooth',
    });
  } catch (err) {
    loadingIndicator.style.display = 'none';

    console.log(err);
  }
};
