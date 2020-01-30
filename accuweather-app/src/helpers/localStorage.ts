export const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('accuweatherAppState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToSessionStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('accuweatherAppState', serializedState);
  } catch (e) {
    console.error('accuweatherAppState saveState Failed', e);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('accuweatherAppStateLocal');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('accuweatherAppStateLocal', serializedState);
  } catch (e) {
    console.error('accuweatherAppStateLocal saveState Failed', e);
  }
};