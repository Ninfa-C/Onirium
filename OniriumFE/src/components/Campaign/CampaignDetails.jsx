/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  listLocations,
  listNpcs,
  listQuests,
  listNotes,
  listSessions,
  getCampaignDetails,
  getCharacterAssignmentsForPlayer,
} from "../../api/CampaignApi";
import { People } from "react-bootstrap-icons";
import DetailAside from "./DetailAside";
import DetailMainContent from "./DetailMainContent";
import { getUserFromToken } from "../../api/AccountApi";
import OniriumLoader from "../Generic/OniriumLoader";

const CampaignDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const [characters, setCharacters] = useState([]);

  async function fetchCampaignData() {
    try {
      const [
        campaignResponse,
        locationsResponse,
        npcsResponse,
        questsResponse,
        notesResponse,
        sessionsResponse,
      ] = await Promise.all([
        getCampaignDetails(id),
        listLocations(id),
        listNpcs(id),
        listQuests(id),
        listNotes(id),
        listSessions(id),
      ]);

      setData({
        campaign: campaignResponse.data,
        locations: locationsResponse.data,
        npcs: npcsResponse.data,
        quests: questsResponse.data,
        notes: notesResponse.data,
        sessions: sessionsResponse.data,
      });
    } catch (err) {
      console.error(err);
      setError("Errore caricando i dati della campagna");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCharacterAssignments() {
    const logged = getUserFromToken();
    const player = data?.campaign?.players?.find(
      (player) => player.username === logged
    );
    if (player) {
      try {
        const result = await getCharacterAssignmentsForPlayer(
          player.assignmenteId
        );
        setCharacters(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function fetchSessionsOnly() {
    try {
      const sessionsResponse = await listSessions(id);
      setData((prev) => ({
        ...prev,
        sessions: sessionsResponse.data,
      }));
    } catch (err) {
      console.error("Errore aggiornando sessioni:", err);
    }
  }

  async function fetchLocationsOnly() {
    try {
      const locationsResponse = await listLocations(id);
      setData((prev) => ({
        ...prev,
        locations: locationsResponse.data,
      }));
    } catch (err) {
      console.error("Errore aggiornando locations:", err);
    }
  }

  // async function fetchNpcsOnly() {
  //   try {
  //     const npcsResponse = await listNpcs(id);
  //     setData((prev) => ({
  //       ...prev,
  //       npcs: npcsResponse.data,
  //     }));
  //   } catch (err) {
  //     console.error("Errore aggiornando NPC:", err);
  //   }
  // }

  async function fetchQuestsOnly() {
    try {
      const questsResponse = await listQuests(id);
      setData((prev) => ({
        ...prev,
        quests: questsResponse.data,
      }));
    } catch (err) {
      console.error("Errore aggiornando quests:", err);
    }
  }

  async function fetchNotesOnly() {
    try {
      const notesResponse = await listNotes(id);
      setData((prev) => ({
        ...prev,
        notes: notesResponse.data,
      }));
    } catch (err) {
      console.error("Errore aggiornando notes:", err);
    }
  }

  useEffect(() => {
    fetchCampaignData();
  }, [id]);

  useEffect(() => {
    if (data?.campaign?.players?.length > 0) {
      fetchCharacterAssignments();
    }
  }, [data]);

  if (loading)
    return (
      <div className="h-[90vh] flex justify-center imtes-center"><OniriumLoader size="md" text="CARICAMENTO"/></div>
    );
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const { campaign, locations, quests, notes, sessions } = data;
  return (
    <>
      {/* Header */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(http://localhost:5034/${campaign.image.replace(
              /\\/g,
              "/"
            )})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-wider text-gold fade-up">
            {campaign.name}
          </h1>
          <div className="flex gap-3">
            <div
              className={`border-transparent hover:bg-gold inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs  transition-colors hover:cursor-pointer ${
                campaign.role === "master"
                  ? "bg-gold/80 text-black"
                  : "bg-blue-500/80 text-white"
              }`}
              title={`Ruolo: ${campaign.role}`}
            >
              {campaign.role === "master" ? "Master" : "Giocatore"}
            </div>
            <div
              className="hover:cursor-pointer hover:bg-gray-400 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs  transition-colors bg-black/60 text-white border border-white/20 gap-2"
              title={`Numero giocatri: ${campaign.players?.length}`}
            >
              <People className="w-4 h-3" /> {campaign.players?.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container-fluid mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DetailAside
            campaign={campaign}
            sessions={sessions}
            refreshSessions={fetchSessionsOnly}
            setActiveSection={setActiveSection}
            refreshChars={fetchCharacterAssignments}
            characters={characters}
            setSelectedCharacterId={setSelectedCharacterId}
          />
          <DetailMainContent
            selectedCharacterId={selectedCharacterId}
            setSelectedCharacterId={setSelectedCharacterId}
            campaign={campaign}
            refreshCampaign = {fetchCampaignData}
            locations={locations}
            refreshLocation={fetchLocationsOnly}
            // npcs={npcs}
            // refreshNpc={fetchNpcsOnly}
            quests={quests}
            refreshQuests={fetchQuestsOnly}
            notes={notes}
            refreshNotes={fetchNotesOnly}
            sessions={sessions}
            refreshSessions={fetchSessionsOnly}
            activeSection={activeSection}
            characters={characters}
            refreshChars={fetchCharacterAssignments}
          />
        </div>
      </div>
    </>
  );
};

export default CampaignDetails;
