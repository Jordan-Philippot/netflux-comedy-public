export const getAccessToken = () => {
  const userToken = localStorage.getItem("userToken");
  return userToken;
};

export const getDefaultConfig = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthenticationConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ` + getAccessToken(),
  },
});