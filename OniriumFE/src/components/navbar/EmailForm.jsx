import { useState } from "react";
import { Button } from "../Generic/ButtonCustom";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../Generic/Cards";
import { UpdateEmail } from "../../api/CampaignApi";
import { Mailbox } from "react-bootstrap-icons";
import { InputForm } from "../Generic/Form";
import { useDispatch, useSelector } from "react-redux";
import { AutoLogin } from "../../api/AccountApi";

const EmailForm = () => {
  const profile = useSelector((state) => state.user?.profile ?? {});
  const [editingEmail, setEditingEmail] = useState(false);
  const [currentEmail, setCurrentEmail] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    CurrentPassword: "",
    NewEmail: "",
  });

  const handleSaveEmail = async (e) => {
    if (profile.email !== currentEmail) {
      setError(true);
      return;
    }
    e.preventDefault();
    try {
      await UpdateEmail(form);
      setCurrentEmail(false)
      dispatch(AutoLogin());
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <div>
          <CardTitle className="text-gold flex items-center gap-4 mb-3">
            <Mailbox className="h-6 w-6" />
            Indirizzo Email
          </CardTitle>
          <CardDescription>Aggiorna il tuo indirizzo email</CardDescription>
        </div>
        {!editingEmail && (
          <Button
            className=" border border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
            onClick={() => setEditingEmail(true)}
          >
            Modifica
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!editingEmail ? (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Email Attuale
            </h3>
            <p className="text-lg font-semibold text-gold">{profile.email}</p>
          </div>
        ) : (
          <form onSubmit={handleSaveEmail} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-gold text-sm">
                  Email Attuale
                </label>
                <InputForm
                  type="text"
                  id="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  placeholder="yuki@example.com"
                  className="bg-black/50 border-gold/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="new" className="text-gold text-sm">
                  Nuova Email
                </label>
                <InputForm
                  type="text"
                  id="new"
                  value={form.NewEmail}
                  onChange={(e) =>
                    setForm({ ...form, NewEmail: e.target.value })
                  }
                  placeholder="yuna@example.com"
                  className="bg-black/50 border-gold/30 text-white"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-gold text-sm">
                  Conferma Password
                </label>
                <InputForm
                  type="password"
                  id="password"
                  value={form.CurrentPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      CurrentPassword: e.target.value,
                    })
                  }
                  placeholder="password"
                  className="bg-black/50 border-gold/30 text-white"
                />
                <p className="text-xs">
                  Per motivi di sicurezza, conferma la tua password attuale per
                  cambiare email.
                </p>
              </div>
            </div>
            {error && <p className="text-xs text-red-500 ">Riprova</p>}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingEmail(false)}
                className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-light"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                className="bg-gold hover:bg-gold-dark text-black"
              >
                Aggiorna Email
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </>
  );
};

export default EmailForm;
