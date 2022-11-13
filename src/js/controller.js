const recipeContainer = document.querySelector('.recipe');
import iconPack from 'url:../img/icons.svg';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// spinner wheel

const spinnerWheel = function (parentElement) {
  const markup = `  
      <div class="spinner">
           <svg>
          <use href="${iconPack}#icon-loader"></use>
          </svg>
      </div> `;

  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // guard class
    if (!id) return;

    // adding the spinner
    spinnerWheel(recipeContainer);

    //1. geting data from API
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const finalResponse = await response.json();

    // error handle for invalid ID
    if (!response.ok)
      throw new Error(`${finalResponse.message} (${response.status})`);
    // destructuring recipe to readable terms

    let { recipe } = finalResponse.data;
    recipe = {
      id: recipe.id,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };
    console.log(recipe);

    //2. rendering hhtml with obtained data

    const {
      // id,
      imageURL,
      ingredients,
      publisher,
      servings,
      sourceURL,
      title,
      cookingTime,
    } = recipe;

    const renderedHTML = `<figure class="recipe__fig">
          <img src="${imageURL}" crossOrigin = "anonymous" alt="${title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPack}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${iconPack}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${iconPack}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${iconPack}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${iconPack}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${iconPack}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${ingredients
            .map(ing => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${iconPack}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                pasta
              </div>
            </li>`;
            })
            .join('')}
            

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${iconPack}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;

    // emptying the loaded html before appending it with final one

    recipeContainer.innerHTML = '';

    // loading the final html for rendering

    recipeContainer.insertAdjacentHTML('afterbegin', renderedHTML);
  } catch (err) {
    alert(err);
  }
};

// listening for hash change event

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
