import { useState } from "react";
import { Button } from "../Generic/ButtonCustom";
import {
  Calendar,
  ChatLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  EyeSlash,
  Pencil,
  PencilFill,
  People,
  Plus,
  Save,
  X,
} from "react-bootstrap-icons";
import { Card, CardContent } from "../Generic/Cards";
import { deleteSession, updateSession } from "../../api/CampaignApi";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import NewSession from "./NewSession";
import DateInput from "../Generic/DateInput";
import TimePicker from "../Generic/TimePicker";

const Sessioni = ({ sessions, refreshSessions, campaign }) => {
  const [expandedSections, setExpandedSections] = useState(true);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [editingData, setEditingData] = useState({
    title: "",
    date: "",
    time: "",
    summary: "",
    masterNotes: "",
    completed: false,
  });
  const [editingSessionId, setEditingSessionId] = useState(null);

  const toggleVisibility = async (session) => {
    const date = session.date.split("T")[0];
    const time = session.date.split("T")[1].substring(0, 5);
    try {
      await updateSession(session.id, {
        id: session.id,
        title: session.title,
        date: `${date}T${time}`,
        summary: session.summary,
        completed: session.completed,
        masterNotes: session.masterNotes,
        nextSessionDate: session.nextSessionDate ?? null,
        isVisible: !session.isVisible,
      });
      await refreshSessions();
    } catch (error) {
      console.error("Errore durante il toggle visibilità:", error);
    }
  };

  const handleSaveEdit = async () => {
    const original = sessions.find((s) => s.id === editingSessionId);
    const unchanged =
      original.title === editingData.title &&
      original.masterNotes === editingData.masterNotes &&
      original.date.split("T")[0] === editingData.date &&
      original.date.split("T")[1].substring(0, 5) === editingData.time &&
      (original.summary || "") === editingData.summary &&
      original.completed === editingData.completed;

    if (unchanged) {
      setEditingSessionId(null);
      return;
    }
    try {
      await updateSession(editingSessionId, {
        id: editingSessionId,
        title: editingData.title,
        masterNotes: editingData.masterNotes,
        date: `${editingData.date}T${editingData.time}`,
        summary: editingData.summary,
        completed: editingData.completed,
        isVisible: true,
      });
      await refreshSessions();
      setEditingSessionId(null);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (session) => {
    setEditingSessionId(session.id);
    setEditingData({
      title: session.title,
      masterNotes: session.masterNotes,
      date: session.date.split("T")[0],
      time: session.date.split("T")[1].substring(0, 5),
      summary: session.summary,
      completed: session.completed,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteSession(id);
      await refreshSessions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="sessions" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <Calendar className="h-5 w-5 mr-2" /> Sessioni
        </h2>
        <div className="flex items-center">
          {campaign.role === "master" && (
            <Button
              className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
              onClick={() => setSessionModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Nuova Sessione
            </Button>
          )}
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
          {[...sessions]
            .filter(
              (session) => campaign.role === "master" || session.isVisible
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((session, i) => (
              <Card
                key={i}
                className={`bg-second-background border ${
                  !session.completed ? "border-gold/50" : "border-gray-700/50"
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className={`md:w-24 ${
                        session.completed ? "bg-gray-800" : "bg-gold/20"
                      } flex lg:flex-col gap-2 items-center justify-center p-4 md:p-0`}
                    >
                      <span
                        className={`${
                          session.completed ? "text-gray-400" : "text-gold"
                        } text-sm font-bold`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`${
                          session.completed ? "text-gray-400" : "text-gold"
                        } text-2xl font-bold`}
                      >
                        {session.completed ? "✓" : ""}
                      </span>
                    </div>
                    <div className="flex-1 p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        {editingSessionId != session.id && (
                          <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
                            <h3
                              className={`${
                                session.completed
                                  ? "text-gray-300"
                                  : "text-gold"
                              } font-medium text-lg flex items-center`}
                            >
                              {session.title}
                            </h3>
                            {campaign.role === "master" && (
                              <div className="flex items-center md:ml-4">
                                <div
                                  className={`${
                                    session.isVisible
                                      ? "bg-green-500/20 text-green-300"
                                      : "bg-red-500/20 text-red-300"
                                  } rounded-full px-2`}
                                >
                                  {session.isVisible ? (
                                    <span className="flex items-center">
                                      <Eye className="h-3 w-3 mr-1" /> Visibile
                                    </span>
                                  ) : (
                                    <span className="flex items-center">
                                      <EyeSlash className="h-3 w-3 mr-1" />{" "}
                                      Nascosto
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {/* completata? mostra data, altrimenti no */}
                        {session.completed && (
                          <div className="flex gap-2 text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <p className="text-sm">
                              {new Date(session.date).toLocaleDateString(
                                "it-IT",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                      {/* permette modifica all'interno della card */}
                      {editingSessionId === session.id &&
                      campaign.role === "master" ? (
                        <>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm text-gold mb-1 block">
                                Titolo
                              </label>
                              <InputForm
                                type="text"
                                value={editingData.title}
                                onChange={(e) =>
                                  setEditingData({
                                    ...editingData,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm text-gold mb-1 block">
                                  Data
                                </label>
                                <DateInput
                                  value={editingData.date}
                                  onChange={(e) =>
                                    setEditingData({
                                      ...editingData,
                                      date: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-sm text-gold mb-1 block">
                                  Ora
                                </label>
                                <TimePicker
                                  value={editingData.time}
                                  onChange={(e) =>
                                    setEditingData({
                                      ...editingData,
                                      time: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm text-gold mb-1 block">
                                Riassunto
                              </label>
                              <textarea
                                type="text-area"
                                value={editingData.summary}
                                onChange={(e) =>
                                  setEditingData({
                                    ...editingData,
                                    summary: e.target.value,
                                  })
                                }
                                className=" border-gray-700 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
                              />
                            </div>
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
                                className=" border-gray-700 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
                              />
                            </div>

                            <CustomCheckbox
                              id="completed"
                              label="Sessione Completata"
                              checked={editingData.completed}
                              onChange={(e) =>
                                setEditingData({
                                  ...editingData,
                                  completed: e.target.checked,
                                })
                              }
                            />
                          </div>

                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              onClick={() => setEditingSessionId(null)}
                              className="border-gold/30 text-gold hover:bg-gold/10 border"
                            >
                              Annulla
                            </Button>
                            <Button
                              onClick={() => handleSaveEdit(session.id)}
                              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
                            >
                              <Save className="h-4 w-4 mr-2" /> Salva
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-400 mb-2">
                            {session.summary}
                          </p>
                          {session.masterNotes &&
                            campaign.role === "master" && (
                              <div className="bg-black/30 p-3 rounded-md border border-gold/10 mt-3">
                                <h4 className="text-sm text-gold mb-1">
                                  Note del Master:
                                </h4>
                                <p className="text-sm text-gray-300">
                                  {session.masterNotes}
                                </p>
                              </div>
                            )}

                          {!session.completed && (
                            <div className="mt-2 flex items-center">
                              <Clock className="h-4 w-4 text-gold mr-1" />
                              <span className="text-sm text-gold">
                                Programmata per:{" "}
                                <span className="text-sm text-gray-400">
                                  {new Date(session.date).toLocaleDateString(
                                    "it-IT",
                                    {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}{" "}
                                  - {session.date.split("T")[1].substring(0, 5)}
                                </span>
                              </span>
                            </div>
                          )}
                        </>
                      )}
                      {editingSessionId !== session.id &&
                        campaign.role === "master" && (
                          <div className="flex justify-end mt-3 gap-2">
                            <Button
                              className={`${
                                session.isVisible
                                  ? "border-green-500/30 text-green-300 hover:bg-green-500/10"
                                  : "border-red-500/30 text-red-300 hover:bg-red-500/10"
                              }`}
                              onClick={() => toggleVisibility(session)}
                            >
                              {session.isVisible ? (
                                <span className="flex items-center">
                                  <Eye className="h-4 w-4" />
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <EyeSlash className="h-4 w-4" />
                                </span>
                              )}
                            </Button>
                            <Button
                              className="border-gold/30 text-gold hover:bg-gold/10 border"
                              onClick={() => handleEditClick(session)}
                            >
                              <PencilFill className="h-3 w-3 mr-1" /> Modifica
                            </Button>
                            <Button
                              className="border-red-500/30 text-red-500/70 hover:bg-red-500/10 border"
                              onClick={() => handleDelete(session.id)}
                            >
                              <X className="h-5 w-5 mr-1" /> Elimina
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {campaign.role === "master" && (
        <NewSession
          isOpen={sessionModalOpen}
          onClose={() => setSessionModalOpen(false)}
          refreshSessions={refreshSessions}
        />
      )}
    </section>
  );
};

export default Sessioni;
