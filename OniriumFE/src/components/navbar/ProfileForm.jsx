import { useDispatch, useSelector } from "react-redux";
import { CardDescription, CardHeader, CardTitle } from "../Generic/Cards";
import { useEffect, useState } from "react";
import { Button } from "../Generic/ButtonCustom";
import { InputWithIcon } from "../Generic/Form";
import { UserIcon } from "@heroicons/react/24/outline";
import { Camera, Pencil, Save, Upload, X, XLg } from "react-bootstrap-icons";
import { UpdateProfilePic, UpdateUserName } from "../../api/CampaignApi";
import * as Avatar from "@radix-ui/react-avatar";
import { AutoLogin } from "../../api/AccountApi";

const ProfileForm = () => {
  const profile = useSelector((state) => state.user?.profile ?? {});

  const [username, setUsername] = useState(profile?.name);
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const dispatch = useDispatch();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateUserName(username);
      setShowUsernameForm(false)
      dispatch(AutoLogin());
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
    setIsUploading(false);
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (avatar instanceof File) {
        data.append("Image", avatar);
      }
      await UpdateProfilePic(data);
      dispatch(AutoLogin());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [profile]);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-gold">Informazioni Profilo</CardTitle>
        <CardDescription>
          Aggiorna le informazioni del tuo profilo e la tua immagine.
        </CardDescription>
      </CardHeader>
      <div className=" mx-auto flex space-y-12 p-4">
        {/* Avatar Form */}

        {showAvatarForm ? (
          <form
            onSubmit={handleAvatarSubmit}
            className="space-y-6 justify-center px-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  preview ||
                  `http://localhost:5034/${profile?.profilePic?.replace(/\\/g, "/")}`
                }
                alt="Avatar"
                className="h-30 w-30 rounded-full border-2 border-gold/30 object-cover"
              />
            </div>
            <div className="flex items-center justify-center gap-5 text-gray-400">
              <label
                className="relative cursor-pointer text-sm  py-1 hover:text-gold"
                title="Carica"
              >
                <Upload className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 hover:cursor-pointer"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
                />
              </label>
              <Button
                title="Salva"
                type="submit"
                className=" px-0 py-2 hover:text-gold rounded-full"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                title="Annulla"
                onClick={() => setShowAvatarForm(false)}
                type="button"
                className=" px-0 py-2  hover:text-rose-800 rounded-full"
              >
                <XLg className="h-5 w-5" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex items-start px-4 border-r border-gold">
            <div className="flex flex-col items-center gap-4 relative">
              <Avatar.Root className="h-30 w-30 border border-gold/30 rounded-full overflow-hidden">
                <Avatar.Image
                  src={`http://localhost:5034/${profile?.profilePic?.replace(/\\/g, "/")}`}
                  alt="User"
                  className="object-cover w-full h-full"
                />
                <Avatar.Fallback className="bg-second-bg text-gold w-full h-full flex items-center justify-center">
                  {profile?.name.charAt(0).toUpperCase() || "U"}
                </Avatar.Fallback>
              </Avatar.Root>
              <Button
                type="button"
                onClick={() => setShowAvatarForm(!showAvatarForm)}
                className="h-12 w-12 rounded-full flex items-center justify-center border border-gray-700 bg-gray-500/90 text-white hover:bg-gray-500 absolute bottom-[-1.5em] hover:scale-[1.1]"
              >
                <Camera className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}

        {/* Username Form */}
        {showUsernameForm ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-6 px-4">
            <div className="space-y-2">
              <label className="text-sm uppercase text-white">Username</label>
              <InputWithIcon
                icon={<UserIcon />}
                value={username}
                onChange={(val) => setUsername(val)}
                placeholder="Nuovo username"
              />
            </div>
            <div className="flex items-center gap-6">
              <Button
                title="Salva"
                type="submit"
                className=" px-0 py-2 hover:text-gold rounded-full"
              >
                <Save className="h-4 w-4" /> Salva
              </Button>
              <Button
                title="Annulla"
                onClick={() => setShowUsernameForm(false)}
                type="button"
                className=" px-0 py-2  hover:text-rose-800 rounded-full"
              >
                <XLg className="h-5 w-5" /> Annulla
              </Button>
            </div>
          </form>
        ) : (
          <div className="grow px-4">
            <p className="border-b border-gold/20 pb-3">
              <span className="text-gray-400">Nome: </span> {profile.realName}
            </p>

            <p className="border-b border-gold/20 py-3">
              <span className="text-gray-400">Cognome: </span>
              {profile.surname}
            </p>
            <div className="flex items-center gap-5">
              <Pencil onClick={() => setShowUsernameForm(!showUsernameForm)} />
              <p className=" py-2">
                <span className="text-gray-400">UserName: </span> {profile.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;
