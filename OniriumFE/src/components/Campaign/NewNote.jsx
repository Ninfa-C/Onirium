// NewNote.jsx
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Generic/ButtonCustom";
import { InputForm, CustomCheckbox } from "../Generic/Form";
import { X } from "react-bootstrap-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createNote } from "../../api/CampaignApi";
import DateInput from "../Generic/DateInput";

const NewNote = ({ isOpen, onClose, refreshNotes, campaign }) => {
  const { id: campaignId } = useParams();
  const [formNote, setFormNote] = useState({
    title: "",
    content: "",
    isVisible: true,
    image: null,
    masterOnly: false,
  });

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Title", formNote.title);
      formData.append("Content", formNote.content);
      formData.append("Date", new Date().toISOString());
      formData.append("MasterOnly", formNote.masterOnly);
      formData.append("IsVisible", formNote.isVisible);
      if (formNote.image) formData.append("Image", formNote.image);

      await createNote(campaignId, formData);
      await refreshNotes();
      setFormNote({
        title: "",
        content: "",
        isVisible: true,
        image: null,
        masterOnly: false,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset}-0 z-40 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-100 lg:w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-gold text-xl font-bold">Aggiungi Nuova Nota</h2>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gold text-sm">Titolo</label>
              <InputForm
                type="text"
                value={formNote.title}
                onChange={(e) =>
                  setFormNote({ ...formNote, title: e.target.value })
                }
                placeholder="Titolo della nota"
                className="bg-black/50 border-gold/30 text-white min-h-10"
              />
            </div>
            <div>
              <label className="text-gold text-sm">Contenuto</label>
              <textarea
                type="text-area"
                value={formNote.content}
                onChange={(e) =>
                  setFormNote({ ...formNote, content: e.target.value })
                }
                placeholder="Scrivi qui il contenuto della nota..."
                className="bg-black/50 border-gold/30 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormNote({ ...formNote, image: e.target.files[0] })
                }
                className="w-full text-white file:bg-gold/20 file:border-0 file:py-1 file:px-4 file:text-gold hover:file:bg-gold/30 bg-black/50 border border-gold/30 rounded"
              />
            </div>
            <div className="mt-4 flex justify-between">
              {campaign.role === "master" && (
                <>
                  <CustomCheckbox
                    id="masterOnly"
                    label="Solo Master"
                    checked={formNote.masterOnly}
                    onChange={(e) =>
                      setFormNote((prev) => ({
                        ...prev,
                        masterOnly: e.target.checked,
                        isVisible: e.target.checked ? false : prev.isVisible,
                      }))
                    }
                  /></>
              )}
                  <CustomCheckbox
                    id="isVisible"
                    label="Visibile ai giocatori"
                    checked={formNote.isVisible}
                    disabled={formNote.masterOnly}
                    onChange={(e) =>
                      setFormNote((prev) => ({
                        ...prev,
                        isVisible: e.target.checked,
                      }))
                    }
                  />
                
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={onClose}
              className="border-gold/30 text-gold hover:bg-gold/10 border"
            >
              Annulla
            </Button>
            <Button
              onClick={handleCreateNote}
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
            >
              Aggiungi Nota
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewNote;
