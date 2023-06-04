window.onload = function() {
  var contentDiv = document.getElementById('post-content');
  if (!contentDiv) return;

  var contentHtml = contentDiv.innerHTML;
  var pages = contentHtml.split('<!-- pagebreak -->');

  if (pages.length <= 1) return;

  var currentPage = 0;
  function showPage(pageNumber) {
    contentDiv.innerHTML = pages[pageNumber];
    currentPage = pageNumber;
  }

  var nextButton = document.createElement('button');
  nextButton.textContent = 'Next Page';
  nextButton.onclick = function() {
    if (currentPage < pages.length - 1) {
      showPage(currentPage + 1);
    }
  };

  var prevButton = document.createElement('button');
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
