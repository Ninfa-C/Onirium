import { useEffect } from "react";
import Impostazioni from "./Impostazioni";
import Luoghi from "./Luoghi";
import Missioni from "./Missioni";
import Note from "./Note";
import Panoramica from "./Panoramica";
import Personaggi from "./Personaggi";
import Sessioni from "./Sessioni";
import CampaignCharacterHomepage from "./Character/CampaignCharacterHomepage";
import CharInfoShow from "./Character/CharInfoShow";

const DetailMainContent = ({
  campaign,
  refreshCampaign,
  locations,
  refreshLocation,
  npcs,
  refreshNpc,
  quests,
  refreshQuests,
  notes,
  refreshNotes,
  sessions,
  refreshSessions,
  activeSection,
  characters,
  refreshChars,
  selectedCharacterId,
}) => {
  //console.log(campaign.id)
  
  useEffect(() => {}, [activeSection]);

  return (
    <div className="col-span-4 lg:col-span-3">
      {!selectedCharacterId && activeSection !== "settings" && activeSection !== "characters" && (
        <>
          <Panoramica campaign={campaign} />
          <Personaggi campaign={campaign} />
          <Sessioni
            refreshSessions={refreshSessions}
            sessions={sessions}
            campaign={campaign}
          />
          <Luoghi
            locations={locations}
            refreshLocations={refreshLocation}
            campaign={campaign}
          />
          <Missioni
            quests={quests}
            refreshQuests={refreshQuests}
            campaign={campaign}
          />
          <Note notes={notes} refreshNotes={refreshNotes} campaign={campaign} />
        </>
      )}
      {activeSection === "settings" && campaign.role === "master" && (
        <Impostazioni
          campaign={campaign}
          locations={locations}
          sessions={sessions}
          quests={quests}
          notes={notes}
          refreshCampaign={refreshCampaign}
        />
      )}
      {activeSection === "characters" && (
        <CampaignCharacterHomepage
          campaign={campaign}
          refreshChars={refreshChars}
          characters={characters}
        />
      )}

      {characters.map(
        (char,i) =>
          activeSection === char.assigngId && (
            <section key={i} id={char.id} className="">
              <CharInfoShow id={selectedCharacterId}/>
            </section>
          )
      )}
    </div>
  );
};

export default DetailMainContent;
