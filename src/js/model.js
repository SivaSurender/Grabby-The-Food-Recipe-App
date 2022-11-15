import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    //1. geting data from API

    const finalResponse = await getJSON(`${API_URL}${id}`);

    // destructuring recipe to readable terms

    const { recipe } = finalResponse.data;

    // updating the global state variable
    state.recipe = {
      id: recipe.id,
      imageURL: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceURL: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };
    // console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    //setting the searchquery of the global state to the name ofthe query searched i.e pizza
    state.search.query = query;
    const data = await getJSON(`${API_URL}/?search=${query}`);

    state.search.results = data.data.recipes.map(recp => {
      return {
        id: recp.id,
        imageURL: recp.image_url,
        publisher: recp.publisher,
        title: recp.title,
      };
    });
  } catch (error) {
    throw error;
  }
};

// pagin functionlaity to limit the results displayed per page

export const getResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;

  const firstPage = (page - 1) * state.search.resultsPerPage;
  const lastPage = page * state.search.resultsPerPage;

  return state.search.results.slice(firstPage, lastPage);
};
// console.log(getResultsPage);
