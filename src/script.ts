const mainBanner = document.getElementById("main_banner") as HTMLElement;
const pathnameSecond = window.location.pathname.split('/');
if (pathnameSecond[1]!== "" && !pathnameSecond.includes('category')) {
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

// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");

// function hoverSearch() {
//   searchBtn.searchBtn("style", "display: none");
//   searchInput.setAttribute("style", "display: flex");
// }

function onClickWriteBtn() {
  const win: Window = window;
  const hostname = win.location.hostname;
  win.location = "https://" + hostname + "/manage/post";
}

function onClickSettingBtn() {
  const win: Window = window;
  const hostname = win.location.hostname;
  win.location = "https://" + hostname + "/manage";
}


// toc
const toc = document.getElementById("toc") as HTMLElement;
const headers = document.querySelectorAll(".article_content h2, .article_content h3, .article_content h4");

let newHTML = "";
for (const idx in headers) {
  const title = headers[idx].textContent;
  const id: string = 'headerId_' + idx;
  headers[idx].setAttribute('id', id);
  const tocListHTML = `
  <li class="py-1">
    <a href="#${id}">${title}</a>
  </li>
  `;
  newHTML += tocListHTML;
}
toc.innerHTML = newHTML;