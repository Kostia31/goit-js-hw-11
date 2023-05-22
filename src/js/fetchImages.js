import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/?';
const KEY = 'key=36643185-3848c2162f0267ea8515c96d2';
const options =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=';


export async function fetchImages(value, page) {
  try {
    const fetch = await axios.get(
      `${BASE_URL}${KEY}&q=${value}&${options}${page}`
    );
    const response = fetch.data;
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
