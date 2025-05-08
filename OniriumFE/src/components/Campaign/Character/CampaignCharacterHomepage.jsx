import {  Plus } from "react-bootstrap-icons";
import { getUserFromToken } from "../../../api/AccountApi";
import { Button } from "../../Generic/ButtonCustom";
import AddCharacter from "./AddCharacter";
import { useState } from "react";

const CampaignCharacterHomepage = ({ campaign, characters, refreshChars }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const logged = getUserFromToken();
  const player = campaign.players.find((player) => player.username === logged);

  return (
    <section id="characters">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gold">I tuoi personaggi</h3>
        <Button
          className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Aggiungi
        </Button>
      </div>
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
