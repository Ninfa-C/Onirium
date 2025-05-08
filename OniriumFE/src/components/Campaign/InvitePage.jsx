import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmInvite } from "../../api/CampaignApi";

const InvitePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const navigateTo = useNavigate()

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        await confirmInvite(id, token);
        setStatus("success");
        setTimeout(() => navigateTo(`/campaign/detail/${id}`), 2000); 
      } catch (error) {
        setStatus("error");
        console.error("Errore nella conferma:", error.message);
      }
    };

    handleConfirm();
  }, [id, token, navigateTo]);


  return (
    <div className="text-center p-10 text-white">
      {status === "loading" && <p>Conferma invito in corso...</p>}
      {status === "success" && <p>Invito confermato! Reindirizzamento...</p>}
      {status === "error" && <p>Errore nella conferma dell'invito.</p>}
    </div>
  );
};

export default InvitePage;
