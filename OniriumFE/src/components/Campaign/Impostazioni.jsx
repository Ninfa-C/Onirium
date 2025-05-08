import {
  Calendar,
  Eye,
  FileText,
  Pencil,
  People,
  Plus,
  Save,
} from "react-bootstrap-icons";
import { Card, CardContent, CardHeader, CardTitle } from "../Generic/Cards";
import { Switch } from "radix-ui";
import { BookOpenIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Scroll } from "../../assets/icons/generic";
import { Button } from "../Generic/ButtonCustom";
import { useState } from "react";
import NewPlayer from "./NewPlayer";
import { AlertDialog } from "radix-ui";
import { deleCampaign, updateCampaign } from "../../api/CampaignApi";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../Generic/Form";

const Impostazioni = ({
  campaign,
  locations,
  quests,
  notes,
  sessions,
  refreshCampaign,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    image: null,
    imagePreview: campaign.image,
    name: campaign.name,
    description: campaign.description,
  });
  const navigateTo = useNavigate();
  const handleDelete = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      await deleCampaign(campaign.id);
      navigateTo("/Campaign");
    } catch {
      setError(true);
    }
  };

  const InfoRow = ({ label, value }) => (
    <div className="space-y-0.5">
      <label className="text-white">{label}</label>
      <p className="text-sm text-gray-400">{value}</p>
    </div>
  );

  const handleSaveEdit = async () => {
    const unchanged =
      campaign.name === form.name && campaign.description === form.description;
    if (unchanged) {
      setEditing(false);
    }
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      await updateCampaign(campaign.id, formData);
      await refreshCampaign();
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="visibility">
      <Card className="border border-gold/30">
        <CardHeader>
          <CardTitle className="text-gold flex items-center">
            Gestione Campagna
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gold">
                Impostazioni Generali
              </h3>
              {!editing ? (
                <Button
                  className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
                  onClick={() => setEditing(true)}
                >
                  Gestisci
                </Button>
              ) : (
                <Button
                  className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
                  onClick={() => setEditing(false)}
                >
                  Annulla
                </Button>
              )}
            </div>

            {editing ? (
              <div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-48 h-48 bg-second-background border-2 border-dashed border-[#333333] rounded-md flex flex-col items-center justify-center overflow-hidden">
                        <img
                            src={
                              form.imagePreview
                                ? form.imagePreview
                                  ? form.imagePreview
                                  : `http://localhost:5034/${form.imagePreview.replace(/\\/g, "/")}`
                                : "/forge.jpg"
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
                  </div>
                  <div className="grow">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-gold text-sm">
                        Titolo
                      </label>
                      <InputForm
                        type="text"
                        id="title"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Le Miniere Perdute"
                        className="bg-black/50 border-gold/30 text-white"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="description"
                        className="text-gold text-sm"
                      >
                        Descrizione
                      </label>
                      <textarea
                        id="description"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                        placeholder="La campagna si svolge nel regno di...."
                        className="bg-black/50 border-gold/30 w-full min-h-40 p-2 border rounded resize-none align-top whitespace-pre-wrap break-words focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveEdit}
                    className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
                  >
                    <Save className="h-4 w-4 mr-2" /> Salva
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InfoRow label="Nome" value={campaign.name} />
                <InfoRow label="Panoramica" value={campaign.description} />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gold">
                Riepilogo Giocatori
              </h3>
              <Button
                className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border h-8"
                onClick={() => setDialogOpen(true)}
              >
                Gestisci
              </Button>
              <NewPlayer
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                campaign={campaign}
              />
            </div>

            <div className="space-y-2">
              {campaign.players.map((player, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10"
                >
                  <span className="text-white">{player.username}</span>
                  <button className="bg-green-500/20 text-green-300 px-2 rounded-full">
                    Accesso Completo
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gold">
              Riepilogo Visibilità
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gold mr-2" />
                  <span className="text-white">Sessioni</span>
                </div>
                <div className="text-gray-400">
                  {sessions?.filter((s) => s.isVisible).length} di{" "}
                  {sessions.length} visibili
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 text-gold mr-2" />
                  <span className="text-white">Luoghi</span>
                </div>
                <div className="text-gray-400">
                  {locations?.filter((l) => l.isVisible).length} di{" "}
                  {locations?.length} visibili
                </div>
              </div>

              {/* <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10">
                <div className="flex items-center">
                  <People className="h-4 w-4 text-gold mr-2" />
                  <span className="text-white">NPC</span>
                </div>
                <div className="text-gray-400">
                  {npcs?.filter((n) => n.isVisible).length} di {npcs?.length}{" "}
                  visibili
                </div>
              </div> */}

              <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10">
                <div className="flex items-center">
                  <Scroll className="h-4 w-4 text-gold mr-2" />
                  <span className="text-white">Missioni</span>
                </div>
                <div className="text-gray-400">
                  {quests?.filter((q) => q.isVisible).length} di{" "}
                  {quests?.length} visibili
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-black/30 rounded-md border border-gold/10">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gold mr-2" />
                  <span className="text-white">Note</span>
                </div>
                <div className="text-gray-400">
                  {notes.filter((n) => n.isVisible).length} di {notes.length}{" "}
                  visibili
                </div>
              </div>
            </div>
          </div>
          <div>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-red-500/30 px-[15px] font-medium leading-none outline-none outline-offset-1 hover:bg-red-500/50 focus-visible:outline-2 cursor-pointer select-none">
                  Termina Campagna
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-1 bg-dark/80 blur-lg" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-dark  p-[25px] shadow-[var(--shadow-6)] focus:outline-none border border-gold/50">
                  <AlertDialog.Title className="m-0 text-lg font-medium text-red-500">
                    Sei sicuro?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="mb-5 mt-5 leading-normal">
                    Questa azione sarà irriversibile e cancellerà tutti i dati
                    appartenenti a questa campagna.
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-2">
                    <AlertDialog.Cancel asChild>
                      <button className="inline-flex h-[35px] items-center justify-center rounded  px-[15px] font-medium leading-none  outline-none outline-offset-1 cursor-pointer  hover:bg-gray-700/70 border border-gray-700 focus-visible:outline-2 select-none">
                        Annulla
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        className="inline-flex h-[35px] items-center justify-center rounded bg-red-500/30 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red-500/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-red7 select-none"
                        onClick={handleDelete}
                      >
                        Conferma
                      </button>
                    </AlertDialog.Action>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm border border-red-500/30 p-2 rounded bg-red-500/5">
                      C'è stato un errore nella cancellazione. Riprova.
                    </div>
                  )}
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Impostazioni;
