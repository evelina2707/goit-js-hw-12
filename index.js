import{a as b,S as L,i as c}from"./assets/vendor-DQvd0HNi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const w="55146791-665630d79c22972c7e4b14b80",v="https://pixabay.com/api/";async function f(e,t){const s={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await b.get(v,{params:s})).data}const S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function m(e){const t=document.querySelector(".gallery"),s=e.map(o=>`
      <li class="gallery-item">
        <a href="${o.largeImageURL}">
          <img 
            src="${o.webformatURL}" 
            alt="${o.tags}" 
            loading="lazy"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes</b> ${o.likes}</p>
          <p class="info-item"><b>Views</b> ${o.views}</p>
          <p class="info-item"><b>Comments</b> ${o.comments}</p>
          <p class="info-item"><b>Downloads</b> ${o.downloads}</p>
        </div>
      </li>
    `).join("");t.insertAdjacentHTML("beforeend",s),S.refresh()}function q(){const e=document.querySelector(".gallery");e.innerHTML=""}function y(){const e=document.querySelector(".loader");e&&e.classList.add("active")}function g(){const e=document.querySelector(".loader");e&&e.classList.remove("active")}function P(){const e=document.querySelector(".load-more");e&&e.classList.add("active")}function u(){const e=document.querySelector(".load-more");e&&e.classList.remove("active")}const d=document.querySelector(".form"),B=document.querySelector(".load-more");let i="",n=1,h=0;function p(){const e=Math.ceil(h/15);n>=e?(u(),c.info({message:"We're sorry, but you've reached the end of search results."})):P()}d.addEventListener("submit",async e=>{if(e.preventDefault(),i=e.target.elements.searchQuery.value.trim(),!!i){n=1,q(),u(),y();try{const t=await f(i,n);if(!t.hits||t.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}h=t.totalHits,m(t.hits),p(),d.reset()}catch{c.error({message:"Something went wrong. Please try again later."})}finally{g()}}});B.addEventListener("click",async()=>{n+=1,u(),y();try{const e=await f(i,n);if(e.hits&&e.hits.length>0){m(e.hits);const t=document.querySelectorAll(".gallery-item");if(t.length){const{height:s}=t[t.length-1].getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}}p()}catch{c.error({message:"Something went wrong. Please try again later."})}finally{g()}});
//# sourceMappingURL=index.js.map
