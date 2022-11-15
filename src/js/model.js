import { API_URL } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
    console.log(state);
  } catch (error) {
    throw error;
  }
};

loadSearchResults('pizza');
