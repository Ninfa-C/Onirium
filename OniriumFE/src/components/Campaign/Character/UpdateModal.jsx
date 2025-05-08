import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "react-bootstrap-icons";
import AddWeapon from "./AddWeapon";
import { Button } from "../../Generic/ButtonCustom";
import { addItemToInventory, addSpellToChar } from "../../../api/CampaignApi";
import { getCharacterAssign } from "../../../redux/slices/characterDetailsSlice";
import { useDispatch } from "react-redux";
import AddArmor from "./AddArmor";
import AddMagical from "./AddMagical";
import AddCommon from "./AddCommon";
import AddSpell from "./AddSpell";

const UpdateModal = ({ isOpen, onClose, character, category }) => {
  const [form, setFormData] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      if (category === "spell") {
        await addSpellToChar(character.character.id, form);
      } else {
        await addItemToInventory(character.character.id, form);
      }
      dispatch(getCharacterAssign(character.id));
    } catch (error) {
      console.error("Errore:", error.message);
    }
    onClose();
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
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 h-[90vh]  w-[80vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md flex flex-col focus:outline-none p-8">
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-gold text-xl font-bold mb-3">
                Aggiungi Nuova Arma
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm">
                Crea un nuovo luogo nella tua campagna. Compila tutti i campi.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {category === "arma" && (
            <AddWeapon data={form} setData={setFormData} />
          )}
          {category === "armatura" && (
            <AddArmor data={form} setData={setFormData} />
          )}
          {category === "magic" && (
            <AddMagical data={form} setData={setFormData} />
          )}
          {category === "common" && (
            <AddCommon data={form} setData={setFormData} />
          )}
          {category === "spell" && (
            <AddSpell data={form} setData={setFormData} />
          )}
          <div className="flex justify-end gap-3 mt-3">
            <Button
              onClick={onClose}
              className="border-gold/30 text-gold hover:bg-gold/10 border"
            >
              Annulla
            </Button>
            <Button
              className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
              onClick={() => handleAdd()}
            >
              Aggiungi
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateModal;
