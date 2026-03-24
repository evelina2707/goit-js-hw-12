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

form.addEventListener("submit", async e => {
  e.preventDefault();

  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, no images found.",
      });
      return;
    }

    totalHits = data.totalHits;

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (totalPages > 1) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong.",
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    // scroll
    const card = document.querySelector(".gallery-item");
    if (card) {
      const { height } = card.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: "smooth",
      });
    }

    if (page >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      message: "Something went wrong.",
    });
  } finally {
    hideLoader();
  }
});