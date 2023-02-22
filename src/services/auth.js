const setAuthenticated = (authenticated) => {
  localStorage.setItem('authenticated', authenticated);
};

const getAuthenticated = () => {
  return localStorage.getItem('authenticated') ? localStorage.getItem('authenticated') : false;
};

const deleteAuthenticated = () => {
  localStorage.removeItem('authenticated');
};

const setUser = (user) => {
  localStorage.setItem('user', user);
};

const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

const deleteUser = () => {
  localStorage.removeItem('user');
};

const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token') ? localStorage.getItem('token') : null;
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
