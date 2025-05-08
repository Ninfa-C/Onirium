import { jwtDecode } from "jwt-decode";
import { logout, saveProfile } from "../redux/slices/userSlice";

const registerUrl = "https://localhost:7067/api/Account/register";

export const RegisterAccount = async (form) => {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Errore nella registrazione. Riprova.");
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const LoginUrl = "https://localhost:7067/api/Account/login";

export const LoginAccount = async (form) => {
  try {
    const response = await fetch(LoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      throw new Error("Errore nel login. Riprova.");
    } else {
      const data = await response.json();
      const localItem = JSON.stringify(data);
      localStorage.setItem("token", localItem);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AutoLogin = () => {
  return async (dispatch) => {
    const tokenRaw = localStorage.getItem("token");
    if (!tokenRaw) return;

    try {
      const getToken = JSON.parse(tokenRaw);
      const tokenJwt = jwtDecode(getToken.token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenJwt.exp > currentTime) {
        dispatch(
          saveProfile({
            name: tokenJwt.name,
            email: tokenJwt.email,
            role: tokenJwt.role,
            expire: tokenJwt.exp,
            isExpired: false,
            profilePic: tokenJwt.profilePic,
          })
        );
        const res = await fetch("https://localhost:7067/api/account/me", {
          headers: {
            Authorization: `Bearer ${getToken.token}`,
          },
        });

        if (res.ok) {
          const user = await res.json();
          dispatch(
            saveProfile({
              name: user.userName,
              email: user.email,
              realName: user.name,
              surname:user.surname,
              role: user.roles?.[0] || tokenJwt.role,
              profilePic: user.profilePictureUrl,
              isExpired: false,
            })
          );
        }
      } else {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    } catch (error) {
      console.error("Errore nell'auto login:", error);
      localStorage.removeItem("token");
      dispatch(logout());
    }
  };
};

export const SetToken = () => {
  return async (dispatch) => {
    let getToken = JSON.parse(localStorage.getItem("token"));
    const token = jwtDecode(getToken.token);
    console.log(token);
    dispatch(
      saveProfile({
        name: token.name,
        email: token.email,
        role: token.role,
        expire: token.exp,
        isExpired: false,
        profilePic: token.profilePic,
        realName: token.realName,
        surname: token.surname,
      })
    );
  };
};

export const Logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};

export const getUserFromToken = () => {
  const tokenRaw = localStorage.getItem("token");
  if (!tokenRaw) return null;

  try {
    const token = JSON.parse(tokenRaw).token;
    const decoded = jwtDecode(token);
    //console.log(decoded.name)
    return decoded.name;
  } catch (e) {
    console.error("Errore decodifica token", e);
    return null;
  }
};
