import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../Generic/ButtonCustom";
import { Calendar, Clock, X } from "react-bootstrap-icons";
import { useState } from "react";
import { CustomCheckbox, InputForm } from "../Generic/Form";
import { useParams } from "react-router-dom";
import { Toast } from "radix-ui";
import { createSessionAsync } from "../../api/CampaignApi";
import DateInput from "../Generic/DateInput";
import TimePicker from "../Generic/TimePicker";

const NewSession = ({ isOpen, onClose, refreshSessions }) => {
  const { id: campaignId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    completed: false,
    summary: "",
    nextSessionDate: "",
    nextSessionTime: "",
    isVisible: false,
    masterNotes: ""
  });

  const handleAddSession = async () => {
    try {
      const sessionDto = {
        title: formData.title,
        date: `${formData.date}T${formData.time}`,
        completed: formData.completed,
        summary: formData.summary,
        nextSessionDate: formData.nextSessionDate
          ? new Date(formData.nextSessionDate)
          : null,
        isVisible: formData.isVisible,
        masterNotes: formData.masterNotes
      };
      await createSessionAsync(campaignId, sessionDto);
      await refreshSessions();
      onClose();
      setFormData({
        title: "",
        date: "",
        time: "",
        completed: false,
        summary: "",
        nextSessionDate: "",
        nextSessionTime: "",
        isVisible: false,
        masterNotes: ""
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
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-10 top-1/2 left-1/2 lg:h-[90vh] w-100 lg:w-[40vw]  -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-gold text-xl font-bold mb-3">
                Aggiungi Nuova Sessione
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm mb-4">
                Crea una nuova sessione per la tua campagna. Compila tutti i
                campi necessari.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-gold text-sm">
                Titolo
              </label>
              <InputForm
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Capitolo 5: La Foresta Oscura"
                className="bg-black/50 border-gold/30 text-white"
              />
            </div>
            {/* data e ora */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gold mb-1 block">Data</label>
                <DateInput
                  className="bg-dark  border-gold/40"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gold mb-1 block">Ora</label>
                <TimePicker
                className="bg-dark border-gold/40 "
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="summary" className="text-gold  text-sm">
                Riassunto (visibile ai giocatori)
              </label>
              <InputForm
                type="text-area"
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                placeholder="Il gruppo si addentra nella foresta alla ricerca del santuario perduto..."
                className="bg-black/50 border-gold/30 text-white min-h-24"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <CustomCheckbox
                id="completed"
                checked={formData.completed}
                onChange={(e) =>
                  setFormData({ ...formData, completed: e.target.checked })
                }
                label="Sessione già completata"
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
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
              onClick={handleAddSession}
            >
              Aggiungi Sessione
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewSession;
