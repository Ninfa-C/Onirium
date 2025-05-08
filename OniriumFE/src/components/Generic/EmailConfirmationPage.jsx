import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const EmailConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Conferma in corso...");

  useEffect(() => {
    const confirmEmail = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setMessage("Parametri mancanti.");
        return;
      }

      try {
        const res = await fetch(
          `https://localhost:7067/api/account/confirm-email?userId=${userId}&token=${encodeURIComponent(token)}`
        );

        if (res.ok) {
          setMessage("Email confermata con successo. Verrai reindirizzat* al login.");
          setTimeout(() => navigate("/Account/Login"), 3000);
        } else {
          setMessage("Errore nella conferma dell'email.");
        }
      } catch (error) {
        setMessage("Errore di connessione.");
        console.error(error);
      }
    };

    confirmEmail();
  }, [navigate, searchParams]);

  return (
    <div className="flex justify-center items-center h-screen text-center text-white">
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default EmailConfirmationPage;
