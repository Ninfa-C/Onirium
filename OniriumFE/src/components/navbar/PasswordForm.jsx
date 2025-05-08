import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Generic/Cards";
import { UpdatePassword } from "../../api/CampaignApi";
import { InputForm } from "../Generic/Form";
import { Button } from "../Generic/ButtonCustom";
import { Lock } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { AutoLogin } from "../../api/AccountApi";

const PasswordForm = () => {
  const [editingPassword, setEditingPassword] = useState(false);
  const [confirmPass, setCurrentPass] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    CurrentPassword: "",
    NewPassword: "",
  });

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (form.NewPassword !== confirmPass) {
      setError(true);
      return;
    }
    try {
      await UpdatePassword(form);
      setEditingPassword(false)
      dispatch(AutoLogin());
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-gold flex items-center gap-2 mb-3">
            <Lock className="h-5 w-5" />
            Password
          </CardTitle>
          <CardDescription>Aggiorna la tua password</CardDescription>
        </div>
        {!editingPassword && (
          <Button
            className="border border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
            onClick={() => setEditingPassword(true)}
          >
            Modifica
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!editingPassword ? (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Stato Password
            </h3>
            <p className="text-lg font-semibold text-gold">Password protetta</p>
          </div>
        ) : (
          <form onSubmit={handleSavePassword} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="new" className="text-gold text-sm">
                  Password Attuale
                </label>
                <InputForm
                  type="text"
                  id="new"
                  value={form.CurrentPassword}
                  onChange={(e) =>
                    setForm({ ...form, CurrentPassword: e.target.value })
                  }
                  placeholder="password attuale"
                  className="bg-black/50 border-gold/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="new" className="text-gold text-sm">
                  Nuova Password
                </label>
                <InputForm
                  type="text"
                  id="new"
                  value={form.NewPassword}
                  onChange={(e) =>
                    setForm({ ...form, NewPassword: e.target.value })
                  }
                  placeholder="nuova password"
                  className="bg-black/50 border-gold/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="new" className="text-gold text-sm">
                  Conferma Password
                </label>
                <InputForm
                  type="text"
                  id="new"
                  value={confirmPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="conferma password"
                  className="bg-black/50 border-gold/30 text-white"
                />
              </div>
              {error && <p className="text-xs text-red-500 ">Riprova</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={() => setEditingPassword(false)}
                className="border border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-black"
              >
                Aggiorna Password
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </>
  );
};

export default PasswordForm;
