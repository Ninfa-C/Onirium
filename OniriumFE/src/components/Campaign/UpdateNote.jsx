/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "../Generic/ButtonCustom";
import * as Dialog from "@radix-ui/react-dialog";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import { useEffect, useState } from "react";
import { Pencil, X } from "react-bootstrap-icons";
import { updateNote } from "../../api/CampaignApi";

const UpdateNote = ({ notes, data, isOpen, onClose, refreshNotes }) => {
  const [editingData, setEditingData] = useState({
    title: "",
    content: "",
    isVisible: true,
    image: null,
    masterOnly: false,
    imageString: "",
    imagePreview: "",
  });

  const handleSaveEdit = async () => {
    const original = notes.find((s) => s.id === data.id);
    const unchanged =
      original.title === editingData.title &&
      original.content === editingData.content &&
      original.masterOnly === editingData.masterOnly &&
      original.isVisible === editingData.isVisible;
    if (unchanged) {
      onClose();
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("Title", editingData.title);
      formData.append("Content", editingData.content);
      formData.append("Date", new Date().toISOString());
      formData.append("MasterOnly", editingData.masterOnly);
      formData.append("IsVisible", editingData.isVisible);
      if (editingData.image) formData.append("Image", editingData.image);

      await updateNote(data.id, formData);
      await refreshNotes();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setEditingData({
        title: data.title,
        content: data.content,
        isVisible: data.isVisible,
        image: null,
        masterOnly: !!data.masterOnly,
        imageString: data.imageString,
        imagePreview: "",
      });
    }
  }, [isOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      {console.log(data)}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-h-[90vh] w-[80vw]  lg:w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8 overflow-y-auto" aria-describedby="Modifica nota">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-gold text-xl font-bold mb-3">
              Modifica nota
            </Dialog.Title>

            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex gap-3 mb-5">
            {/* immagine e preview */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-second-background border-2 border-dashed border-[#333333] rounded-md flex flex-col items-center justify-center overflow-hidden">
                <img
                  src={
                    editingData.imagePreview
                      ? editingData.imagePreview
                      : editingData.imageString
                      ? `http://localhost:5034/${editingData.imageString.replace(
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
                className="mt-4 cursor-pointer bg-black/50 hover:bg-[#222222] text-white border border-[#333333] rounded-md px-4 py-2 inline-block"
              >
                Seleziona Immagine
              </label>
              <input
                id="character-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setEditingData((prev) => ({
                      ...prev,
                      image: file,
                      imagePreview: previewUrl,
                    }));
                  }
                }}
                className="hidden"
              />
            </div>
            {/* altri input */}
            <div className="space-y-5 grow">
              <div>
                <label className="text-gold text-sm">Titolo</label>
                <InputForm
                  type="text"
                  value={editingData.title}
                  onChange={(e) =>
                    setEditingData({ ...editingData, title: e.target.value })
                  }
                  placeholder="Titolo della nota"
                  className="bg-black/50 border-gold/30 text-white min-h-10"
                />
              </div>
              <div>
                <label className="text-gold text-sm">Contenuto</label>
                <textarea
                  type="text-area"
                  value={editingData.content}
                  onChange={(e) =>
                    setEditingData({ ...editingData, content: e.target.value })
                  }
                  placeholder="Scrivi qui il contenuto della nota..."
                  className="bg-black/50 border-gold/30 w-full min-h-25 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
                />
              </div>
              <div className="mt-4 flex justify-between">
              <CustomCheckbox
                id="masterOnly"
                label="Solo Master"
                checked={editingData.masterOnly}
                onChange={(e) =>
                  setEditingData((prev) => ({
                    ...prev,
                    masterOnly: e.target.checked,
                    isVisible: e.target.checked ? false : prev.isVisible,
                  }))
                }
              />
              <CustomCheckbox
                id="isVisible"
                label="Visibile ai giocatori"
                checked={editingData.isVisible}
                disabled={editingData.masterOnly}
                onChange={(e) =>
                  setEditingData({ ...editingData, isVisible: e.target.checked })
                }
              />
            </div>
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-8">
            <Button
              onClick={() => onClose()}
              className="border-gold/30 text-gold hover:bg-gold/10 border"
            >
              Annulla
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
            >
              <Pencil className="h-4 w-4 mr-2" /> Salva
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateNote;
