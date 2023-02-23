const setAuthenticated = (authenticated) => {
  localStorage.setItem('authenticated', JSON.stringify(authenticated));
};

const getAuthenticated = () => {
  return localStorage.getItem('authenticated') ? JSON.parse(localStorage.getItem('authenticated')) : false;
};

const deleteAuthenticated = () => {
  localStorage.removeItem('authenticated');
};

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
};

const deleteUser = () => {
  localStorage.removeItem('user');
};

const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

const getToken = () => {
  return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
};

const deleteToken = () => {
  localStorage.removeItem('token');
};

const setLogout = () => {
  deleteAuthenticated();
  deleteUser();
  deleteToken();
};

export {
  setAuthenticated,
  getAuthenticated,
  deleteAuthenticated,
  setUser,
  getUser,
  deleteUser,
  setToken,
  getToken,
  deleteToken,
  setLogout,
};
