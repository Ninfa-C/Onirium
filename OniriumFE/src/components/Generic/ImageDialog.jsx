import * as Dialog from "@radix-ui/react-dialog";

const ImageDialog = ({
  imageModalOpen,
  setImageModalOpen,
  imagePreview,
  imageString,
}) => {
  const imageSrc = imagePreview
    ? imagePreview
    : imageString
    ? `http://localhost:5034/${imageString.replace(/\\/g, "/")}`
    : "";

  return (
    <Dialog.Root open={imageModalOpen} onOpenChange={setImageModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <Dialog.Content
          onClick={() => setImageModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center focus:outline-none"
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Anteprima"
              className="w-screen h-screen object-contain shadow-lg cursor-pointer"
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ImageDialog;
