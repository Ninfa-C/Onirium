import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import {  X } from "react-bootstrap-icons";
import { getUserCharacters } from "../../../api";
import SingleCardAssign from "./SingleCardAssign";
import { Button } from "../../Generic/ButtonCustom";
import { Link } from "react-router-dom";

const AddCharacter = ({
  isOpen,
  onClose,
  campaignId,
  assigned,
  refreshAssignments,
}) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const result = await getUserCharacters();
        setCharacters(result);
      } catch (error) {
        console.error("Errore nel caricamento dei personaggi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-100 lg:w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8 space-y-6">
          <div className="flex justify-between">
            <h2 className="text-gold text-xl font-bold">
              Aggiungi un nuovo avventuriero
            </h2>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div>
            {loading && <p>Caricamento...</p>}
            {characters.length === 0 ? (
              <p>Nessun personaggio trovato.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {characters.map((char) => (
                  <div key={char.id}>
                    <SingleCardAssign
                      char={char}
                      campaignId={campaignId}
                      assignedCharacters={assigned}
                      refreshAssignments={refreshAssignments}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Link to="/Creations/Character/Create">
              <Button className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border">
                Nel laboratorio, il tuo eroe ti aspetta!
              </Button>
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddCharacter;
