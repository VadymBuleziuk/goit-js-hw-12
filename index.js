import{i as l,S as u}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const d=document.querySelector(".gallery"),p=s=>`
  <div class="photo-el">
  <a href="${s.largeImageURL}">
    <img class="mini-image" src="${s.webformatURL}" alt="${s.tags}">
  </a>
  <div class="photo-descr">
  <div class="descr-el"><h2 class="descr-header">Likes</h2><p class="descr-text">${s.likes}</p></div>
  <div class="descr-el"><h2 class="descr-header">Views</h2><p class="descr-text">${s.views}</p></div>
  <div class="descr-el"><h2 class="descr-header">Comments</h2><p class="descr-text">${s.comments}</p></div>
  <div class="descr-el"><h2 class="descr-header">Downloads</h2><p class="descr-text">${s.downloads}</p></div>
  </div>
  </div>`,n=document.querySelector(".loader"),i=document.querySelector(".js-form"),h=s=>{s.preventDefault();const o=i.elements.input.value.trim();if(o===""){l.show({theme:"dark",icon:"icon-person",message:"Please enter data to search",position:"center"}),i.reset();return}return n.style.display="inline-block",fetch(`https://pixabay.com/api/?key=48328522-58f8fcf940ace01c2f71e55b2&q=${o}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(n.style.display="none",r.totalHits===0){l.show({theme:"dark",icon:"icon-person",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"}),i.reset(),d.innerHTML="";return}i.reset();const c=r.hits.map(t=>p(t)).join("");d.innerHTML=c,new u(".gallery a",{captions:!0,captionsData:"alt",captionDelay:500}).refresh()}).catch(r=>{n.style.display="none",console.log(r)})};i.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
