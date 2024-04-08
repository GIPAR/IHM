const setUserDataLocalStorage = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('isLogged', true);
};

export default setUserDataLocalStorage;
