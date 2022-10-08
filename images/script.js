"use strict";
const mainBanner = document.getElementById("main_banner");
const pathnameSecond = window.location.pathname.split('/');
if (pathnameSecond[1] !== "" && !pathnameSecond.includes('category')) {
    mainBanner.classList.add("hidden");
}
const codeBlocks = document.getElementsByClassName("hljs");
const codeTopBar = `
  <div class="absolute flex top-2 left-2">
    <div class="code_red code_dot"></div>
    <div class="code_yellow code_dot"></div>
    <div class="code_green code_dot"></div>
  </div>
`;
console.log(codeBlocks.length);
for (const codeBlock of codeBlocks) {
    const codes = codeBlock.innerHTML;
    codeBlock.innerHTML = codeTopBar + codes;
}
const sidebar = document.getElementById("sidebar");
function openSidebar() {
    sidebar.classList.remove('-translate-x-[100%]');
    sidebar.classList.add('translate-x-0');
}
function closeSidebar() {
    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('-translate-x-[100%]');
}
// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");
// function hoverSearch() {
//   searchBtn.searchBtn("style", "display: none");
//   searchInput.setAttribute("style", "display: flex");
// }
function onClickWriteBtn() {
    const win = window;
    const hostname = win.location.hostname;
    win.location = "https://" + hostname + "/manage/post";
}
function onClickSettingBtn() {
    const win = window;
    const hostname = win.location.hostname;
    win.location = "https://" + hostname + "/manage";
}
// toc
const toc = document.getElementById("toc");
const headers = document.querySelectorAll(".article_content h2, .article_content h3, .article_content h4");
function setPaddingByTitle(h) {
    switch (h) {
        case 'h3':
            return '0.75rem';
        case 'h4':
            return '1.5rem';
        default:
            return '';
    }
}
let newHTML = `<div class="toc_left_border"></div>`;
for (let idx = 0; idx < headers.length; idx++) {
    const header = headers[idx];
    const title = header.textContent;
    const id = 'headerId_' + idx;
    header.setAttribute('id', id);
    const tocListHTML = `
  <li style="margin-top:0.375rem; margin-bottom:0.375rem; margin-left:${setPaddingByTitle(header.localName)};">
    <a href="#${id}">${title}</a>
  </li>
  `;
    newHTML += tocListHTML;
}
if (headers.length)
    toc.innerHTML = newHTML;
// Sidebar Interaction Observe
const section_toc = toc.parentNode;
const section_category = document.getElementById("category").parentNode;
const sidebar_io_callback = (entries) => {
    entries.forEach(entry => {
        const isIntersecting = entry.isIntersecting;
        if (isIntersecting || pathnameSecond[1] === "") {
            section_toc.classList.remove('intersec_toc_fixed');
            section_category.classList.remove('intersec_cat_fixed');
        }
        else {
            section_toc.classList.add('intersec_toc_fixed');
            section_category.classList.add('intersec_cat_fixed');
        }
    });
};
const sidebar_io = new IntersectionObserver(sidebar_io_callback, { rootMargin: '32px' });
const nav_header = document.getElementById('header');
sidebar_io.observe(nav_header);
// Headers Interaction Observe
const headers_io_callback = (entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.intersectionRect.x === 0)
            console.log(entry);
    });
};
const headers_io = new IntersectionObserver(headers_io_callback);
for (const header of headers) {
    headers_io.observe(header);
}
