import { useState } from "react";
import { deleteNote, updateNote } from "../../api/CampaignApi";
import { Button } from "../Generic/ButtonCustom";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeSlash,
  FileText,
  Pencil,
  Plus,
  X,
} from "react-bootstrap-icons";
import { SparklesIcon } from "@heroicons/react/16/solid";
import { Card, CardContent } from "../Generic/Cards";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import NewNote from "./NewNote";
import UpdateNote from "./UpdateNote";
import ImageDialog from "../Generic/ImageDialog";
import { useSelector } from "react-redux";

const Note = ({ notes, refreshNotes, campaign }) => {
  const [expandedSections, setExpandedSections] = useState(true);
  const [questModalOpen, setNoteModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageId, setImageId] = useState(null);
  const { profile } = useSelector((state) => state.user);

  const toggleVisibility = async (data) => {
    const locationDto = new FormData();
    locationDto.append("id", data.id);
    locationDto.append("masterOnly", data.masterOnly);
    locationDto.append("title", data.title);
    locationDto.append("content", data.content);
    locationDto.append("date", data.date);
    locationDto.append("isVisible", !data.isVisible);
    if (data.image) {
      locationDto.append("image", data.image);
    }
    try {
      await updateNote(data.id, locationDto);
      await refreshNotes();
    } catch (error) {
      console.error("Errore durante il toggle visibilità:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      await refreshNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="notes" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <FileText className="h-5 w-5 mr-2" /> Note
        </h2>
        <div className="flex items-center">
          <Button
            className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
            onClick={() => setNoteModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Aggiungi Nota
          </Button>
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
          {notes
            .filter(
              (note) =>
                campaign.role === "master" ||
                (note.isVisible && !note.masterOnly)||
                note.createdby?.toLowerCase() === profile?.email?.toLowerCase()
            )
            .map((note) => (
              <Card
                key={note.id}
                className="bg-second-background border border-gold/30"
              >
                <CardContent className="p-0 flex">
                  {note.imageString && (
                    <div className="w-24 bg-gray-800 flex-shrink-0 overflow-hidden rounded-l-md">
                      <img
                        src={
                          note.imagePreview
                            ? note.imagePreview
                            : note.imageString
                              ? `http://localhost:5034/${note.imageString.replace(
                                  /\\/g,
                                  "/"
                                )}`
                              : "./placeholder.svg"
                        }
                        alt="Anteprima"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => {
                          setImageModalOpen(true), setImageId(note.id);
                        }}
                      />
                    </div>
                  )}
                  <div className="grow p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <h3 className="text-gold font-medium">{note.title}</h3>
                        {note.masterOnly && (
                          <div className="ml-2 bg-purple-500/20 text-purple-300 px-2 rounded-full text-sm">
                            Solo Master
                          </div>
                        )}
                        {profile?.email === note.createdby  && (
                          <span
                            className={`${
                              note.isVisible
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            } rounded-full px-2 text-sm flex items-center`}
                          >
                            {note.isVisible ? (
                              <>
                                <Eye className="h-3 w-3 mr-1" /> Visibile
                              </>
                            ) : (
                              <>
                                <EyeSlash className="h-3 w-3 mr-1" /> Nascosto
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(note.date).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-2">{note.content}</p>

                    {profile?.email === note.createdby && (
                      <div className="flex justify-end mt-3 gap-2">
                        <Button
                          className={`${
                            note.isVisible
                              ? "border-green-500/30 text-green-300 hover:bg-green-500/10"
                              : "border-red-500/30 text-red-300 hover:bg-red-500/10"
                          } h-8 border`}
                          onClick={() => toggleVisibility(note)}
                        >
                          {note.isVisible ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeSlash className="h-4 w-4" />
                          )}
                        </Button>
                        {profile?.email === note.createdby && (
                          <Button
                            className="border-gold/30 text-gold hover:bg-gold/10 border h-8"
                            onClick={() => {
                              setUpdateModal(true);
                              setEditingId(note.id);
                            }}
                          >
                            <Pencil className="h-3 w-3 mr-1" /> Modifica
                          </Button>
                        )}

                        {profile?.email === note.createdby && <Button
                          className="border-red-500/30 text-red-500/70 hover:bg-red-500/10 border h-8"
                          onClick={() => handleDelete(note.id)}
                        >
                          <X className="h-5 w-5 mr-1" /> Elimina
                        </Button>}
                      </div>
                    )}
                  </div>
                </CardContent>
                {imageId == note.id && (
                  <ImageDialog
                    imageModalOpen={imageModalOpen}
                    setImageModalOpen={setImageModalOpen}
                    imageString={note.imageString}
                  />
                )}

                {editingId == note.id && profile?.email === note.createdby && (
                  <UpdateNote
                    isOpen={updateModal}
                    onClose={() => setUpdateModal(false)}
                    refreshNotes={refreshNotes}
                    data={note}
                    notes={notes}
                  />
                )}
              </Card>
            ))}
        </div>
      )}
      <NewNote
        isOpen={questModalOpen}
        onClose={() => setNoteModalOpen(false)}
        refreshNotes={refreshNotes}
        campaign={campaign}
      />
    </section>
  );
};

export default Note;
