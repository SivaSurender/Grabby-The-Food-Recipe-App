import View from './View';
import iconPack from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    "Sorry! we couldn't find that recipe, please select another one and try again.. 👩‍🍳🍳";
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    console.log(results);

    return `<li class="preview">
            <a class="preview__link " href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.imageURL}" alt="${results.title}" crossorigin />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
                
              </div>
            </a>
          </li>`;
  }
}

export default new ResultsView();
