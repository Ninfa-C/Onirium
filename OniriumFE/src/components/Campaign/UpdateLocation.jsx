/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "../Generic/ButtonCustom";
import * as Dialog from "@radix-ui/react-dialog";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import { useEffect, useState } from "react";
import { Pencil, X } from "react-bootstrap-icons";
import { updateLocation } from "../../api/CampaignApi";

const UpdateLocation = ({
  locations,
  data,
  isOpen,
  onClose,
  refreshLocations,
}) => {
  const [editingData, setEditingData] = useState({
    name: "",
    type: "",
    description: "",
    visited: "",
    isVisible: "",
    image: null,
    imageString: "",
    imagePreview: "",
    masterNotes: "",
  });

  const handleSaveEdit = async () => {
    const original = locations.find((s) => s.id === data.id);
    const unchanged =
      original.name === editingData.name &&
      original.masterNotes === editingData.masterNotes &&
      original.type === editingData.type &&
      original.visited === editingData.visited &&
      original.isVisible === editingData.isVisible &&
      original.description === editingData.description;
    if (unchanged) {
      onClose();
    }
    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", editingData.name);
      formData.append("masterNotes", editingData.masterNotes);
      formData.append("type", editingData.type);
      formData.append("description", editingData.description);
      formData.append("visited", editingData.visited);
      formData.append("isVisible", editingData.isVisible);
      if (editingData.image) {
        formData.append("image", editingData.image);
      }

      await updateLocation(data.id, formData);
      await refreshLocations();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);

  useEffect(() => {
    if (isOpen) {
      setEditingData({
        name: data.name,
        type: data.type,
        masterNotes: data.masterNotes,
        description: data.description,
        visited: data.visited,
        isVisible: data.isVisible,
        image: null,
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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-100 lg:w-[40vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-gold text-xl font-bold mb-3">
              Modifica luogo
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
                className="mt-4 cursor-pointer bg-second-background hover:bg-[#222222] text-white border border-[#333333] rounded-md px-4 py-2 inline-block"
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
              <label htmlFor="name" className="text-gold text-sm">
                Nome
              </label>
              <InputForm
                id="name"
                type="text"
                value={editingData.name}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    name: e.target.value,
                  })
                }
                placeholder="Nome"
              />
              <label htmlFor="type" className="text-gold text-sm">
                Tipo
              </label>
              <InputForm
                id="type"
                type="text"
                value={editingData.type}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    type: e.target.value,
                  })
                }
                placeholder="Tipo"
              />
              <CustomCheckbox
                id="visited"
                checked={editingData.visited}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    visited: e.target.checked,
                  })
                }
                label="Luogo Visitato"
              />
              <div className="flex justify-end gap-2 mt-4"></div>
            </div>
          </div>
          <label htmlFor="description" className="text-gold text-sm mb-2">
            Descrizione
          </label>
          <textarea
            id="description"
            type="text-area"
            value={editingData.description}
            onChange={(e) =>
              setEditingData({
                ...editingData,
                description: e.target.value,
              })
            }
            placeholder="Descrizione"
            className="w-full min-h-20 p-2 border border-gray-700 rounded resize-none align-top whitespace-pre-wrap break-words mb-3"
          />
          {/* Note del Master */}
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
              placeholder="Dungeon finale e più grande. Contiene la Forgia..."
              className="  border-gray-700 w-full min-h-20 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
            />
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

export default UpdateLocation;
