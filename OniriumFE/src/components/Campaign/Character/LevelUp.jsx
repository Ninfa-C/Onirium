import { useEffect, useState } from "react";
import ClassDialogSelection from "../../CharacterCreation/ClassDialogSelection";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../../../redux/slices/dataSlice";
import { CustomCheckbox, InputForm, SelectForm } from "../../Generic/Form";
import * as Dialog from "@radix-ui/react-dialog";
import { Save, X } from "react-bootstrap-icons";
import { ScrollArea } from "radix-ui";
import SingleAbility from "../../CharacterCreation/SingleAbility";
import { getData } from "../../../api";
import AvaibleTraits from "./AvaibleTraits";
import { updateCharacterCampaign } from "../../../api/CampaignApi";
import { Button } from "../../Generic/ButtonCustom";
import { getCharacterAssign } from "../../../redux/slices/characterDetailsSlice";

const LevelUp = ({ isOpen, onClose }) => {
  const character = useSelector(
    (state) => state.characterDetails.characterAssign
  );
  const [form, setForm] = useState({
    name: character?.character.name,
    race: character?.character.raceName,
    subrace: character?.character.subraceName || "",
    background: character?.character.backgroundName,
    classes: character?.character.classes,
    imageString: character?.character.image,
    MaxLifePoints: character?.character.MaxLifePoints,
    CurrentLifePoints: character?.character.currentLifePoints,
    temporaryLifePoints: character?.character.temporaryLifePoints,
    stats: character?.character.stats,
    skills: character?.character.skills,
    traits: character?.character.traits,
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const handleAddClass = (selectedClassName) => {
    const classData = data.class.find((cls) => cls.name === selectedClassName);

    if (form.classes.find((c) => c.className === selectedClassName)) return;

    const newClass = {
      id: classData.id,
      className: classData.name,
      levelInClass: 1,
      subClassName: null,
    };

    setForm({ ...form, classes: [...form.classes, newClass] });
  };

  const increaseLevel = (classId, currentLevel) => {
    const updatedClasses = form.classes.map((cls) =>
      cls.id === classId ? { ...cls, levelInClass: currentLevel + 1 } : cls
    );
    setForm({ ...form, classes: updatedClasses });
  };

  const decreaseLevel = (classId, currentLevel) => {
    if (currentLevel <= 0) return;

    const updatedClasses = form.classes
      .map((cls) => {
        if (cls.id !== classId) return cls;

        const newLevel = currentLevel - 1;
        const classData = data.class.find((c) => c.name === cls.className);
        const requiresSubAt = classData?.requiredLevelForSubclass;

        return newLevel === 0
          ? null
          : {
              ...cls,
              levelInClass: newLevel,
              subClassName: newLevel < requiresSubAt ? null : cls.subClassName,
            };
      })
      .filter(Boolean);

    const affectedClass = form.classes.find((cls) => cls.id === classId);
    const newLevel = affectedClass?.levelInClass - 1;
    const classData = data.class.find(
      (c) => c.name === affectedClass?.className
    );
    const subclassData = classData?.subclasses?.find(
      (s) => s.name === affectedClass?.subClassName
    );
    const classSourceId = classData?.id;
    const subclassSourceId = subclassData?.id;
    const filteredTraits = form.traits.filter(
      (trait) =>
        !(
          (trait.sourceId === classSourceId ||
            trait.sourceId === subclassSourceId) &&
          trait.levelRequired > newLevel
        )
    );
    setForm({ ...form, classes: updatedClasses, traits: filteredTraits });
    updateTraitPreview();
  };

  useEffect(() => {
    updateTraitPreview();
  }, [form.classes]);

  const buildTraitParams = () => {
    return {
      raceId: data.race.find((r) => r.name === form.race)?.id,
      subraceId:
        data.race
          .find((r) => r.name === form.race)
          ?.subraces.find((sr) => sr.name === form.subrace)?.id || null,
      backgroundId: data.background.find((b) => b.name === form.background)?.id,
      classAssignments: form.classes.map((cls) => {
        const classId = data.class.find((c) => c.name === cls.className)?.id;
        const subclassId =
          data.class
            .find((c) => c.name === cls.className)
            ?.subclasses.find((s) => s.name === cls.subClassName)?.id || null;

        return {
          id: classId,
          levelInClass: cls.levelInClass,
          subclass: subclassId,
        };
      }),
    };
  };

  const updateTraitPreview = async () => {
    const params = buildTraitParams();
    const result = await getData("traitPreview", null, params);

    if (!Array.isArray(result.data)) return;

    const existingTraitIds = form.traits.map((t) => t.id);

    const validTraits = result.data.filter((trait) => {
      if (existingTraitIds.includes(trait.id)) return false;

      const matchingAssignment = params.classAssignments.find((assignment) => {
        return (
          assignment.id === trait.sourceId ||
          assignment.subclass === trait.sourceId
        );
      });

      if (!matchingAssignment) return false;
      return trait.levelRequired <= matchingAssignment.levelInClass;
    });

    if (validTraits.length > 0) {
      setForm((prev) => ({
        ...prev,
        traits: [...prev.traits, ...validTraits],
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Name", form.name);
      data.append("BackgroundName", form.background);
      data.append("RaceName", form.race);
      data.append("SubraceName", form.subrace || "");
      if (form.image instanceof File) {
        data.append("Image", form.image);
      }
      form.classes.forEach((cls, i) => {
        data.append(`Classes[${i}].ClassName`, cls.className);
        data.append(`Classes[${i}].LevelInClass`, cls.levelInClass);
        data.append(`Classes[${i}].SubClassName`, cls.subClassName || "");
      });

      // Stats
      form.stats.forEach((stat, i) => {
        data.append(`Stats[${i}].Name`, stat.name);
        data.append(`Stats[${i}].Value`, stat.value);
      });

      // Skills
      form.skills.forEach((skill, i) => {
        data.append(`Skills[${i}].Name`, skill.name);
        data.append(`Skills[${i}].IsProficient`, skill.isProficient);
        data.append(`Skills[${i}].Stat`, skill.stat);
      });

      // Traits
      form.traits.forEach((trait, i) => {
        data.append(`Traits[${i}].Name`, trait.name);
        data.append(`Traits[${i}].Description`, trait.description);
        data.append(`Traits[${i}].Source`, trait.source);
      });

      await updateCharacterCampaign(character.characterId, data);
      dispatch(getCharacterAssign(character.id));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
console.log(character)
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            onClose();
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md p-0 flex flex-col focus:outline-none">
            <div className="flex items-center justify-between border-b border-[#333] p-4">
              <div>
                <Dialog.Title className="text-3xl text-gold">
                  Modifica il tuo eroe
                </Dialog.Title>
                <Dialog.Description className="text-gray-400 text-sm">
                  Scegli la classe del tuo personaggio
                </Dialog.Description>
              </div>
              <Dialog.Close className="text-gray-400 hover:text-gold">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            <ScrollArea.Root className="h-[500px] overflow-hidden p-4">
              <ScrollArea.Viewport className="w-full h-full">
                <form onSubmit={handleUpdate}>
                  {/* parte 1: immagine, nome, razza, sottorazza, bg e classe */}
                  <div className="flex flex-col md:flex-row gap-4 mb-5">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-48 h-48 bg-second-background border-2 border-dashed border-[#333333] rounded-md flex flex-col items-center justify-center overflow-hidden">
                        <img
                          src={
                            form.imagePreview
                              ? form.imagePreview
                              : form.imageString
                                ? `http://localhost:5034/${form.imageString.replace(
                                    /\\/g,
                                    "/"
                                  )}`
                                : "./placeholser.svg"
                          }
                          alt="Character preview"
                          width={192}
                          height={192}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label
                        htmlFor="character-image"
                        className="mt-4 cursor-pointer bg-second-background hover:bg-[#222222] text-white border border-[#333333] rounded-md px-4 py-2 inline-block"
                      >
                        Modifica Immagine
                      </label>
                      <input
                        id="character-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            setForm((prev) => ({
                              ...prev,
                              image: file,
                              imagePreview: previewUrl,
                            }));
                          }
                        }}
                        className="hidden"
                      />
                    </div>
                    <div className="grow space-y-5">
                      <div className="flex items-center gap-4">
                        <InputForm
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Inserisci il nome del tuo personaggio"
                          autoComplete="off"
                          className="rounded-md p-2 text-white hover:border-gold"
                        />
                        <SelectForm
                          className="w-full"
                          value={form.background}
                          onChange={(val) =>
                            setForm({ ...form, background: val })
                          }
                          data={() =>
                            data.background?.map((b) => ({
                              value: b.name,
                            }))
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        <SelectForm
                          className="w-1/2"
                          value={form.race}
                          onChange={(val) => {
                            setForm({
                              ...form,
                              race: val,
                              subrace: "",
                            });
                          }}
                          data={() => data.race.map((r) => ({ value: r.name }))}
                        />

                        {data.race.find((r) => r.name === form.race)?.subraces
                          .length > 0 && (
                          <SelectForm
                            className="w-1/2"
                            value={form.subrace}
                            onChange={(val) =>
                              setForm({ ...form, subrace: val })
                            }
                            data={() =>
                              data.race
                                .find((r) => r.name === form.race)
                                .subraces.map((sr) => ({
                                  value: sr.name,
                                })) || []
                            }
                          />
                        )}
                      </div>
                      {/* classe */}
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-white font-light">Classe:</label>
                        <SelectForm
                          value=""
                          onChange={handleAddClass}
                          data={() =>
                            data.class
                              .filter(
                                (cls) =>
                                  !form.classes.some(
                                    (selectedCls) =>
                                      selectedCls.className === cls.name
                                  )
                              )
                              .map((cls) => ({
                                label: cls.name,
                                value: cls.name,
                              }))
                          }
                          placeholder={
                            character?.character?.classes.length > 0
                              ? "Aggiungi classe"
                              : "Seleziona una classe"
                          }
                          className="w-56"
                        />
                      </div>
                      {form?.classes?.length > 0 && (
                        <div className="space-y-6">
                          {form?.classes?.map((cls) => {
                            const classData = data.class.find(
                              (c) => c.name === cls.className
                            );
                            const canSelectSubclass =
                              classData?.requiredLevelForSubclass &&
                              cls.levelInClass >=
                                classData.requiredLevelForSubclass &&
                              classData?.subclasses?.length > 0;
                            return (
                              <div
                                key={cls.id}
                                className="text-white border-b-gold"
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <h3 className="text-gold font-semibold">
                                    {cls.className}{" "}
                                    {cls.subClassName && (
                                      <span className="font-normal ">
                                        - {cls.subClassName}
                                      </span>
                                    )}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      className="px-2 py-1 text-white hover:text-gold cursor-pointer"
                                      onClick={() =>
                                        decreaseLevel(cls.id, cls.levelInClass)
                                      }
                                    >
                                      −
                                    </button>
                                    <span>livello {cls.levelInClass}</span>
                                    <button
                                      type="button"
                                      className="px-2 py-1 text-white hover:text-gold cursor-pointer"
                                      onClick={() =>
                                        increaseLevel(cls.id, cls.levelInClass)
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  {canSelectSubclass && !cls.subClassName && (
                                    <div className="mt-2">
                                      <SelectForm
                                        value={cls.subclass || ""}
                                        onChange={(val) => {
                                          const updatedClasses =
                                            form.classes.map((c) =>
                                              c.id === cls.id
                                                ? { ...c, subClassName: val }
                                                : c
                                            );
                                          setForm({
                                            ...form,
                                            classes: updatedClasses,
                                          });
                                        }}
                                        data={() =>
                                          classData.subclasses.map((sub) => ({
                                            value: sub.name,
                                          }))
                                        }
                                        placeholder="Scegli una sottoclasse"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* parte 2: Statistiche */}
                  <h3 className="text-gold text-2xl mb-3 text-center">
                    Statistiche
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center justify-center mb-5 ">
                    {form?.stats?.map((stat, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center border border-gold/30 p-3"
                      >
                        <p className=" text-xl text-gold">{stat.name}</p>
                        <InputForm
                          id={stat.name}
                          name={stat.name}
                          value={stat.value}
                          onChange={(e) => {
                            const updatedStats = form.stats.map((s, index) =>
                              index === i
                                ? { ...s, value: parseInt(e.target.value) || 0 }
                                : s
                            );
                            setForm({ ...form, stats: updatedStats });
                          }}
                          placeholder="8"
                          autoComplete="off"
                          className="rounded-md p-2 text-white hover:border-gold w-15 text-center border-none text-xl"
                        />
                      </div>
                    ))}
                  </div>

                  {/* parte 3: abilità e tratti nuovi */}
                  <div>
                    <div className="grid grid-col-2 lg:grid-cols-5 gap-5">
                      {/* abilità */}
                      <div className="col-span-3 lg:col-span-2 px-6">
                        <h3 className="text-gold text-2xl mb-3">Abilità</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:border-r lg:border-gold/30">
                          {data.skills.map((item) => {
                            return (
                              <CustomCheckbox
                                className="text-xs"
                                key={item.name}
                                id={item.name}
                                label={`${item.name} (${item.stat?.slice(0, 3).toUpperCase() || ""})`}
                                checked={
                                  form?.skills?.find((s) => s.name === item.name)
                                    ?.isProficient || false
                                }
                                onChange={(e) => {
                                  const updatedSkills = form.skills.map(
                                    (skill) =>
                                      skill.name === item.name
                                        ? {
                                            ...skill,
                                            isProficient: e.target.checked,
                                          }
                                        : skill
                                  );
                                  setForm({ ...form, skills: updatedSkills });
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                      {/* tratti appresi */}
                      <div className="px-6 col-span-3">
                        <h3 className="text-gold text-2xl mb-3">Tratti</h3>
                        <div className="grid lg:grid-cols-2 gap-x-4 gap-y-2">
                          {form?.traits?.map((trait, i) => (
                            <div key={i}>
                              <AvaibleTraits trait={trait} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <Button
                      type="submit"
                      className="border border-gold/30 px-4 py-1 rounded-md text-gray-300 hover:cursor-pointer flex items-center hover:bg-gold/30 hover:text-white"
                    >
                      <Save className="mr-2 w-4" />
                      SALVA
                    </Button>
                  </div>
                </form>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-dark-lighter data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-dark-darker before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default LevelUp;
