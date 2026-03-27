import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector(".gallery");

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

        <div class="info">
          <p class="info-item"><b>Likes</b> ${img.likes}</p>
          <p class="info-item"><b>Views</b> ${img.views}</p>
          <p class="info-item"><b>Comments</b> ${img.comments}</p>
          <p class="info-item"><b>Downloads</b> ${img.downloads}</p>
        </div>
      </li>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
}

export function showLoader() {
  const loader = document.querySelector(".loader");
  if (loader) loader.classList.add("active");
}

export function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) loader.classList.remove("active");
}

export function showLoadMoreButton() {
  const btn = document.querySelector(".load-more");
  if (btn) btn.classList.add("active");
}

export function hideLoadMoreButton() {
  const btn = document.querySelector(".load-more");
  if (btn) btn.classList.remove("active");
}