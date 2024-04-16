const MAX_PAGE_RENDER = 400;
const MAX_PAGE_BUTTON = 5;
let currentPageIndex = 0;
let maxPagePossible = 11;

const pagesElement = document.getElementById("pages");

const PAGES = new Pages(MAX_PAGE_BUTTON, pagesElement, pageClickAction, pageClickAction);

function pageClickAction(current) {
   // console.log(current);
}

PAGES.update(maxPagePossible, 6);
