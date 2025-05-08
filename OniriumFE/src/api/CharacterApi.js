const races = "https://localhost:7067/api/Admin/races";
const skill = "https://localhost:7067/api/Admin/skill";
const stats = "https://localhost:7067/api/Admin/stats";
const classes = "https://localhost:7067/api/Admin/class";
const background = "https://localhost:7067/api/Admin/background";
const items = "https://localhost:7067/api/ItemComtroller";
const spells = "https://localhost:7067/api/Spell";

export const getData = async (query, category = null, params = {}) => {
  let url;
  let method = "GET";
  let body = null;

  switch (query) {
    case "races":
      url = races;
      break;
    case "skill":
      url = skill;
      break;
    case "stats":
      url = stats;
      break;
    case "classes":
      url = classes;
      break;
    case "items":
      url = category
        ? `${items}?category=${encodeURIComponent(category)}`
        : items;
      break;
    case "spells": {
      const searchParams = new URLSearchParams();

      if (params?.level) searchParams.append("level", params.level);
      if (params?.className) searchParams.append("className", params.className);
      if (typeof params?.custom !== "undefined") {
        searchParams.append("custom", params.custom.toString());
      }

      if (params?.multiClass?.length) {
        const serialized = params.multiClass
          .map((mc) => `${encodeURIComponent(mc.name)}:${mc.level}`)
          .join(",");
        searchParams.append("multiClass", serialized);
      }

      url = `${spells}?${searchParams.toString()}`;
      break;
    }
    case "bg":
      url = background;
      break;
    case "selectedClasses": {
      url = `${classes}/selected`;
      method = "POST";
      body = JSON.stringify({
        classIds: params.classIds || [],
        subclassIds: params.subclassIds || [],
      });
      break;
    }
    case "traitPreview": {
      url = "https://localhost:7067/api/Admin/traits/preview";
      method = "POST";
      body = JSON.stringify(params);
      break;
    }
    default:
      break;
  }
  const getToken2 = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken2.token}`,
      },
      ...(body && { body }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};


export const createCharacter = async (formData) => {
  const getToken2 = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch("https://localhost:7067/api/Character/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken2.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Errore nella creazione del personaggio");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Errore in createCharacter:", err);
    throw err;
  }
};

export const getUserCharacters = async () => {
  const getToken2 = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch("https://localhost:7067/api/Character/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken2.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Errore nel recupero dei personaggi");
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error("Errore in getUserCharacters:", err);
    throw err;
  }
};

export const fetchCharacterById = async (id) => {
  const getToken = JSON.parse(localStorage.getItem("token"));
  
  try {
    const response = await fetch(`https://localhost:7067/api/Character/character?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recuperare il personaggio");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Errore fetchCharacterById:", error);
    throw error;
  }
};

