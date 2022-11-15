import iconPack from 'url:../../img/icons.svg';
export default class View {
  _data;
  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    // error check if search is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
            <div>
              <svg>
                <use href="${iconPack}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
     <div class="message">
          <div>
            <svg>
              <use href="${iconPack}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
    </div>`;
  }

  renderSpinner() {
    const markup = `  
      <div class="spinner">
           <svg>
          <use href="${iconPack}#icon-loader"></use>
          </svg>
      </div> `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
