import "./input.css";

const mainBanner = document.getElementById("main_banner") as HTMLElement;
const category_wrapper = document.getElementById(
	"category_wrapper"
) as HTMLElement;
const pathnameSecond = window.location.pathname.split("/");
if (pathnameSecond.includes("entry")) {
	mainBanner.classList.add("hidden");
	category_wrapper.classList.add("cat_entry_top");
}
// function isEntryPage() {
//   const pathnameSecond = window.location.pathname.split('/');
//   return pathnameSecond.includes('entry');
// }

// dark mode
const htmlElement = document.documentElement;
if (
	localStorage.theme === "dark" ||
	(!("theme" in localStorage) &&
		window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
	localStorage.theme = "dark";
	htmlElement.classList.add("dark");
} else {
	htmlElement.classList.remove("dark");
}

const darkModeBtn = document.getElementById("darkmodeBtn") as HTMLButtonElement;
darkModeBtn.addEventListener("click", () => {
	if (localStorage.theme === "dark") {
		localStorage.theme = "light";
		htmlElement.classList.remove("dark");
	} else {
		localStorage.theme = "dark";
		htmlElement.classList.add("dark");
	}
});

// code block
const codeBlocks = document.getElementsByTagName("code");
const codeTopBar = `
  <div class="code_wrapper">
    <div class="code_red code_dot"></div>
    <div class="code_yellow code_dot"></div>
    <div class="code_green code_dot"></div>
  </div>
`;

for (const codeBlock of codeBlocks) {
	const codes = codeBlock.innerHTML;
	codeBlock.innerHTML = codeTopBar + codes;
}

// side bar
const sidebar = document.getElementById("sidebar") as HTMLElement;
function openSidebar() {
	sidebar.classList.remove("-translate-x-[100%]");
	sidebar.classList.add("translate-x-0");
}
function closeSidebar() {
	sidebar.classList.remove("translate-x-0");
	sidebar.classList.add("-translate-x-[100%]");
}
document
	.getElementById("closeSidebarBtn")!
	.addEventListener("click", closeSidebar);
document
	.getElementById("openSidebarBtn")!
	.addEventListener("click", openSidebar);

// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");

// function hoverSearch() {
//   searchBtn.searchBtn("style", "display: none");
//   searchInput.setAttribute("style", "display: flex");
// }

// nav button
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
document
	.getElementById("settingBtn")!
	.addEventListener("click", onClickSettingBtn);

// toc
const toc = document.getElementById("toc") as HTMLElement;

const headers = document.querySelectorAll(
	".article_content h2, .article_content h3, .article_content h4[data-ke-size]"
);

function setPaddingByTitle(h: string) {
	switch (h) {
		case "h3":
			return "0.75rem";
		case "h4":
			return "1.5rem";
		default:
			return "";
	}
}
let newHTML = `<div class="toc_left_border"></div>`;
for (let idx = 0; idx < headers.length; idx++) {
	const header = headers[idx];
	const title = header.textContent;
	const id: string = "headerId_" + idx;
	header.setAttribute("id", id);
	const tocListHTML = `
  <li style="margin-top:0.375rem; margin-bottom:0.375rem; margin-left:${setPaddingByTitle(
		header.localName
	)};">
    <a href="#${id}" title="${id}" class="toc_hovereffect">${title}</a>
  </li>
  `;
	newHTML += tocListHTML;
}
if (headers.length) toc.innerHTML = newHTML;

// Sidebar Interaction Observe
const section_toc = toc.parentNode as HTMLElement;
const section_category = document.getElementById("category")!
	.parentNode as HTMLElement;

const sidebar_io_callback: IntersectionObserverCallback = (entries) => {
	entries.forEach((entry) => {
		const isIntersecting = entry.isIntersecting;
		if (isIntersecting || pathnameSecond[1] === "") {
			section_toc.classList.remove("intersec_toc_fixed");
			section_category.classList.remove("intersec_cat_fixed");
		} else {
			section_toc.classList.add("intersec_toc_fixed");
			section_category.classList.add("intersec_cat_fixed");
		}
	});
};
const sidebar_io = new IntersectionObserver(sidebar_io_callback, {
	rootMargin: "32px",
});
const nav_header = document.getElementById("header") as HTMLElement;
sidebar_io.observe(nav_header);

// Headers Interaction Observe
const headers_io_callback: IntersectionObserverCallback = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			for (const toc_header of toc.querySelectorAll(
				"li a"
			) as NodeListOf<HTMLAnchorElement>) {
				if (toc_header.title === entry.target.id)
					toc_header.classList.add("intersectingHeader");
				else toc_header.classList.remove("intersectingHeader");
			}
		} else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
			const target_id = entry.target.id;
			const last_num = target_id.slice(-1);
			const new_last_num = (parseInt(last_num) - 1).toString();
			const new_target_id = target_id.replace(/[0-9]$/, new_last_num);
			for (const toc_header of toc.querySelectorAll(
				"li a"
			) as NodeListOf<HTMLAnchorElement>) {
				if (toc_header.title === new_target_id)
					toc_header.classList.add("intersectingHeader");
				else toc_header.classList.remove("intersectingHeader");
			}
		}
	});
};
const headers_io = new IntersectionObserver(headers_io_callback, {
	rootMargin: "0px 0px -99.9%",
});
for (const header of headers) {
	headers_io.observe(header);
}

// sidebar add dash
const link_sub_item = document.getElementsByClassName("link_sub_item");
for (const i of link_sub_item) {
	const inner = i.innerHTML;
	i.innerHTML = "-" + inner;
}

// paging
const selected_item = document.querySelector(".selected");
const selected_item_wrapper = selected_item?.parentNode as HTMLElement;
if (!!selected_item_wrapper && selected_item_wrapper.tagName === "A")
	selected_item_wrapper.classList.add("paging_selected");

// hide
const another_category =
	document.querySelector<HTMLElement>(".another_category");
if (!!another_category) another_category!.style.display = "none";

// to top
const scrolltoTopBtn = document.getElementById("scrolltoTopBtn") as HTMLElement;
scrolltoTopBtn.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
