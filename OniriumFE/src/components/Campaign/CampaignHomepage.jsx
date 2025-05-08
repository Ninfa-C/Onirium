import { useEffect } from "react";
import { useState } from "react";
import { getUserCampaigns } from "../../api/CampaignApi";
import { Link } from "react-router-dom";
import {  Plus } from "react-bootstrap-icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { Master } from "../../assets/icons/generic";
import OniriumLoader from "../Generic/OniriumLoader";

const CampaignHomepage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const result = await getUserCampaigns();
        setCampaigns(result.data);
      } catch (err) {
        setError("Errore durante il caricamento delle tue campagne.", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);
  return (
    <>
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/11/dnd-castle-on-a-cliff.jpg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-wider text-gold fade-up">
            LE TUE CAMPAGNE
          </h1>
          <p className="max-w-2xl text-gray-300 fade-up">
            Scrivi la tua leggenda, esplora mondi incantati e vivi avventure
            epiche.
          </p>
        </div>
      </div>
      {console.log(campaigns)}
      <div className="container-fluid mx-auto py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gold uppercase">
            le mie campagne
          </h1>
          <Link
            to="/Campaign/Create"
            className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 flex items-center px-2 py-1"
          >
            <Plus className="mr-2 h-5 w-5" /> Nuova Campagna
          </Link>
        </div>
        {loading && <div className="h-[60vh] flex justify-center imtes-center"><OniriumLoader size="md" text="CARICAMENTO"/></div>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.length == 0 && <p>Nessuna campagna presente</p>}
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="bg-parchment border border-gold/30 overflow-hidden"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(http://localhost:5034/${campaign.img.replace(
                        /\\/g,
                        "/"
                      )})`,
                      filter: "brightness(0.7)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div
                      className={`border-transparent hover:bg-gold inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs  transition-colors ${
                        campaign.role === "master"
                          ? "bg-gold/80 text-black"
                          : "bg-blue-500/80 text-white"
                      }`}
                    >
                      {campaign.role === "master" ? "Master" : "Giocatore"}
                    </div>                    
                  </div>
                </div>
                <CardHeader className="pb-0">
                  <CardTitle className="text-gold">{campaign.name}</CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-4">
                    {campaign.description}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center" title={`Game master: ${campaign.gameMasterName}`}>
                      <Master className="h-5 w-5 text-gold mr-1" />
                      <span className="text-gray-300">
                        {campaign.gameMasterName}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link
                    to={`/Campaign/detail/${campaign.id}`}
                    className="w-full"
                  >
                    <button className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 px-2 py-1 rounded-sm">
                      {campaign.role === "master"
                        ? "Gestisci Campagna"
                        : "Entra nella Campagna"}
                    </button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CampaignHomepage;
