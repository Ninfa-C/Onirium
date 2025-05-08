import { Plus } from "react-bootstrap-icons";
import { getUserFromToken } from "../../../api/AccountApi";
import { Button } from "../../Generic/ButtonCustom";
import AddCharacter from "./AddCharacter";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../../Generic/Cards";
import { deleteCharacterAssignment } from "../../../api/CampaignApi";
import { AlertDialog } from "radix-ui";

const CampaignCharacterHomepage = ({ campaign, characters, refreshChars }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const logged = getUserFromToken();
  const player = campaign.players.find((player) => player.username === logged);
  const [error, setError] = useState(false);
  
  const handleDelete = async (id) => {
    setError(false);
    try {
      await deleteCharacterAssignment(id);
      refreshChars()
    } catch {
      setError(true);
    }
  };
console.log(characters)
  useEffect(() => {}, []);

  return (
    <section id="characters">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-gold">I tuoi personaggi</h3>
        <Button
          className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Aggiungi
        </Button>
      </div>

      {characters.map((character, i) => (
        <Card
          key={i}
          className="bg-second-background border border-gold/30 overflow-hidden"
        >
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 border-2 border-gold/50 relative flex shrink-0 overflow-hidden rounded-full">
                  <img
                    src={
                      character.image
                        ? `http://localhost:5034/${character.image.replace(
                            /\\/g,
                            "/"
                          )}`
                        : "/placeholder.svg"
                    }
                    alt={character.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-gold font-medium capitalize">
                      {character.name}
                    </h3>
                  </div>
                  <p className="text-gray-400">
                    {character.raceName}{" "}
                    {character.classes?.map((c) => c.name).join(", ")} (Lvl{" "}
                    {character.level})
                  </p>
                  <p>{character.isAlive? "Vivo" : "Deceduto"}</p>
                </div>
              </div>
              <div className="flex mt-2 md:mt-0">
              <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="inline-flex h-[35px] items-center justify-center rounded bg-red-500/30 px-[15px] font-medium leading-none outline-none outline-offset-1 hover:bg-red-500/50 focus-visible:outline-2 cursor-pointer select-none">
                  Rimuovi Eroe
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
                    appartenentiall'eroe in questa questa campagna.
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
                        onClick={() =>handleDelete(character.assigngId)}
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
            </div>
          </CardContent>
        </Card>
      ))}

      <AddCharacter
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        campaignId={player.assignmenteId}
        assigned={characters}
        refreshAssignments={refreshChars}
      />
    </section>
  );
};

export default CampaignCharacterHomepage;
