import iconPack from 'url:../../img/icons.svg';
import { fracty } from '../../../node_modules/fracty/fracty.js';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `  
      <div class="spinner">
           <svg>
          <use href="${iconPack}#icon-loader"></use>
          </svg>
      </div> `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this.#data.imageURL}" crossOrigin = "anonymous" alt="${
      this.#data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.#data.iconPack}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${this.#data.iconPack}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${this.#data.iconPack}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${this.#data.iconPack}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${this.#data.iconPack}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${this.#data.iconPack}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generatemarkupIngredient).join('')}
            

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${this.#data.iconPack}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  #generatemarkupIngredient(ing) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${iconPack}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity ? fracty(ing.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;

    console.log(ing.description);
  }
}

export default new RecipeView();