import { BookOpenIcon } from "@heroicons/react/16/solid";
import { Button } from "../Generic/ButtonCustom";
import { PencilSquare } from "react-bootstrap-icons";
import { Card, CardContent } from "../Generic/Cards";

const Panoramica = ({ campaign }) => {
  return (
    <section id="overview" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <BookOpenIcon className="h-8 mr-2" /> Panoramica
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10"
          >
            <PencilSquare className="h-4 w-4 mr-2" /> Modifica
          </Button>
        </div>
      </div>
      <Card className="border border-gold/30">
        <CardContent>
          <p className="text-gray-300 leading-relaxed">
            {campaign.description}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Panoramica;
