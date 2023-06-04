console.log('pagination running...');
window.onload = function () {
  let contentDiv = document.querySelector('.post-content');
  if (!contentDiv) return;

  let contentHtml = contentDiv.innerHTML;
  let pages = contentHtml.split('<!-- pagebreak -->');

  if (pages.length <= 1) return;

  let currentPage = 0;

  function createPageButton(pageIndex) {
    let button = document.createElement('button');
    button.textContent = pageIndex + 1;
    button.className = 'pagination-button page-number-button';
    if (pageIndex === currentPage) {
      button.classList.add('selected-page');
    }
    button.onclick = function () {
      showPage(pageIndex);
    };
    return button;
  }

  function createEllipsisButton() {
    let button = document.createElement('button');
    button.textContent = '...';
    button.className = 'pagination-button page-number-button';
    button.disabled = true;
    return button;
  }

  function updatePageButtons(pageNumber) {
    pageNumberButtons.forEach((button) => button.remove());

    pageNumberButtons = [];

    pageNumberButtons.push(createPageButton(0)); // First page
    if (pageNumber > 3) pageNumberButtons.push(createEllipsisButton());

    let start = Math.max(1, pageNumber - 1);
    let end = Math.min(pageNumber + 2, pages.length - 1);
    for (let i = start; i < end; i++) {
      pageNumberButtons.push(createPageButton(i));
    }

    if (pageNumber < pages.length - 4)
      pageNumberButtons.push(createEllipsisButton());
    pageNumberButtons.push(createPageButton(pages.length - 1)); // Last page

    pageNumberButtons.forEach((button) =>
      paginationContainer.insertBefore(button, nextButton),
    );
  }

  function showPage(pageNumber) {
    contentDiv.innerHTML = pages[pageNumber];
    currentPage = pageNumber;

    pageNumberButtons.forEach(function (btn, index) {
      if (btn.textContent === (currentPage + 1).toString()) {
        btn.classList.add('selected-page');
      } else {
        btn.classList.remove('selected-page');
      }
    });

    prevButton.style.display = currentPage === 0 ? 'none' : 'inline';
    nextButton.style.display =
      currentPage === pages.length - 1 ? 'none' : 'inline';

    updatePageButtons(pageNumber);
  }

  let nextButton = document.createElement('button');
  nextButton.textContent = '→';
  nextButton.className = 'pagination-button';
  nextButton.onclick = function () {
    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  };

  let prevButton = document.createElement('button');
  prevButton.textContent = '←';
  prevButton.className = 'pagination-button';
  prevButton.onclick = function () {
    if (currentPage > 0) {
      showPage(currentPage - 1);
    }
  };

  let pageNumberButtons = [];

  let paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';

  paginationContainer.append(prevButton);
  paginationContainer.append(nextButton);

  contentDiv.after(paginationContainer);

  showPage(0);
};
