import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import OnlyScroll from 'only-scrollbar';
import { fetchImages } from './js/fetchImages';

// const refs = {
//   form: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadBtn: document.querySelector('.load-more'),
// };

// refs.form.addEventListener('submit', searchPhoto);
// refs.loadBtn.addEventListener('click', loadMore);
// refs.gallery.addEventListener('click', showGallery);

// let pageNumber = 0;
// let showInfo = false;
// refs.loadBtn.style.visibility = 'hidden';



// const lightbox = new SimpleLightbox('.gallery__link', {
//   nav: false,
//   close: false,
//   showCounter: false,
//   captionsData: 'alt',
//   captionDelay: 250,
//   nav: true,
// });

// function searchPhoto(evt) {
//   evt.preventDefault();

//   showInfo = false;
//   pageNumber = 1;

//   const formData = new FormData(refs.form);

//   let valueSearch = '';

//   for (const value of formData.values()) {
//     valueSearch = value;
//   }
//   if (!valueSearch) {
//     return;
//   }
//   fetchImages(valueSearch, pageNumber)
//     .then(createRenderGallery)
//     .catch(error => error);
//   clearGallery();
// }

// function createRenderGallery(photos) {
//   const cards = [];
//   photos.hits.map(
//     ({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) => {
//       const markupCard = `<div class="photo-card">
//  <a class="gallery__link" href="${largeImageURL}"> 
//  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200"/> 
//  </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>`;
//       cards.push(markupCard);
//     }
//   );
//   refs.gallery.innerHTML += cards.join('');
// refs.loadBtn.style.visibility = 'visible';
//   lightbox.refresh();

//   if (photos.hits.length < 40) {
//     refs.loadBtn.style.visibility = 'hidden';
//     Notify.info("We're sorry, but you've reached the end of search results.");
//     return;
//   }
//   informationOfSearch(photos.totalHits);
  
// }

// function informationOfSearch(total) {
//   if (showInfo) {
//     return;
//   }
//   Notify.info(`Hooray! We found ${total} images.`);
//   showInfo = true;
// }

// function loadMore() {
//   pageNumber += 1;
//   const moreSearch = refs.form.firstElementChild.value;

//   fetchImages(moreSearch, pageNumber)
//     .then(createRenderGallery)
//     .catch(error => Notify.failure(error));
//   lightbox.refresh();
// }

// function showGallery(evt) {
//   evt.preventDefault();
// }

// function clearGallery() {
//   refs.gallery.innerHTML = '';
//   refs.loadBtn.style.visibility = 'hidden';
// }



// ________________---------------------------___________________-----------------------________________________

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', searchPhoto);
refs.gallery.addEventListener('click', showGallery);

let pageNumber = 0;
let showInfo = false;

const scroll = new OnlyScroll('.gallery', {
  damping: 1,
});

scroll.eventContainer.addEventListener('scrollEnd', eventHandler);

function eventHandler() {
  pageNumber += 1;
  const moreSearch = refs.form.firstElementChild.value;

  fetchImages(moreSearch, pageNumber)
    .then(createRenderGallery)
    .catch(error => console.log(error));
  lightbox.refresh();
}

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

  showInfo = false;
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
    .catch(error => console.log(error));
  clearGallery();
}

function createRenderGallery(photos) {
  if (photos.hits === []) {
    return
  }
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

  lightbox.refresh();

  if (photos.hits.length < 40) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
  informationOfSearch(photos.totalHits);
}

function informationOfSearch(total) {
  if (showInfo) {
    return;
  }
  Notify.info(`Hooray! We found ${total} images.`);
  showInfo = true;
}

function showGallery(evt) {
  evt.preventDefault();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
