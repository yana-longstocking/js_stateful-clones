'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = state;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = addProperties(action.extraData, currentState);
      states.push(currentState);
      continue;
    }

    if (action.type === 'removeProperties') {
      currentState = removeKeys(action.keysToRemove, currentState);
      states.push(currentState);
      continue;
    }

    if (action.type === 'clear') {
      currentState = clearProperties(currentState);
      states.push(currentState);
      continue;
    }
  }

  return states;
}

function addProperties(newPropeties, state) {
  return { ...state, ...newPropeties };
}

function removeKeys(keysToRemove, state) {
  const newObject = {};

  for (const key of Object.keys(state)) {
    if (!keysToRemove.includes(key)) {
      newObject[key] = state[key];
    }
  }

  return newObject;
}

function clearProperties() {
  return {};
}

module.exports = transformStateWithClones;
