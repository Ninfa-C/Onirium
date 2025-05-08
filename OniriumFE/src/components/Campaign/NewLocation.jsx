import { Button } from "../Generic/ButtonCustom";
import * as Dialog from "@radix-ui/react-dialog";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import { createLocation } from "../../api/CampaignApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { X } from "react-bootstrap-icons";

const NewLocation = ({ isOpen, onClose, refreshLocations }) => {
  const { id: campaignId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    visited: false,
    image: null,
    isVisible: false,
    masterNotes: "",
  });

  const handleAddLocation = async () => {
    try {
      const locationDto = new FormData();
      locationDto.append("name", formData.name);
      locationDto.append("type", formData.type);
      locationDto.append("masterNotes", formData.masterNotes);
      locationDto.append("description", formData.description);
      locationDto.append("visited", formData.visited);
      locationDto.append("isVisible", formData.isVisible);
      if (formData.image) {
        locationDto.append("image", formData.image);
      }

      await createLocation(campaignId, locationDto);
      await refreshLocations();
      onClose();
      setFormData({
        name: "",
        type: "",
        description: "",
        visited: false,
        image: null,
        isVisible: false,
        masterNotes: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2  w-100 lg:w-[40vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-gold text-xl font-bold mb-3">
                Aggiungi Nuova Location
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm mb-4">
                Crea un nuovo luogo nella tua campagna. Compila tutti i campi.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="grid gap-4 py-4">
            {/* Nome */}
            <div className="grid gap-2">
              <label htmlFor="name" className="text-gold text-sm">
                Nome
              </label>
              <InputForm
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Foresta Incantata"
                className="bg-black/50 border-gold/30 text-white"
              />
            </div>

            {/* Tipo */}
            <div className="grid gap-2">
              <label htmlFor="type" className="text-gold text-sm">
                Tipo
              </label>
              <InputForm
                type="text"
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                placeholder="Bosco, Villaggio, Città..."
                className="bg-black/50 border-gold/30 text-white"
              />
            </div>

            {/* Descrizione */}
            <div className="grid gap-2">
              <label htmlFor="description" className="text-gold text-sm">
                Descrizione
              </label>
              <textarea
                type="text-area"
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Un luogo misterioso immerso nella nebbia..."
                className="bg-black/50 border-gold/30 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            {/* Note del Master */}
            <div>
              <label className="text-sm text-gold mb-1 block">
                Note del Master
              </label>
              <textarea
                type="text-area"
                value={formData.masterNotes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masterNotes: e.target.value,
                  })
                }
                placeholder="Preparare mappe dettagliate del castello. Ricordare che..."
                className="bg-black/50 border-gold/30 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            {/* Immagine */}
            <div className="grid gap-2">
              <label htmlFor="image" className="text-gold text-sm">
                Immagine
              </label>
              <InputForm
                type="file"
                id="image"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="bg-black/50 border-gold/30 text-white p-2"
              />
            </div>

            {/* Checkbox */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <CustomCheckbox
                id="visited"
                checked={formData.visited}
                onChange={(e) =>
                  setFormData({ ...formData, visited: e.target.checked })
                }
                label="Luogo visitato"
              />

              <CustomCheckbox
                id="isVisible"
                checked={formData.isVisible}
                onChange={(e) =>
                  setFormData({ ...formData, isVisible: e.target.checked })
                }
                label="Visibile ai giocatori"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              className="border-gold/30 text-gold hover:bg-gold/10 border"
            >
              Annulla
            </Button>
            <Button
              onClick={handleAddLocation}
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
            >
              Aggiungi Location
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewLocation;
