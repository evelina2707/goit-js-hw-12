import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img 
            src="${img.webformatURL}" 
            alt="${img.tags}" 
            loading="lazy"
          />
        </a>
      </li>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
  loader.classList.add("active");
}

export function hideLoader() {
  loader.classList.remove("active");
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add("active");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove("active");
}