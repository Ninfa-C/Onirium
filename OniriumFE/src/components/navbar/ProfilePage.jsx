import { Separator } from "radix-ui";
import { Card } from "../Generic/Cards";
import ProfileForm from "./ProfileForm";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

const ProfilePage = () => {
  return (
    <div className="container-fluid py-10">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gold">
            Profilo Utente
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestisci le tue informazioni personali e le impostazioni del tuo
            account.
          </p>
        </div>
        <Separator.Root className="my-[15px] bg-gold/30 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />

        {/* Sezione Profilo */}
        <div className="mt-8">
          <Card className="border-gold/20 bg-parchment backdrop-blur-sm">
            <ProfileForm />
          </Card>
        </div>

        {/* Sezione Email */}
        <div className="mt-8">
          <Card className="border-gold/20 bg-parchment backdrop-blur-sm">
            <EmailForm />
          </Card>
        </div>

        {/* Sezione Password */}
        <div className="mt-8">
          <Card className="border-gold/20 bg-parchment backdrop-blur-sm">
            <PasswordForm />
          </Card>
        </div>

        {/* Sezione Cancellazione Account */}
        <div className="mt-8">
          <Card className="border-gold/20 bg-parchment backdrop-blur-sm">
            <DeleteAccountForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
