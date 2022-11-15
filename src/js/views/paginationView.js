import View from './View';
import iconPack from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log('num', numPages);

    // page 1 and rest of the pages

    if (this._data.currentPage === 1 && numPages > 1) {
      return 'page 1 , others';
    }

    // last page

    if (this._data.currentPage === numPages && numPages > 1) {
      return 'last page';
    }

    // otehr page

    if (this._data.currentPage < numPages) {
      return 'other page';
    }

    // Page 1 and there are no other pages
    return 'only 1 page';
  }
}

export default new PaginationView();
