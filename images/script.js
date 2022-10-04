const mainBanner = document.getElementById("main_banner");
if (window.location.pathname !== "/" || window.location.pathname !== "/category") {
  mainBanner.classList.add("hidden");
  return;
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
console.log('hi');
for(const codeBlock of codeWrappers) {
  const codes = codeBlock.innerHTML;
  codeBlock.innerHTML = codeTopBar + codes;
}

const sidebar = document.getElementById("sidebar");
function openSidebar() {
  sidebar.classList.remove('-translate-x-80');
  sidebar.classList.add('translate-x-0');
}
function closeSidebar() {
  sidebar.classList.remove('translate-x-0');
  sidebar.classList.add('-translate-x-80');
}

// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");

// function hoverSearch() {
//   searchBtn.searchBtn("style", "display: none");
//   searchInput.setAttribute("style", "display: flex");
// }

function onClickWriteBtn() {
  const hostname = window.location.hostname;
  window.location = hostname + "/manage/post";
}

function onClickSettingBtn() {
  const hostname = window.location.hostname;
  window.location = hostname + "/manage";
}
