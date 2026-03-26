import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions.js";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let query = "";
let page = 1;
let totalHits = 0;

function updateLoadMoreButton() {
  const totalPages = Math.ceil(totalHits / 15);
  if (page >= totalPages) {
    hideLoadMoreButton();
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  } else {
    showLoadMoreButton();
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    updateLoadMoreButton();
    form.reset();
  } catch (error) {
    iziToast.error({ message: "Something went wrong. Please try again later." });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;

  hideLoadMoreButton(); 
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits && data.hits.length > 0) {
      createGallery(data.hits);

      const cards = document.querySelectorAll(".gallery-item");
      if (cards.length) {
        const { height } = cards[cards.length - 1].getBoundingClientRect();
        window.scrollBy({ top: height * 2, behavior: "smooth" });
      }
    }

    updateLoadMoreButton();
  } catch (error) {
    iziToast.error({ message: "Something went wrong. Please try again later." });
  } finally {
    hideLoader();
  }
});