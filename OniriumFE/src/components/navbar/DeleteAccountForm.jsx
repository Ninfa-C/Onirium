import { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../Generic/Cards";
import { AlertDialog } from "radix-ui";
import { Trash3 } from "react-bootstrap-icons";
import { Button } from "../Generic/ButtonCustom";
import { DeleteProfile } from "../../api/CampaignApi";
import { InputForm } from "../Generic/Form";
import { useDispatch } from "react-redux";
import { Logout } from "../../api/AccountApi";
import { useNavigate } from "react-router-dom";

const DeleteAccountForm = () => {
  const [confirmPassword, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const logoutAccount = async () => {
    await dispatch(Logout());   
    setTimeout(() => {
      navigateTo("/Account/Login");
    }, 100);
  };

  const handleDeleteAccount = async (e) => {
    setError(false);
    e.preventDefault();
    if (confirmText !== "ELIMINA") {
      setError(true);
      return;
    }
    try {
      await DeleteProfile(confirmPassword);
      await logoutAccount();
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-red-500 flex items-center gap-2 mb-3">
            <Trash3 className="h-5 w-5" />
            Cancellazione Account
          </CardTitle>
          <CardDescription>
            Elimina definitivamente il tuo account e tutti i tuoi dati
          </CardDescription>
        </div>
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <Button className="border border-red-500/30 hover:bg-red-500/30">
              Elimina Account
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            <AlertDialog.Content className="bg-black border border-red-500/30 p-6 rounded-lg shadow-lg z-50 max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AlertDialog.Title className="text-red-500 text-xl font-semibold mb-2">
                Sei sicura di voler eliminare il tuo account?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm text-red-300 mb-4">
                Questa azione è permanente. Tutti i tuoi dati, personaggi e
                campagne saranno eliminati definitivamente.
              </AlertDialog.Description>

              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm text-red-500">
                    Conferma Password
                  </label>
                  <InputForm
                    id="password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-red-500/30 bg-zinc-900 focus:border-red-500 text-white"
                    placeholder="La tua password"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm" className="text-sm text-red-500">
                    Digita <strong>ELIMINA</strong> per confermare
                  </label>
                  <InputForm
                    id="confirm"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="border-red-500/30 bg-zinc-900 focus:border-red-500 text-white"
                    placeholder='Digita "ELIMINA"'
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm border border-red-500/30 p-2 rounded bg-red-500/5">
                    Verifica di aver inserito correttamente la password e la
                    conferma.
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <AlertDialog.Cancel asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
                    >
                      Annulla
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDeleteAccount}
                    >
                      Elimina definitivamente
                    </Button>
                  </AlertDialog.Action>
                </div>
              </form>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-red-400 border border-red-500/30 bg-red-500/5 p-4 rounded">
          Una volta eliminato l’account, non potrai più recuperare i tuoi dati.
        </div>
      </CardContent>
    </>
  );
};

export default DeleteAccountForm;
