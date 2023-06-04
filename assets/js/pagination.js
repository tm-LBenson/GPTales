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
      prevButton.style.display = 'block';
    }

    if (currentPage === pages.length - 1) {
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'block';
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

  contentDiv.after(prevButton);
  pageNumberButtons.forEach(function (btn) {
    contentDiv.after(btn);
  });
  contentDiv.after(nextButton);

  showPage(0);
};
