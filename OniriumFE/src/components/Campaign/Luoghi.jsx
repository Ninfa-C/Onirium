import { MapPinIcon } from "@heroicons/react/16/solid";
import { Button } from "../Generic/ButtonCustom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeSlash,
  Pencil,
  PencilFill,
  Plus,
  X,
} from "react-bootstrap-icons";
import NewLocation from "./NewLocation";
import { Card, CardContent, CardFooter } from "../Generic/Cards";
import { deleteLocation, updateLocation } from "../../api/CampaignApi";
import UpdateLocation from "./UpdateLocation";
import ImageDialog from "../Generic/ImageDialog";

const Luoghi = ({ locations, refreshLocations, campaign }) => {
  const [locationModalOpes, setLocationModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageId, setImageId] = useState(null);

  const toggleVisibility = async (data) => {
    console.log(data);
    const locationDto = new FormData();
    locationDto.append("id", data.id);
    locationDto.append("masterNotes", data.masterNotes);
    locationDto.append("name", data.name);
    locationDto.append("type", data.type);
    locationDto.append("description", data.description);
    locationDto.append("visited", data.visited);
    locationDto.append("isVisible", !data.isVisible);
    if (data.image) {
      locationDto.append("image", data.image);
    }
    try {
      await updateLocation(data.id, locationDto);
      await refreshLocations();
    } catch (error) {
      console.error("Errore durante il toggle visibilità:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      await refreshLocations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="locations" className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2" /> Luoghi
        </h2>
        <div className="flex items-center">
          {campaign.role === "master" && (
            <Button
              className="border-gold/30 text-gold hover:bg-gold/10 mr-2 border"
              onClick={() => setLocationModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Aggiungi Luogo
            </Button>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations
            .filter(
              (location) => campaign.role === "master" || location.isVisible
            )
            .map((location) => {
              return (
                <Card
                  key={location.id}
                  className={`bg-second-background border ${
                    !location.visited ? "border-gray-700" : "border-gold/30"
                  } overflow-hidden flex flex-col`}
                >
                  {/* Immagine Header */}

                  <div className="relative h-40 w-full overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(http://localhost:5034/${location.imageString.replace(
                          /\\/g,
                          "/"
                        )})`,
                        filter: "brightness(0.7)",
                      }}
                    />
                    {imageId == location.id && (
                      <ImageDialog
                        imageModalOpen={imageModalOpen}
                        setImageModalOpen={setImageModalOpen}
                        imageString={location.imageString}
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent hover:cursor-pointer"
                      onClick={() => {
                        setImageModalOpen(true), setImageId(location.id);
                      }}
                    />
                    {campaign.role === "master" && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="flex items-center">
                          <div
                            className={`${
                              location.isVisible
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            } rounded-full px-2`}
                          >
                            {location.isVisible ? (
                              <span className="flex items-center text-sm">
                                <Eye className="h-2 w-2 mr-1" /> Visibile
                              </span>
                            ) : (
                              <span className="flex items-center text-sm">
                                <EyeSlash className="h-2 w-2 mr-1" /> Nascosto
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <div
                        className={`${
                          location.visited
                            ? "bg-gold/20 text-gold"
                            : "bg-gray-800 text-gray-400"
                        } px-2 text-xs rounded-full`}
                      >
                        {location.visited ? "Visitato" : "Non visitato"}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-gold font-medium">{location.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {location.type}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {location.description}
                    </p>
                    {location.masterNotes && campaign.role === "master" && (
                      <div className="bg-black/30 p-3 rounded-md border border-gold/10 mt-3">
                        <h4 className="text-sm text-gold mb-1">
                          Note del Master:
                        </h4>
                        <p className="text-sm text-gray-300">
                          {location.masterNotes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {campaign.role === "master" && (
                    <CardFooter className="flex justify-end mt-auto gap-2 p-3">
                      <Button
                        className={`${
                          location.isVisible
                            ? "border-green-500/30 text-green-300 hover:bg-green-500/10"
                            : "border-red-500/30 text-red-300 hover:bg-red-500/10"
                        } h-8 border`}
                        onClick={() => toggleVisibility(location)}
                      >
                        {location.isVisible ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeSlash className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        className="border-gold/30 text-gold hover:bg-gold/10 border h-8"
                        onClick={() => {
                          setUpdateModal(true), setEditingId(location.id);
                        }}
                      >
                        <PencilFill className="h-3 w-3 mr-1" /> Modifica
                      </Button>
                      <Button
                        className="border-red-500/30 text-red-500/70 hover:bg-red-500/10 border h-8"
                        onClick={() => handleDelete(location.id)}
                      >
                        <X className="h-5 w-5 mr-1" /> Elimina
                      </Button>
                    </CardFooter>
                  )}
                  {editingId == location.id && (
                    <UpdateLocation
                      isOpen={updateModal}
                      onClose={() => setUpdateModal(false)}
                      refreshLocations={refreshLocations}
                      data={location}
                      locations={locations}
                    />
                  )}
                </Card>
              );
            })}
        </div>
      )}
      <NewLocation
        isOpen={locationModalOpes}
        onClose={() => setLocationModalOpen(false)}
        refreshLocations={refreshLocations}
      />
    </section>
  );
};

export default Luoghi;
