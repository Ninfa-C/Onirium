import { useState } from "react";
import { deleteQuest, updateQuest } from "../../api/CampaignApi";
import { Scroll } from "../../assets/icons/generic";
import { Button } from "../Generic/ButtonCustom";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeSlash,
  Pencil,
  Plus,
  X,
} from "react-bootstrap-icons";
import { SparklesIcon } from "@heroicons/react/16/solid";
import { Card, CardContent } from "../Generic/Cards";
import NewQuest from "./NewQuest";
import { CustomCheckbox, InputForm } from "../Generic/Form";

const Missioni = ({ quests, refreshQuests, campaign }) => {
  const [expandedSections, setExpandedSections] = useState(true);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({
    title: "",
    description: "",
    status: "In corso",
    reward: "",
    isVisible: true,
    masterNotes: "",
  });

  const toggleVisibility = async (quest) => {
    try {
      await updateQuest(quest.id, {
        ...quest,
        isVisible: !quest.isVisible,
      });
      refreshQuests();
    } catch (err) {
      console.error("Errore toggle visibilità:", err);
    }
  };

  const handleEditClick = (quest) => {
    setEditingId(quest.id);
    setEditingData({
      title: quest.title,
      description: quest.description,
      status: quest.status,
      reward: quest.reward,
      masterNotes: quest.masterNotes,
      isVisible: quest.isVisible,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingData({
      title: "",
      description: "",
      status: "In corso",
      reward: "",
      masterNotes: "",
      isVisible: true,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const original = quests.find((q) => q.id === editingId);
      const unchanged =
        original.title === editingData.title &&
        original.masterNotes === editingData.masterNotes &&
        original.description === editingData.description &&
        original.status === editingData.status &&
        original.reward === editingData.reward &&
        original.isVisible === editingData.isVisible;

      if (unchanged) {
        handleCancelEdit();
        return;
      }

      await updateQuest(editingId, { id: editingId, ...editingData });
      refreshQuests();
      handleCancelEdit();
    } catch (err) {
      console.error("Errore salvataggio:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuest(id);
      refreshQuests();
    } catch (err) {
      console.error("Errore eliminazione:", err);
    }
  };

  return (
    <section id="quests" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <Scroll className="h-5 w-5 mr-2" /> Missioni
        </h2>
        <div className="flex items-center">
          {campaign.role === "master" && <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
            onClick={() => setQuestModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Aggiungi Missione
          </Button>}
          <Button
            className="text-gray-400 hover:text-gold"
            onClick={() => setExpandedSections(!expandedSections)}
          >
            {expandedSections ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {expandedSections && (
        <div className="space-y-4">
          {quests
            .filter((quests) => campaign.role === "master" || quests.isVisible)
            .map((quest) => {
              const isEditing = editingId === quest.id;
              return (
                <Card
                  key={quest.id}
                  className="bg-second-background border border-gold/30"
                >
                  {(isEditing && campaign.role === "master") ? (
                    <div className="p-4 space-y-1">
                      <div className="flex gap-5">
                        <div className="grow">
                          <label className="text-gold text-sm">Titolo</label>
                          <InputForm
                            placeholder="Titolo"
                            type="text"
                            label="Titolo"
                            value={editingData.title}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            className="bg-black/50 border-gold/30 text-white min-h-10"
                          />
                        </div>
                        <div>
                          <label className="text-gold text-sm">Stato</label>
                          <select
                            value={editingData.status}
                            onChange={(e) =>
                              setEditingData((prev) => ({
                                ...prev,
                                status: e.target.value,
                              }))
                            }
                            className="w-full bg-black/50 border border-gold/30 text-white p-2 rounded hover:bg-gold/10 hover:text-gold"
                          >
                            <option value="In corso">In corso</option>
                            <option value="Completata">Completata</option>
                            <option value="Fallita">Fallita</option>
                          </select>
                        </div>
                      </div>

                      <label className="text-gold text-sm">Descrizione</label>
                      <textarea
                        type="text-area"
                        label="Descrizione"
                        value={editingData.description}
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Descrizione"
                        className="bg-black/50 border-gold/30 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
                      />
                      <label className="text-gold text-sm">Ricompensa</label>
                      <InputForm
                        type="text"
                        placeholder="Ricompensa"
                        label="Ricompensa"
                        value={editingData.reward}
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            reward: e.target.value,
                          }))
                        }
                        className="bg-black/50 border-gold/30 text-white min-h-10"
                      />
                      <div>
                        <label className="text-sm text-gold mb-1 block">
                          Note del Master
                        </label>
                        <textarea
                          type="text-area"
                          value={editingData.masterNotes}
                          onChange={(e) =>
                            setEditingData({
                              ...editingData,
                              masterNotes: e.target.value,
                            })
                          }
                          placeholder="Descrizione dettagliata della missione..."
                          className=" border-gold/30 bg-black/50 mb-3 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
                        />
                      </div>

                      <CustomCheckbox
                        id="isVisible"
                        label="Visibile ai giocatori"
                        checked={editingData.isVisible}
                        onChange={(e) =>
                          setEditingData((prev) => ({
                            ...prev,
                            isVisible: e.target.checked,
                          }))
                        }
                      />

                      <div className="flex justify-end gap-3">
                        <Button
                          onClick={handleCancelEdit}
                          className="border-gold/30 text-gold hover:bg-gold/10 border"
                        >
                          Annulla
                        </Button>
                        <Button
                          onClick={handleSaveEdit}
                          className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
                        >
                          Salva Modifiche
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-gold font-bold">
                              {quest.title}
                            </h3>
                            {campaign.role === "master" && <span
                              className={`${
                                quest.isVisible
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              } rounded-full px-2 text-sm flex items-center`}
                            >
                              {quest.isVisible ? (
                                <>
                                  <Eye className="h-3 w-3 mr-1" /> Visibile
                                </>
                              ) : (
                                <>
                                  <EyeSlash className="h-3 w-3 mr-1" /> Nascosto
                                </>
                              )}
                            </span>}
                          </div>
                          <p className="text-gray-300 text-sm">
                            {quest.description}
                          </p>
                          <div className="flex items-center">
                            <SparklesIcon className="h-4 w-4 text-gold mr-1" />
                            <span className="text-sm text-gold">
                              Ricompensa: {quest.reward}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`${
                            quest.status === "Completata"
                              ? "bg-green-500/20 text-green-300"
                              : quest.status === "In corso"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-gray-700 text-gray-300"
                          } rounded-full px-2 text-sm`}
                        >
                          {quest.status}
                        </div>
                      </div>
                      {(quest.masterNotes && campaign.role === "master" )&& (
                        <div className="bg-black/30 p-3 rounded-md border border-gold/10 mt-3">
                          <h4 className="text-sm text-gold mb-1">
                            Note del Master:
                          </h4>
                          <p className="text-sm text-gray-300">
                            {quest.masterNotes}
                          </p>
                        </div>
                      )}
                     {campaign.role === "master" && <div className="flex justify-end gap-2 mt-3">
                        <Button
                          className={`${
                            quest.isVisible
                              ? "border-green-500/30 text-green-300 hover:bg-green-500/10"
                              : "border-red-500/30 text-red-300 hover:bg-red-500/10"
                          } h-8 border`}
                          onClick={() => toggleVisibility(quest)}
                        >
                          {quest.isVisible ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeSlash className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          className="border-gold/30 text-gold hover:bg-gold/10 border h-8"
                          onClick={() => handleEditClick(quest)}
                        >
                          <Pencil className="h-3 w-3 mr-1" /> Modifica
                        </Button>
                        <Button
                          className="border-red-500/30 text-red-500/70 hover:bg-red-500/10 border h-8"
                          onClick={() => handleDelete(quest.id)}
                        >
                          <X className="h-5 w-5 mr-1" /> Elimina
                        </Button>
                      </div>}
                    </CardContent>
                  )}
                </Card>
              );
            })}
        </div>
      )}

      <NewQuest
        isOpen={questModalOpen}
        onClose={() => setQuestModalOpen(false)}
        refreshQuests={refreshQuests}
      />
    </section>
  );
};

export default Missioni;
