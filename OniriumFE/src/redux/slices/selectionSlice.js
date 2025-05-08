import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  image: null,
  imagePreview: null,
  lifePoints: 10,
  maxWeight: 50,
  backgroundId: "",
  raceId: "",
  subraceId: "",
  classAssignments: [],
  selectedClass:[],
  stats: [],
  selectedTraits: [],
  selectedSkills: [],
  selectedItems: [],
  selectedSpells: [],
  startingBoost: [],
};

const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const exists = state.selectedItems.find(
        (i) => i.id === action.payload.id
      );
      state.selectedItems = exists
        ? state.selectedItems.filter((i) => i.id !== action.payload.id)
        : [...state.selectedItems, action.payload];
    },
    toggleSpell: (state, action) => {
      const exists = state.selectedSpells.find(
        (s) => s.id === action.payload.id
      );
      state.selectedSpells = exists
        ? state.selectedSpells.filter((s) => s.id !== action.payload.id)
        : [...state.selectedSpells, action.payload];
    },
    toggleTrait: (state, action) => {
      const exists = state.selectedTraits.find((t) => t.id === action.payload.id);
      if (exists) {
        state.selectedTraits = state.selectedTraits.filter((t) => t.id !== action.payload.id);
      } else {
        state.selectedTraits.push(action.payload);
      }
    },
    updateCharacterInfo: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateClassLevel: (state, action) => {
      const { classId, level } = action.payload;
      const classIndex = state.classAssignments.findIndex(
        (c) => c.id === classId
      );
      if (classIndex !== -1) {
        state.classAssignments[classIndex].levelinClass = level;
      }
    },
    increaseStat: (state, action) => {
      const statId = action.payload;
      const stat = state.stats.find((s) => s.id === statId);
      if (stat) {
        stat.value++;
      }
    },
    decreaseStat: (state, action) => {
      const statId = action.payload;
      const stat = state.stats.find((s) => s.id === statId);
      if (stat && stat.value > 0) {
        stat.value--;
      }
    },  
    setInitialCharacterData: (state, action) => {
      const { stats, skills } = action.payload;
    
      state.stats = stats.map((stat) => ({
        id: stat.id,
        value: stat.value || 8,
      }));
    
      state.selectedSkills = skills.map((skill) => ({
        id: skill.id,
        isProficiency: !!skill.isProficiency,
      }));
    },
    updateStartingBoost: (state, action) => {
      const { index, id } = action.payload;
      if (!state.startingBoost[index]) {
        state.startingBoost[index] = { id, value: index === 0 ? 2 : 1 };
      } else {
        state.startingBoost[index].id = id;
      }
    }, 
    swapStartingBoost: (state) => {
      if (state.startingBoost.length >= 2) {
        const temp = state.startingBoost[0].id;
        state.startingBoost[0].id = state.startingBoost[1].id;
        state.startingBoost[1].id = temp;
      }
    },
    clearSelectedSpells: (state) => {
      state.selectedSpells = [];
    },
    clearSelectedTraits: (state) => {
      state.selectedTraits = [];
    },
    setSelectedClassDetails: (state, action) => {
      state.selectedClass = action.payload;
    },
    setProficienciesFromBackground: (state, action) => {
      const backgroundSkills = action.payload;
      state.selectedSkills = state.selectedSkills.map((skill) =>
        backgroundSkills.includes(skill.id)
          ? { ...skill, isProficiency: true }
          : skill
      );
    },
  },
});

export const {
  updateCharacterInfo,
  toggleItem,
  toggleSpell,
  toggleTrait,
  updateClassLevel,
  increaseStat,
  decreaseStat,
  setInitialCharacterData,
  updateStartingBoost,
  swapStartingBoost,
  clearSelectedSpells,
  setSelectedClassDetails,
  clearSelectedTraits,
  setProficienciesFromBackground,
} = selectionSlice.actions;
export default selectionSlice.reducer;
