console.log('pagination running...');
window.onload = function() {
  let contentDiv = document.querySelector('.post-content');
  if (!contentDiv) return;

  let contentHtml = contentDiv.innerHTML;
  let pages = contentHtml.split('<!-- pagebreak -->');

  if (pages.length <= 1) return;

  let currentPage = 0;
  function showPage(pageNumber) {
    contentDiv.innerHTML = pages[pageNumber];
    currentPage = pageNumber;
    pageNumberDisplay.textContent = `Page ${pageNumber + 1} of ${pages.length}`;

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
  nextButton.textContent = 'Next Page';
  nextButton.className = 'pagination-button';
  nextButton.onclick = function() {
    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  };

  let prevButton = document.createElement('button');
  prevButton.textContent = 'Previous Page';
  prevButton.className = 'pagination-button';
  prevButton.onclick = function() {
    if (currentPage > 0) {
      showPage(currentPage - 1);
    }
  };

  let pageNumberDisplay = document.createElement('p');
  pageNumberDisplay.className = 'pagination-number';

  let pageNumberSelector = document.createElement('select');
  pageNumberSelector.className = 'pagination-selector';
  for (let i = 0; i < pages.length; i++) {
    let option = document.createElement('option');
    option.textContent = `Page ${i + 1}`;
    option.value = i;
    pageNumberSelector.appendChild(option);
  }
  pageNumberSelector.onchange = function() {
    showPage(parseInt(pageNumberSelector.value));
  };

  contentDiv.after(pageNumberSelector);
  contentDiv.after(pageNumberDisplay);
  contentDiv.after(nextButton);
  contentDiv.before(prevButton);

  showPage(0);
};
