import View from './View';
import iconPack from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPaginationClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      console.log(button);
      handler();
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log('num', numPages);

    // page 1 and rest of the pages

    if (this._data.currentPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconPack}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage + 1}</span>
          </button>
        `;
    }

    // last page

    if (this._data.currentPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconPack}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>
        `;
    }

    // otehr page

    if (this._data.currentPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconPack}#icon-arrow-left"></use>
            </svg>
            <span>$Page ${this._data.currentPage + 1}</span>
          </button>
        
        <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconPack}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.currentPage - 1}</span>
          </button>
        `;
    }

    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
