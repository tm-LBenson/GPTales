console.log('pagination running...')
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
  }

  let nextButton = document.createElement('button');
  nextButton.textContent = 'Next Page';
  nextButton.onclick = function() {
    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  };

  let prevButton = document.createElement('button');
  prevButton.textContent = 'Previous Page';
  prevButton.onclick = function() {
    if (currentPage > 0) {
      showPage(currentPage - 1);
    }
  };

  contentDiv.after(nextButton);
  contentDiv.before(prevButton);

  showPage(0);
};
