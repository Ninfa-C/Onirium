import { Eye, Heart, Share } from "react-bootstrap-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { Link } from "react-router-dom";

const SingleCarCard = ({ char }) => {
  return (
    <Card className="bg-second-bg border border-gold/30 text-white overflow-hidden">
      <div className="h-40 w-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(http://localhost:5034/${char.image.replace(
              /\\/g,
              "/"
            )})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          {/* <Badge className="bg-gold/20 text-gold hover:bg-gold/30">Condiviso</Badge> */}
        </div>
      </div>
      <CardHeader className="border-b border-gold/20 bg-second-background">
        <div className="flex justify-between items-center">
          <CardTitle className="text-gold">{char.name}</CardTitle>
          <div className="bg-dark text-gold border border-gold/50 px-2 rounded-full">
            Lvl {char.level}
          </div>
        </div>
        <CardDescription className="text-gray-400">
          {char.race.subrace ? char.race.subrace : char.race.name} • {char.background.name}

        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 bg-second-background">
        <div className="flex gap-2 justify-evenly mb-4">
          {char.stats.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-xs text-gray-400">
                {item.name?.slice(0, 3).toUpperCase()}
              </p>
              <p className="text-lg font-bold text-gold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1 text-red-500" />
            <span>42 Mi Piace</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1 text-blue-400" />
            <span>128 Visualizzazioni</span>
          </div>
        </div> */}
          <CardFooter className="grid grid-cols-2 mt-5 gap-3">
            <Link to={`/Creation/Character/${char.id}`}  className="border-gold/30 text-gold hover:bg-gold/10 hover:text-gold flex items-center border py-1 rounded-sm justify-center bg-dark"> 
            <Eye className="mr-2 h-4 w-4" /> Visualizza
            </Link>
            <Link to="/" className="bg-gold/20 hover:bg-gold/30 text-gold border-gold/30 flex items-center border py-1 rounded-sm justify-center"> 
            <Share className="mr-2 h-4 w-4" /> Condividi
            </Link>
          </CardFooter>

      </CardContent>
    </Card>
  );
};

export default SingleCarCard;
