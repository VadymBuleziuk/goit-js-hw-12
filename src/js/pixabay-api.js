import * as file2 from './render-funciton';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadingIndicator = document.querySelector('.loader');
export const form = document.querySelector('.js-form');
export const formSubmit = event => {
  event.preventDefault();
  const input = form.elements.input.value.trim();
  if (input === '') {
    iziToast.show({
      theme: 'dark',
      icon: 'icon-person',
      message: 'Please enter data to search',
      position: 'center',
    });
    form.reset();
    return;
  }
  loadingIndicator.style.display = 'inline-block';
  return fetch(
    `https://pixabay.com/api/?key=48328522-58f8fcf940ace01c2f71e55b2&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
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
        return;
      }
      form.reset();
      const galleryTemplate = data.hits
        .map(el => file2.createImgList(el))
        .join('');
      file2.photoList.innerHTML = galleryTemplate;
      const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 500,
      });
      lightbox.refresh();
    })
    .catch(error => {
      loadingIndicator.style.display = 'none';
      console.log(error);
    });
};
