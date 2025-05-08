import { useEffect, useState } from "react";
import { getUserCharacters } from "../../api";
import { TabsContent } from "../Generic/Tabs";
import { Link } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import SingleCarCard from "./SingleCarCard";
import OniriumLoader from "../Generic/OniriumLoader";

const MyCharactersPage = () => {
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
    <TabsContent value="characters" className="mt-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gold uppercase">
          I Miei Personaggi
        </h1>
        <Link
          to="/Creations/Character/Create"
          className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 flex items-center px-2 py-1"
        >
          <Plus className="mr-2 h-5 w-5" /> Nuovo Personaggio
        </Link>
      </div>
      {loading && <OniriumLoader size="md" text="CARICAMENTO"/>}

      {characters.length === 0 ? (
        <></>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         { characters.map((char) => (
          <div key={char.id}>
           <SingleCarCard char = {char}/>
          </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

    
    </TabsContent>
  );
};

export default MyCharactersPage;
