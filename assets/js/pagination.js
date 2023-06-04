console.log('pagination running...');
window.onload = function () {
  let contentDiv = document.querySelector('.post-content');
  if (!contentDiv) return;

  let contentHtml = contentDiv.innerHTML;
  let pages = contentHtml.split('<!-- pagebreak -->');

  if (pages.length <= 1) return;

  let currentPage = 0;
  function showPage(pageNumber) {
    contentDiv.innerHTML = pages[pageNumber];
    currentPage = pageNumber;

    pageNumberButtons.forEach(function (btn, index) {
      btn.disabled = index === pageNumber;
    });

    if (currentPage === 0) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'inline';
    }

    if (currentPage === pages.length - 1) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'inline';
    }
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

  let pageNumberButtons = pages.map(function (_, index) {
    let button = document.createElement('button');
    button.textContent = index + 1;
    button.className = 'pagination-button page-number-button';
    button.onclick = function () {
      showPage(index);
    };
    return button;
  });

  let paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';

  paginationContainer.append(prevButton);
  pageNumberButtons.forEach(function (btn) {
    paginationContainer.append(btn);
  });
  paginationContainer.append(nextButton);

  contentDiv.after(paginationContainer);

  showPage(0);
};
