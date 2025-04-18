
// requisições da minha API
const apiUrl = import.meta.env.VITE_API_URL;

const login = async (data: any) => {
  try {
    const res = await fetch(apiUrl + "user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res.token) {
      localStorage.setItem("token", JSON.stringify(res.token));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};
const adminLogin = async (data: any) => {
  try {
    const res = await fetch(apiUrl + "admin/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res.token) {
      localStorage.setItem("token", JSON.stringify(res.token));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  localStorage.removeItem("token");
};

const register = async (data: any) => {
  try {
    const res = await fetch(apiUrl + "user/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (res.token) {
      localStorage.setItem("token", JSON.stringify(res.token));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  login,
  logout,
  register,
  adminLogin
};

export default authService;
