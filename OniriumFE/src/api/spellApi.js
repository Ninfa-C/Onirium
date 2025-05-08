const Url = "https://localhost:7067/api/Spell"

export const getSpells = async () => {
    try {
      const response = await fetch(`${Url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching spells:', error);
      return [];
    }
  };


  const classUrl = "https://localhost:7067/api/Admin/Class"

  export const getClasses = async () => {
    try {
      const response = await fetch(`${classUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching spells:', error);
      return [];
    }
  };


  const traitUrl = "https://localhost:7067/api/Admin/trait";

export const createTrait = async (traitData) => {
  try {
    const response = await fetch(traitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traitData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating trait:', error);
    return null;
  }
};