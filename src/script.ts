import './input.css';

const mainBanner = document.getElementById("main_banner") as HTMLElement;
const category_wrapper = document.getElementById("category_wrapper") as HTMLElement;
const pathnameSecond = window.location.pathname.split('/');
if (pathnameSecond.includes('entry')) {
  mainBanner.classList.add("hidden");
  category_wrapper.classList.add("cat_entry_top");
}
// function isEntryPage() {
//   const pathnameSecond = window.location.pathname.split('/');
//   return pathnameSecond.includes('entry');
// }

const codeBlocks = document.getElementsByTagName("code");
const codeTopBar = `
  <div class="code_wrapper">
    <div class="code_red code_dot"></div>
    <div class="code_yellow code_dot"></div>
    <div class="code_green code_dot"></div>
  </div>
`;

for(const codeBlock of codeBlocks) {
  const codes = codeBlock.innerHTML;
  codeBlock.innerHTML = codeTopBar + codes;
}

const sidebar = document.getElementById("sidebar") as HTMLElement;
function openSidebar() {
  sidebar.classList.remove('-translate-x-[100%]');
  sidebar.classList.add('translate-x-0');
}
function closeSidebar() {
  sidebar.classList.remove('translate-x-0');
  sidebar.classList.add('-translate-x-[100%]');
}
document.getElementById("closeSidebarBtn")!.addEventListener("click", closeSidebar);
document.getElementById("openSidebarBtn")!.addEventListener("click", openSidebar);

// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");

// function hoverSearch() {
//   searchBtn.searchBtn("style", "display: none");
//   searchInput.setAttribute("style", "display: flex");
// }

export function onClickWriteBtn() {
  const win: Window = window;
  const hostname = win.location.hostname;
  win.location = "https://" + hostname + "/manage/post";
}

export function onClickSettingBtn() {
  const win: Window = window;
  const hostname = win.location.hostname;
  win.location = "https://" + hostname + "/manage";
}
document.getElementById("writeBtn")!.addEventListener("click", onClickWriteBtn);
document.getElementById("settingBtn")!.addEventListener("click", onClickSettingBtn);


// toc
const toc = document.getElementById("toc") as HTMLElement;

const headers = document.querySelectorAll(".article_content h2, .article_content h3, .article_content h4[data-ke-size]");

function setPaddingByTitle(h: string) {
  switch (h) {
    case 'h3':
      return '0.75rem'
    case 'h4':
      return '1.5rem'
    default:
      return '';
  }
}
let newHTML = `<div class="toc_left_border"></div>`;
for (let idx = 0; idx < headers.length; idx++) {
  const header = headers[idx];
  const title = header.textContent;
  const id: string = 'headerId_' + idx;
  header.setAttribute('id', id);
  const tocListHTML = `
  <li style="margin-top:0.375rem; margin-bottom:0.375rem; margin-left:${setPaddingByTitle(header.localName)};">
    <a href="#${id}" class="toc_hovereffect">${title}</a>
  </li>
  `;
  newHTML += tocListHTML;
}
if(headers.length) toc.innerHTML = newHTML;


// Sidebar Interaction Observe
const section_toc = toc.parentNode as HTMLElement;
const section_category = document.getElementById("category")!.parentNode as HTMLElement;

const sidebar_io_callback: IntersectionObserverCallback = (entries) => {
  entries.forEach(entry => {
    const isIntersecting = entry.isIntersecting;
    if (isIntersecting || pathnameSecond[1] === "") {
      section_toc.classList.remove('intersec_toc_fixed')
      section_category.classList.remove('intersec_cat_fixed')
    }
    else {
      section_toc.classList.add('intersec_toc_fixed')
      section_category.classList.add('intersec_cat_fixed')
    }
  })
}
const sidebar_io = new IntersectionObserver(sidebar_io_callback, {rootMargin: '32px'})
const nav_header = document.getElementById('header') as HTMLElement;
sidebar_io.observe(nav_header);

// Headers Interaction Observe
const headers_io_callback: IntersectionObserverCallback = (entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.intersectionRect.x === 0) console.log(entry);
  })
}
const headers_io = new IntersectionObserver(headers_io_callback)
for (const header of headers) {
  headers_io.observe(header);
}

// sidebar add dash
const link_sub_item = document.getElementsByClassName('link_sub_item');
for (const i of link_sub_item) {
  const inner = i.innerHTML
  i.innerHTML = '-' + inner;
}

// paging
const selected_item = document.querySelector('.selected');
const selected_item_wrapper = selected_item?.parentNode as HTMLElement;
selected_item_wrapper.classList.add('paging_selected');

// hide 
const another_category = document.querySelector<HTMLElement>('.another_category');
another_category!.style.display = 'none';
