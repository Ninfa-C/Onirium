import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "radix-ui";
import { ChevronDown, ChevronUp, X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useState } from "react";

const DialogSelection = ({ title, options, open, onOpenChange, onSelect }) => {
  //const data = useSelector((state) => state.data);
  const character = useSelector((state) => state.selection);
  const [expandedRaces, setExpandedRaces] = useState([]);

  const getRaceImage = (raceName) => {
    const formattedName = raceName.toLowerCase().replace(/\s+/g, "-");
    return `/src/assets/images/races/${formattedName}.avif`;
  };

  const toggleSubraces = (raceId) => {
    setExpandedRaces((prev) =>
      prev.includes(raceId)
        ? prev.filter((id) => id !== raceId)
        : [...prev, raceId]
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-black border border-[#333] rounded-md p-0 flex flex-col focus:outline-none">
          <div className="flex items-center justify-between border-b border-[#333] p-4">
            <div>
              <Dialog.Title className="text-white text-2xl font-light">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm">
                Scegli la razza del tuo personaggio
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <ScrollArea.Root className="h-[500px] overflow-hidden p-4">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.id} className="mb-4 last:mb-0">
                    <div
                      className={`p-4 border rounded-md ${
                        character.raceId === option.id
                          ? "border-gold bg-dark-lighter"
                          : "border-[#333] hover:border-gold/50"
                      } cursor-pointer transition-colors`}
                      onClick={() => {
                        if (option.subraces.length === 0) {
                          onSelect(option.id, null);
                        } else {
                          toggleSubraces(option.id);
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={getRaceImage(option.name)}
                            alt={option.name}
                            className="w-20 object-cover rounded-full mr-4"
                          />
                          <div>
                            <h3 className="text-white text-lg font-medium">
                              {option.name}
                            </h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {option.traits.map((trait, index) => (
                                <span
                                  key={index}
                                  className="text-xs px-2 py-1 bg-dark-darker rounded-full text-gold"
                                >
                                  Tratti: {trait.name}
                                  {index < option.traits.length - 1
                                    ? ", "
                                    : "."}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {option.subraces.length > 0 ? (
                            <>
                              {" "}
                              <span className="text-xs text-gray-400 mr-3">
                                {option.subraces.length} sottorazze
                              </span>
                              <ChevronDown
                                className={(
                                  "w-4 h-4 text-gray-400 transition-transform duration-200",
                                  expandedRaces.includes(option.id) &&
                                    "rotate-180"
                                )}
                              />
                            </>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-[#333] flex items-center justify-center">
                              {character.raceId === option.id &&
                                !character.subraceId && (
                                  <div className="w-3 h-3 rounded-full bg-gold"></div>
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedRaces.includes(option.id) &&
                      option.subraces.length > 0 && (
                        <div className="mt-2 pl-6">
                          {option.subraces.map((subOption) => (
                            <div
                              key={subOption.id}
                              className={`p-3 mb-2 border rounded-md flex justify-between items-center ${
                                character.raceId === option.id &&
                                character.subraceId === subOption.id
                                  ? "border-gold bg-dark-lighter"
                                  : "border-[#222] hover:border-gold/30"
                              } cursor-pointer transition-colors`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelect(option.id, subOption.id);
                              }}
                            >
                              <div>
                                <h4 className="text-white text-md">
                                  {subOption.name}
                                </h4>
                                {subOption.traits.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {subOption.traits
                                      .slice(0, 2)
                                      .map((trait, index) => (
                                        <span
                                          key={index}
                                          className="text-xs px-2 py-1 bg-dark-darker rounded-full text-gold"
                                        >
                                          Tatti: {trait}
                                        </span>
                                      ))}
                                  </div>
                                )}
                              </div>
                              <div className="w-5 h-5 rounded-full border border-[#333] flex items-center justify-center">
                                {character.raceId === option.id &&
                                  character.subraceId === subOption.id && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-dark-lighter data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-dark-darker before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogSelection;
