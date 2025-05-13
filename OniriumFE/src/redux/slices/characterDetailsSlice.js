import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacterById } from "../../api";
import {
  getCharacterAssignment,
  getItemById,
  getSpellById,
} from "../../api/CampaignApi";

export const getCharacterDetails = createAsyncThunk(
  "characterDetails/getCharacterDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCharacterById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCharacterAssign = createAsyncThunk(
  "characterDetails/getCharacterAssign",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCharacterAssignment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUpdatedInventoryItems = createAsyncThunk(
  "characterDetails/getUpdatedInventoryItems",
  async (characterAssign, { rejectWithValue }) => {
    try {
      if (characterAssign.isInventoryUpdated) {
        return characterAssign;
      }
      const updatedInventory = await Promise.all(
        characterAssign.character.inventory.map(async (item) => {
          const response = await getItemById(item.itemId);
          if (!response) {
            throw new Error("Errore nel recupero dell'item");
          }
          return {
            ...item,
            item: response,
          };
        })
      );
      return {
        characterAssign,
        weapons: updatedInventory.filter(
          (i) => i.item?.itemCategory === "Arma"
        ),
        armor: updatedInventory.filter(
          (i) => i.item?.itemCategory === "Armatura"
        ),
        magicItems: updatedInventory.filter(
          (i) => i.item?.itemCategory === "Oggetto Magico"
        ),
        commonItems: updatedInventory.filter(
          (i) =>
            !["Arma", "Armatura", "Oggetto Magico"].includes(
              i.item?.itemCategory
            )
        ),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUpdatedInventoryCategory = createAsyncThunk(
  "characterDetails/getUpdatedInventoryCategory",
  async ({ characterAssign, category }, { rejectWithValue }) => {
    try {
      const updatedItems = await Promise.all(
        characterAssign.character.inventory.map(async (item) => {
          try {
            const response = await getItemById(item.itemId);
            if (!response) return null;
            return { ...item, item: response };
          } catch {
            return null;
          }
        })
      );
      const validItems = updatedItems.filter((i) => i !== null);      
      const filtered = validItems.filter(
        (item) => item.item?.itemCategory === category
      );
      
      return { category, items: filtered };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getSpellsUpdate = createAsyncThunk(
  "characterDetails/getUpdatedSpells",
  async (characterAssign, { rejectWithValue }) => {
    try {
      if (characterAssign.isSpellUpdated) {
        return characterAssign;
      }
      const updatedInventory = await Promise.all(
        characterAssign.character.spells.map(async (item) => {
          const response = await getSpellById(item.spellId);
          if (!response) {
            throw new Error("Errore nel recupero dell'incantesimo");
          }
          return {
            ...item,
            spell: response,
          };
        })
      );
      return {
        ...characterAssign,
        character: {
          ...characterAssign.character,
          spells: updatedInventory,
        },
        isSpellUpdated: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState: {
    character: null,
    weapons: [],
    armor: [],
    magicItems: [],
    commonItems: [],
    loading: false,
    error: null,
    isInventoryUpdated: false,
    isSpellUpdated: false,
  },
  reducers: {
    clearCharacterDetails: (state) => {
      state.character = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharacterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.character = action.payload;
      })
      .addCase(getCharacterDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Errore durante il caricamento";
      })
      .addCase(getCharacterAssign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharacterAssign.fulfilled, (state, action) => {
        state.loading = false;
        state.characterAssign = action.payload;
      })
      .addCase(getCharacterAssign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUpdatedInventoryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpdatedInventoryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.characterAssign = {
          ...action.payload.characterAssign,
          isInventoryUpdated: true,
        };
        state.weapons = action.payload.weapons;
        state.armor = action.payload.armor;
        state.magicItems = action.payload.magicItems;
        state.commonItems = action.payload.commonItems;
      })
      .addCase(getUpdatedInventoryCategory.fulfilled, (state, action) => {
        const { category, items } = action.payload;
        switch (category) {
          case "Arma":
            state.weapons = items;
            break;
          case "Armatura":
            state.armor = items;
            break;
          case "Oggetto Magico":
            state.magicItems = items;
            break;
          default:
            state.commonItems = items;
            break;
        }
      })
      .addCase(getUpdatedInventoryCategory.rejected, (state, action) => {
        state.error =
          action.payload || "Errore nell'aggiornamento della categoria";
      })
      .addCase(getUpdatedInventoryItems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Errore durante l'aggiornamento dell'inventario";
      })
      .addCase(getSpellsUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpellsUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.characterAssign = {
          ...action.payload,
          isSpellUpdated: true,
        };
      })
      .addCase(getSpellsUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Errore durante l'aggiornamento degli incantesimi";
      });
  },
});

export const { clearCharacterDetails } = characterDetailsSlice.actions;
export default characterDetailsSlice.reducer;
