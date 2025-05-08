const BASE_URL = "https://localhost:7067/api/";

async function fetchApi(url, method = "GET", data = null) {
    const getToken2 = JSON.parse(localStorage.getItem("token"));
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken2.token}`,
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const res = await fetch(`${BASE_URL}${url}`, options);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await res.json();
  return result;
}

async function fetchApiWithFile(endpoint, method = 'POST', body) {
    const getToken2 = JSON.parse(localStorage.getItem("token"));
    
    const options = {
        method,
        headers: {
            Authorization: `Bearer ${getToken2.token}`,
        },
        body
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Request failed');
    }

    return response.json();
}

// SESSIONS
export const createSessionAsync = (campaignId, sessionDto) => 
    fetchApi(`Campaign/${campaignId}/sessions`, 'POST', sessionDto);

export const updateSession = (sessionId, sessionDto) => 
    fetchApi(`Campaign/session/${sessionId}`, 'PUT', sessionDto);

export const deleteSession = (sessionId) => 
    fetchApi(`Campaign/session/${sessionId}`, 'DELETE');

export const getSession = (sessionId) => 
    fetchApi(`Campaign/session/${sessionId}`);

export const listSessions = (campaignId) => 
    fetchApi(`Campaign/${campaignId}/sessions`);

// LOCATIONS
export const createLocation = (campaignId, locationDto) => 
    fetchApiWithFile(`Campaign/${campaignId}/locations`, 'POST', locationDto);

export const updateLocation = (locationId, locationDto) => 
    fetchApiWithFile(`Campaign/location/${locationId}`, 'PUT', locationDto);

export const deleteLocation = (locationId) => 
    fetchApi(`Campaign/location/${locationId}`, 'DELETE');

export const getLocation = (locationId) => 
    fetchApi(`Campaign/location/${locationId}`);

export const listLocations = (campaignId) => 
    fetchApi(`Campaign/${campaignId}/locations`);

// NPCs
export const createNpc = (campaignId, npcDto) => 
    fetchApi(`Campaign/${campaignId}/npcs`, 'POST', npcDto); 

export const updateNpc = (npcId, npcDto) => 
    fetchApi(`Campaign/npc/${npcId}`, 'PUT', npcDto);

export const deleteNpc = (npcId) => 
    fetchApi(`Campaign/npc/${npcId}`, 'DELETE');

export const getNpc = (npcId) => 
    fetchApi(`Campaign/npc/${npcId}`);

export const listNpcs = (campaignId) => 
    fetchApi(`Campaign/${campaignId}/npcs`);

// QUESTS
export const createQuest = (campaignId, questDto) => 
    fetchApi(`Campaign/${campaignId}/quests`, 'POST', questDto);

export const updateQuest = (id, questDto) => 
    fetchApi(`Campaign/quests/${id}`, 'PUT', questDto);

export const deleteQuest = (id) => 
    fetchApi(`Campaign/quests/${id}`, 'DELETE');

export const getQuest = (id) => 
    fetchApi(`Campaign/quests/${id}`);

export const listQuests = (campaignId) => 
    fetchApi(`Campaign/${campaignId}/quests`);

// NOTES
export const createNote = (campaignId, noteDto) => 
    fetchApiWithFile(`Campaign/${campaignId}/notes`, 'POST', noteDto);

export const updateNote = (id, noteDto) => 
    fetchApiWithFile(`Campaign/notes/${id}`, 'PUT', noteDto);

export const deleteNote = (id) => 
    fetchApi(`Campaign/notes/${id}`, 'DELETE');

export const getNote = (id) => 
    fetchApi(`Campaign/notes/${id}`);

export const listNotes = (campaignId) => 
    fetchApi(`Campaign/${campaignId}/notes`);

//CAMPAIGN
export const createCampaign = (formData) =>
    fetchApiWithFile('Campaign', 'POST', formData);

export const getUserCampaigns = () => fetchApi("Campaign");

export const getCampaignDetails = (id) => 
    fetchApi(`Campaign/details/${id}`, 'GET');

export const deleCampaign = (id) => 
  fetchApi(`Campaign/${id}`, 'DELETE');

export const updateCampaign = (id, formData) =>
  fetchApiWithFile(`Campaign/${id}`, 'PUT', formData);


//Players
export const getUsers = (users) =>
    fetchApi(`Campaign/players?users=${encodeURIComponent(users)}`);

export const sendPlayerInvite = (inviteRequest) =>
    fetchApi(`Campaign/invite`, "POST", inviteRequest);

export const confirmInvite = (campaignId, token) =>
    fetchApi(`Campaign/confirm?campaignId=${campaignId}&token=${token}`, "POST");


// Character-Player Assignment
export const createCharacterAssignment = (request) =>
    fetchApi(`Campaign/player/assign`, 'POST', request);
  
  export const updateCharacterAssignment = (id, isAlive, notes) =>
    fetchApi(`Campaign/player/assign/${id}`, 'PUT', { isAlive, notes });
  
  export const deleteCharacterAssignment = (id) =>
    fetchApi(`Campaign/player/assign/${id}`, 'DELETE');
  
  export const getCharacterAssignment = (id) =>
    fetchApi(`Campaign/player/assign/${id}`);
  
  export const getCharacterAssignmentsForPlayer = (playerCampaignId) =>
    fetchApi(`Campaign/player/${playerCampaignId}`);



  //ITEMS BY ID
  export const getItemById = (itemId) => {
    return fetchApi(`ItemComtroller/${itemId}`, 'GET');
  };

  //SPELL BY ID
  export const getSpellById = (spellId) => {
    return fetchApi(`Spell/spell/${spellId}`, 'GET');
  };

//UPDATE INVENTORY OR SPELLS

export const addItemToInventory = (id, request) => {
    return fetchApi(`Campaign/${id}/inventory/add`, 'POST', request);
  };

  export const addSpellToChar = (id, request) => {
    return fetchApi(`Campaign/${id}/spells/add`, 'POST', request);
  };

  export const updateItemOrSpell = (id, request) => {
    return fetchApi(`Campaign/${id}/update-prepared`, 'PUT', request);
  };

  export const deleSpellFromChar = (id, request) => {
    return fetchApi(`Campaign/${id}/spells/remove`, 'DELETE', request);
  };

  export const updateCharacterCampaign = (id, formData) =>
    fetchApiWithFile(`Campaign/update/${id}`, 'PUT', formData);


  export const UpdateProfilePic = (data) =>
    fetchApiWithFile("account/update-profile-picture", "PUT", data)

  export const UpdateUserName = (data) =>
    fetchApi("account/update-username" , "PUT", data)

  
  export const UpdateEmail = (data) =>
    fetchApi("account/update-email" , "PUT", data)

  
  export const UpdatePassword = (data) =>
    fetchApi("account/update-password" , "PUT", data)

  
  export const DeleteProfile = (data) =>
    fetchApi("account/delete-profile" , "DELETE", data)