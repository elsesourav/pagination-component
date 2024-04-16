class Pages {
   constructor(maxPages, pagesElement, clickCallback) {
      this.maxPages = maxPages;
      this.pagesElement = pagesElement;
      this.clickCallback = clickCallback;
      this.current = 0;
      this.possible = 0;
      this.nextIcon = "sbi-dots-three-horizontal";
      this.pages = [];
      this.#createPages();
      this.#pageEventListener();
   }

   #createHtmlPage(valueOrClassName = false) {
      const page = document.createElement("div");
      page.classList.add("page", "show");
      if (valueOrClassName === false) page.classList.add(this.nextIcon);
      else page.innerHTML = valueOrClassName;

      return page;
   }

   #createPages() {
      this.pagesElement.innerHTML = "";
      this.pages = [];

      for (let i = 0; i < this.maxPages; i++) {
         if (i == this.maxPages - 1) {
            this.pages.push(this.#createHtmlPage());
         } else this.pages.push(this.#createHtmlPage(i + 1));
      }
      this.pages[0].classList.add("active");
      this.pages.forEach((page) => {
         this.pagesElement.append(page);
      });
   }

   #updatePages(left, right, start) {
      console.log(`left: ${left}, right: ${right}, start: ${start}`);
      const { possible, maxPages, current, pages, nextIcon } = this;

      // clear page value
      pages.forEach((page) => {
         page.classList.remove(nextIcon, "show", "active");
         page.innerHTML = "";
      });

      pages.forEach((page, i) => {
         const ni = left ? start + i - 1 : start + i;

         if (i == 0 && left) page.classList.add(nextIcon, "show");
         else if (i == maxPages - 1 && right)
            page.classList.add(nextIcon, "show");
         else {
            page.classList.add("show");
            page.innerHTML = ni;
         }
         if (ni === current) page.classList.add("active");
      });
   }

   #pageEventListener() {
      this.pages.forEach((page, i) => {
         page.addEventListener("click", () => {
            const { possible, maxPages, current, pages, nextIcon } = this;

            if (page.classList.contains(nextIcon)) {
               const offset = maxPages - 1;
               const temp = i == 0 ? offset * -1 : offset;

               if (i === 0) {
                  const page1Value = parseInt(pages[1].innerText) - 1;

                  if (page1Value + temp > 0) {
                     this.current = page1Value;
                     this.#updatePages(true, true, page1Value - (maxPages - 3));
                  } else {
                     this.current = Math.max(page1Value, 0);
                     this.#updatePages(false, true, 1);
                  }

               } else {
                  const pageN1Value =
                     parseInt(pages[maxPages - 2].innerText) + 1;

                  if (current + temp + 1 < possible) {
                     this.current = pageN1Value;
                     this.#updatePages(true, true, pageN1Value);
                  } else {
                     this.current = Math.min(current + temp - 1, possible);
                     this.#updatePages(true, false, possible - (maxPages - 2));
                  }
               }
            } else {
               pages.forEach((p) => p.classList.remove("active"));
               this.current = parseInt(page.innerText);
               pages[i].classList.add("active");
            }
            this.clickAction();
         });
      });
   }

   update(possible, current = 0) {
      this.possible = possible;
      this.current = current;
      this.#updatePages(true, true, 6);
   }

   clickAction() {
      this.clickCallback(this.current);
   }
}
