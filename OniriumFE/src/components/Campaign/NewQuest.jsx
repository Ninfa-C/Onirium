// NewQuest.jsx
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Generic/ButtonCustom";
import { InputForm, CustomCheckbox } from "../Generic/Form";
import { X } from "react-bootstrap-icons";
import { useState } from "react";
import { createQuest } from "../../api/CampaignApi";
import { useParams } from "react-router-dom";

const NewQuest = ({ isOpen, onClose, refreshQuests }) => {
  const { id: campaignId } = useParams();
  const [formQuest, setFormQuest] = useState({
    title: "",
    description: "",
    status: "In corso",
    reward: "",
    isVisible: true,
    masterNotes: "",
  });

  const handleCreateQuest = async (e) => {
    e.preventDefault();
    try {
      await createQuest(campaignId, {
        title: formQuest.title,
        description: formQuest.description,
        status: formQuest.status,
        reward: formQuest.reward,
        isVisible: formQuest.isVisible,
        masterNotes:formQuest.masterNotes
      });
      await refreshQuests();
      setFormQuest({
        title: "",
        description: "",
        status: "In corso",
        reward: "",
        isVisible: true,
        masterNotes:"",
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[40vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex justify-between mb-6">
            <h2 className="text-gold text-xl font-bold">
              Aggiungi Nuova Missione
            </h2>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gold text-sm">Titolo</label>
              <InputForm
                type="text"
                value={formQuest.title}
                onChange={(e) =>
                  setFormQuest({ ...formQuest, title: e.target.value })
                }
                placeholder="Titolo Missione"
                className="bg-black/50 border-gold/30 text-white min-h-10"
              />
            </div>
            <div>
              <label className="text-gold text-sm">Descrizione</label>
              <textarea
                type="text-area"
                value={formQuest.description}
                onChange={(e) =>
                  setFormQuest({ ...formQuest, description: e.target.value })
                }
                placeholder="Descrizione dettagliata della missione..."
                className="bg-black/50 border-gold/30 w-full min-h-5 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gold text-sm">Stato</label>
              <select
                value={formQuest.status}
                onChange={(e) =>
                  setFormQuest({ ...formQuest, status: e.target.value })
                }
                className="w-full bg-black/50 border border-gold/30 text-white p-2 rounded hover:bg-gold/10 hover:text-gold"
              >
                <option value="In corso">In corso</option>
                <option value="Completata">Completata</option>
                <option value="Fallita">Fallita</option>
              </select>
            </div>
            <div>
              <label className="text-gold text-sm">Ricompensa</label>
              <textarea
                type="text"
                value={formQuest.reward}
                onChange={(e) =>
                  setFormQuest({ ...formQuest, reward: e.target.value })
                }
                placeholder="100 PE, Arma Magica..."
                className="bg-black/50 border-gold/30 w-full min-h-5 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            {/* Note del Master */}
            <div>
              <label className="text-sm text-gold mb-1 block">
                Note del Master
              </label>
              <textarea
                type="text-area"
                value={formQuest.masterNotes}
                onChange={(e) =>
                  setFormQuest({
                    ...formQuest,
                    masterNotes: e.target.value,
                  })
                }
                placeholder="Preparare mappe dettagliate del castello. Ricordare che..."
                className="bg-black/50 border-gold/30 w-full min-h-15 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <CustomCheckbox
                id="isVisible"
                label="Visibile ai giocatori"
                checked={formQuest.isVisible}
                onChange={(e) =>
                  setFormQuest({ ...formQuest, isVisible: e.target.checked })
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
              onClick={handleCreateQuest}
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
            >
              Aggiungi Missione
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewQuest;
