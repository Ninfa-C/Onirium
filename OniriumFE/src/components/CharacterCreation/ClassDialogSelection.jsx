import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "radix-ui";
import { X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const ClassDialogSelection = ({ title, options, open, onOpenChange, onSelect }) => {
  //const data = useSelector((state) => state.data);
  const character = useSelector((state) => state.selection);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 max-h-[80vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 bg-second-background border border-[#333] rounded-md p-0 flex flex-col focus:outline-none">
          <div className="flex items-center justify-between border-b border-[#333] p-4">
            <div>
              <Dialog.Title className="text-3xl text-gold">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm">
                Scegli la classe del tuo personaggio
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-400 hover:text-gold">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <ScrollArea.Root className="h-[500px] overflow-hidden p-4">
            <ScrollArea.Viewport className="w-full h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {options.map((option) => (
                  <div key={option.id} className="mb-4  bg-dark/50 border border-gold/30 rounded-md ">
                    {/* Card principale della classe */}
                    <div
                      className={`p-4 hover:border-gold/50" cursor-pointer transition-colors`}
                      onClick={() => onSelect(option.id, null) }
                    >
                      <div className="flex items-center justify-between">
                       
                        <div className="flex items-center">
                           {
                          option.image &&<img
                            src={`http://localhost:5034/${option.image.replace(/\\/g, '/')}`}
                            alt={option.name}
                            className="w-20 object-cover rounded-full mr-4"
                          />
                        }
                          <div>
                            <h3 className="text-white text-lg font-medium">
                              {option.name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center">                          
                          <div className="w-6 h-6 rounded-full border border-[#333] flex items-center justify-center">
                            {(character.classAssignments.id === option.id || character.classAssignments.subclass == option.id) && (
                                <div className="w-3 h-3 rounded-full bg-gold"></div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ClassDialogSelection;
