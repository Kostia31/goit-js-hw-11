import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/fetchImages';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', searchPhoto);
refs.loadBtn.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', showGallery);

let pageNumber = 0;

const lightbox = new SimpleLightbox('.gallery__link', {
  nav: false,
  close: false,
  showCounter: false,
  captionsData: 'alt',
  captionDelay: 250,
  nav: true,
});

function searchPhoto(evt) {
  evt.preventDefault();

  pageNumber = 1;

  const formData = new FormData(refs.form);

  let valueSearch = '';

  for (const value of formData.values()) {
    valueSearch = value;
  }
  if (!valueSearch) {
    return;
  }
  fetchImages(valueSearch, pageNumber)
    .then(createRenderGallery)
    .catch(error => error);
  clearGallery();
}

function createRenderGallery(photos) {
  const cards = [];
  photos.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      const markupCard = `<div class="photo-card">
 <a class="gallery__link" href="${largeImageURL}"> 
 <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/> 
 </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      cards.push(markupCard);
    }
  );
    refs.gallery.innerHTML += cards.join('');
    bodyScroll()

  refs.loadBtn.style.visibility = 'visible';

  lightbox.refresh();
  Notify.info(`Hooray! We found ${photos.totalHits} images.`);
}

function loadMore() {
  pageNumber += 1;
  const moreSearch = refs.form.firstElementChild.value;

  fetchImages(moreSearch, pageNumber)
    .then(createRenderGallery)
    .catch(error => Notify.failure(error));
  lightbox.refresh();
}

function showGallery(evt) {
  evt.preventDefault();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  refs.loadBtn.style.visibility = 'hidden';
}

function bodyScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
