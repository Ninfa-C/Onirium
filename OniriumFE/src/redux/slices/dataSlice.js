// src/redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../api";

export const fetchAllData = createAsyncThunk("data/fetchAllData", async () => {
  //console.log("Fetching data...");
  const [races, classes, stats, skills, background] = await Promise.all([
    getData("races"),
    getData("classes"),
    getData("stats"),
    getData("skill"),
    getData("bg"),
  ]);

  return {
    race: races.data,
    class: classes.data,
    stat: stats.data,
    skills: skills.data,
    background: background.data,
  };
});

export const fetchItemsByCategory = createAsyncThunk(
  "data/fetchItemsByCategory",
  async (category) => {
    const response = await getData("items", category);
    return {
      category,
      items: response.data,
    };
  }
);

export const fetchSpellsByFilter = createAsyncThunk(
  "data/fetchSpellsByFilter",
  async ({ level, className, custom, multiClass = [] }) => {
    const response = await getData("spells", null, {
      level,
      className,
      custom,
      multiClass,
    });
    return response.data;
  }
);

export const fetchTraitPreview = createAsyncThunk(
  "data/fetchTraitPreview",
  async (params) => {
    const response = await getData("traitPreview", null, params);
    return response?.data || [];
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    race: [],
    class: [],
    spell: [],
    item: {},
    stat: [],
    skills: [],
    background: [],
    traitsPreview: [],
    isLoading: false,
  },
  reducers: {
    setAllData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSpells: (state) => {
      state.spell = [];
    },
    resetTraitPreview: (state) => {
      state.traitsPreview = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isLoading = false;
      })
      .addCase(fetchAllData.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
        const { category, items } = action.payload;
        state.item[category] = items;
      })
      .addCase(fetchSpellsByFilter.fulfilled, (state, action) => {
        const incomingSpells = action.payload;
        const existingIds = new Set(state.spell.map((spell) => spell.id));
        const newUniqueSpells = incomingSpells.filter(
          (spell) => !existingIds.has(spell.id)
        );
        state.spell = [...state.spell, ...newUniqueSpells];
      })
      .addCase(fetchTraitPreview.fulfilled, (state, action) => {
        state.traitsPreview = action.payload;
      });
  },
});

export const { setAllData, resetSpells,resetTraitPreview } = dataSlice.actions;
export default dataSlice.reducer;
