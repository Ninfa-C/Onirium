/* eslint-disable no-unused-vars */
import { Eye } from "react-bootstrap-icons";
import { Button } from "../../Generic/ButtonCustom";
import { Card, CardContent, CardFooter, CardTitle } from "../../Generic/Cards";
import { useState } from "react";
import {
  createCharacterAssignment,
  deleteCharacterAssignment,
} from "../../../api/CampaignApi";

const SingleCardAssign = ({
  char,
  campaignId,
  assignedCharacters,
  refreshAssignments,
}) => {
  const [loading, setLoading] = useState(false);
  const [assigned, setAssigned] = useState(false);

  const isAssigned = assignedCharacters?.some(
    (assignedChar) => assignedChar.charId === char.id
  );

  //   console.log(char, assignedCharacters, isAssigned);

  const handleAdd = async () => {
    setLoading(true);
    const request = {
      playerCampaignId: campaignId,
      characterId: char.id,
    };
    try {
      await createCharacterAssignment(request);
      setLoading(false);
    } catch (error) {
      console.error("Errore nel recupero utenti:", error.message);
      setLoading(false);
    } finally {
      refreshAssignments();
    }
  };

  const handleRemove = async () => {
    setLoading(true);

    const assignment = assignedCharacters?.find(
      (assignedChar) => assignedChar.charId === char.id
    );
    console.log(assignment);

    try {
      const result = await deleteCharacterAssignment(assignment.assigngId);
      console.log("Character removed:", result);
      setAssigned(false);
      setLoading(false);
    } catch (error) {
      console.error("Errore nel recupero utenti:", error.message);
      setLoading(false);
    } finally {
      refreshAssignments();
    }
  };
  
  return (
    <Card className="bg-second-bg border border-gold/30 text-white overflow-hidden p-3  flex items-center">      
      <div
        className="bg-cover bg-center rounded-md h-30 w-15"
        style={{
          backgroundImage: `url(http://localhost:5034/${char.image.replace(
            /\\/g,
            "/"
          )})`,
        }}
      />
      <div>
        <CardContent className="flex gap-3 items-center">
          <div className="items-center">
            <CardTitle className="text-gold">{char.name}</CardTitle>
            <div className="text-gray-400">
              Lvl {char.level} •{" "}
              {char.race.subrace ? char.race.subrace : char.race.name} •{" "}
              {char.background.name}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>
            <Eye className="hover:" />
          </Button>
          {!isAssigned ? (
            <Button
              type="button"
              onClick={handleAdd}
              className="border border-gold/30 hover:bg-gold/30 h-8"
              disabled={loading} 
            >
              {loading ? "Aggiungendo..." : "Aggiungi"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleRemove}
              className="border border-red-500/30 hover:bg-red-500/30 h-8"
              disabled={loading}
            >
              {loading ? "Rimuovendo..." : "Rimuovi"}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};

export default SingleCardAssign;
