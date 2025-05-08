import { useDispatch, useSelector } from "react-redux";
import { TabsContent } from "../Generic/Tabs";
import {
  setProficienciesFromBackground,
  updateCharacterInfo,
} from "../../redux/slices/selectionSlice";
import { ChevronDown } from "react-bootstrap-icons";
import { useState } from "react";
import DialogSelection from "./DialogSelection";
import Roll from "../Generic/Roll";
import { InputForm } from "../Generic/Form";
import ClassDialogSelection from "./ClassDialogSelection";
import ClassAssignments from "./ClassAssignments";
import CharHeader from "./CharHeader";

const CharInfo = ({ onFileSelect }) => {
  const [raceDialogOpen, setRaceDialogOpen] = useState(false);
  const [classDialogOpen, setClassDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const character = useSelector((state) => state.selection);
  const data = useSelector((state) => state.data);
  const background = data.background;

  const selectedClassIds =
    character.classAssignments?.map((cls) => cls.id) || [];

  const availableClasses = data.class?.filter(
    (cls) => !selectedClassIds.includes(cls.id)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "backgroundId") {
      const selectedBackground = background.find((b) => b.id === value);
    

      const backgroundSkill =
        selectedBackground?.skills?.map((s) => s.name) || [];

        const backgroundSkillIds = data.skills
        .filter((skill) => backgroundSkill.includes(skill.name))
        .map((skill) => skill.id);
        console.log(backgroundSkillIds);
      dispatch(updateCharacterInfo({ backgroundId: value }));
      dispatch(setProficienciesFromBackground(backgroundSkillIds));
    } else {
      dispatch(updateCharacterInfo({ [name]: value }));
    }
  };
  const handleRaceSelect = (raceId, subraceId = null) => {
    dispatch(updateCharacterInfo({ raceId: raceId, subraceId: subraceId }));
  };
  
  const handleClassSelect = (classId, subClassId = null, level = 1) => {
    dispatch(
      updateCharacterInfo({
        classAssignments: [
          ...(character.classAssignments || []),
          { id: classId, subclass: subClassId, levelinClass: level },
        ],
      })
    );
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateCharacterInfo({ imagePreview: reader.result, image: file.name }));
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  return (
    <TabsContent value="info" className="mt-0 container-fluid">
      <CharHeader
        title="Chi sei, viandante?"
        description="  Scegli il nome, la razza e la vocazione del tuo personaggio. Ogni eroe è plasmato da origini antiche e un futuro ignoto. Ora tocca a te scrivere il primo capitolo.."
      />
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 col-span-2">
            <div>
              <label htmlFor="name" className="text-white font-light">
                Nome del Personaggio <span className="text-red-500">*</span>
              </label>
              <InputForm
                id="name"
                name="name"
                value={character.name}
                onChange={handleInputChange}
                placeholder="Inserisci il nome del tuo personaggio"
                autoComplete="off"
                className="w-full rounded-md p-2 text-white hover:border-gold mt-2"
              />
            </div>
            {/* Background */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <label
                    htmlFor="background"
                    className="text-white font-light "
                  >
                    Background <span className="text-red-500">*</span>:
                  </label>
                  {character.backgroundId && (
                    <p className="text-gold inline ml-2">
                      {
                        data.background.find(
                          (r) => r.id === character.backgroundId
                        )?.name
                      }
                    </p>
                  )}
                </div>

                <select
                  id="background"
                  name="backgroundId"
                  value={character.background}
                  onChange={handleInputChange}
                  className=" text-sm flex h-7 w-max rounded-md border-1 border-gray-700 bg-second-background px-3 py-1 hover:border-gold data-[state=active]:border-gold"
                >
                  <option value="">Seleziona un background</option>

                  {background &&
                    background.length > 0 &&
                    background.map((item) => (
                      <option
                        key={item.id}
                        className="text-gray-400 text-sm"
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              {character.backgroundId &&
                (() => {
                  const selectedBg = data.background.find(
                    (b) => b.id === character.backgroundId
                  );
                  return selectedBg?.skills?.length > 0 ? (
                    <div>
                      <p className="text-gray-400 text-sm my-2">
                        {selectedBg.description}
                      </p>
                      <p>
                        <span className="text-white opacity-80">
                          Privilegi:
                        </span>{" "}
                        {selectedBg.skills.map((p, i) => (
                          <span key={i} className="text-gold">
                            {p.name}
                            {i < selectedBg.skills.length - 1 ? ", " : "."}
                          </span>
                        ))}
                      </p>
                    </div>
                  ) : null;
                })()}
            </div>

            {/* Razza */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-light">
                    Razza <span className="text-red-500">*</span>
                  </label>
                  {character.raceId && (
                    <p className="text-gold inline ml-2">
                      {character.subraceId
                        ? data.race
                            .find((r) => r.id === character.raceId)
                            ?.subraces?.find(
                              (s) => s.id === character.subraceId
                            )?.name
                        : character.raceId
                        ? data.race.find((r) => r.id === character.raceId)?.name
                        : "Seleziona una razza"}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setRaceDialogOpen(true)}
                  className="flex items-center justify-between mt-2 appearance-none h-7 w-50 rounded-md border-1 border-gray-700 bg-second-background px-3 py-2 text-sm hover:border-gold data-[state=active]:border-gold"
                >
                  <span className="truncate text-left">
                    {character.subraceId
                      ? data.race
                          .find((r) => r.id === character.raceId)
                          ?.subraces?.find((s) => s.id === character.subraceId)
                          ?.name
                      : character.raceId
                      ? data.race.find((r) => r.id === character.raceId)?.name
                      : "Seleziona una razza"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </div>

              {character.raceId && (
                <p className="text-gray-400 text-sm mt-1">
                  {
                    data.race.find((r) => r.id === character.raceId)
                      ?.description
                  }
                </p>
              )}
            </div>
            {/*CLASSE*/}

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-light">
                  Classe <span className="text-red-500">*</span>:
                </label>
                <button
                  type="button"
                  onClick={() => setClassDialogOpen(true)}
                  className="appearance-none flex items-center justify-between mt-2 h-7 rounded-md border-1 border-gray-700 bg-second-background px-3 py-2 text-sm hover:border-gold data-[state=active]:border-gold"
                >
                  <span className="truncate text-left">
                    {character.classAssignments.length > 0
                      ? "Aggiungi"
                      : "Seleziona una classe"}
                  </span>
                </button>
              </div>
              <ClassAssignments />
            </div>
          </div>

          {/*IMMAGINE */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 bg-second-background border-2 border-dashed border-[#333333] rounded-md flex flex-col items-center justify-center overflow-hidden">
              {character.imagePreview ? (
                <img
                  src={character.imagePreview || "/placeholder.svg"}
                  alt="Character preview"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <img className="h-12 w-12 text-[#333333] mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">
                    Carica un'immagine per il tuo personaggio
                  </p>
                </div>
              )}
            </div>
            <label
              htmlFor="character-image"
              className="mt-4 cursor-pointer bg-second-background hover:bg-[#222222] text-white border border-[#333333] rounded-md px-4 py-2 inline-block"
            >
              Seleziona Immagine
            </label>
            <input
              id="character-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
      <DialogSelection
        title="Razza"
        options={data.race}
        open={raceDialogOpen}
        onOpenChange={setRaceDialogOpen}
        onSelect={handleRaceSelect}
      />
      <ClassDialogSelection
        title="Classe"
        options={availableClasses}
        open={classDialogOpen}
        onOpenChange={setClassDialogOpen}
        onSelect={handleClassSelect}
      />
    </TabsContent>
  );
};

export default CharInfo;
