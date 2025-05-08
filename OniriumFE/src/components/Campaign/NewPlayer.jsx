import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "react-bootstrap-icons";
import { getUsers, sendPlayerInvite } from "../../api/CampaignApi";
import { getUserFromToken } from "../../api/AccountApi";

const NewPlayer = ({ isOpen, onClose, campaign }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inviteRequest, setInviteRequest] = useState();

   const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    try {
      const response = await getUsers(value);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Errore nel recupero utenti:", error.message);
    }
  };
  const inviterName = getUserFromToken();

  const handleAdd = (user) => {
    setInviteRequest({
      campaignId: campaign.id,
      campaignName: campaign.name,
      InviterName : inviterName,
      users: [{ email: user.email, name: user.username }],
    });
    console.log(inviteRequest)
    try {        
        sendPlayerInvite(inviteRequest);        
      } catch (error) {
        console.error("Errore nel recupero utenti:", error.message);
      }
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-second-background border border-gold/30 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Dialog.Description className="sr-only">
              Aggiungi un nuovo giocatore alla campagna
            </Dialog.Description>
            <Dialog.Title className="text-gold text-lg font-medium">
              Aggiungi Giocatore
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gold hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Cerca giocatore..."
            className="w-full p-2 rounded bg-black/30 border border-gold/20 text-white placeholder-gray-400"
          />

          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((users, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-black/20 rounded-md text-white"
                >
                  <span>{users.username}</span>
                  <button
                    onClick={() => handleAdd(users)}
                    className="text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded hover:bg-green-500/30"
                  >
                    Invita
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Nessun risultato trovato.</p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewPlayer;
