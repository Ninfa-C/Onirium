import { useState } from "react";
import { Button } from "../Generic/ButtonCustom";
import {
  ChatLeft,
  ChevronDown,
  ChevronUp,
  Pencil,
  People,
  Plus,
} from "react-bootstrap-icons";
import { Card, CardContent } from "../Generic/Cards";

const Personaggi = ({ campaign }) => {
  const [expandedSections, setExpandedSections] = useState(true);

  return (
    <section id="players" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <People className="h-5 w-5 mr-2" /> Giocatori
        </h2>
        <div className="flex items-center">
          {/* {campaign.role === "master" && (
            <Button className="border border-gold/30 text-gold hover:bg-gold/10 mr-2">
              <Plus className="h-4 w-4 mr-2" /> Aggiungi
            </Button>
          )} */}
          <Button
            className="text-gray-400 hover:text-gold"
            onClick={() => setExpandedSections(!expandedSections)}
          >
            {expandedSections ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {expandedSections && (
        <div className="space-y-4">
          {campaign.players?.map((player) => (
            <div key={player.username}>
              <div className="space-y-4">
                {player.characters.map((character,i) => (
                  <Card
                    key={i}
                    className="bg-second-background border border-gold/30 overflow-hidden"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
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
                              {character.classes?.map((c) => c.name).join(", ")}{" "}
                              (Lvl {character.level})
                            </p>
                            <p>Giocatore: {player.username}</p>
                          </div>
                        </div>
                        <div className="flex-1 mt-2 md:mt-0">
                          {campaign.role === "master" && (
                            <div className="bg-black/30 p-3 rounded-md border border-gold/10">
                              <h4 className="text-sm text-gold mb-1">
                                Note del Master:
                              </h4>
                              {character.notes?.length > 0 ? (
                                <ul className="list-disc ml-5 text-gray-300 text-sm">
                                  {character.notes.map((note, idx) => (
                                    <li key={idx}>{note}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-400">
                                  Nessuna nota disponibile.
                                </p>
                              )}
                              <div className="flex justify-end mt-2 gap-2">
                                <Button
                                  className="border border-gold/30 text-gold hover:bg-gold/10 h-8"
                                >
                                  <Pencil className="h-3 w-3 mr-1" /> Modifica
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Personaggi;
