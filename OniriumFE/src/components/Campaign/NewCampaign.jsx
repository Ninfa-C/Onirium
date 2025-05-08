import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../../api/CampaignApi";

const NewCampaign = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("Name", formData.name);
      form.append("Description", formData.description);
      if (formData.image) {
        form.append("Image", formData.image);
      }

      await createCampaign(form);
      navigate("/Campaign");
    } catch (err) {
      console.error("Errore creando la campagna:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="mb-4 text-4xl font-bold text-center text-gold">
        Crea la Tua Nuova Campagna
      </h1>
      <p className="mb-8 text-center text-gray-400">
        Inizia oggi a scrivere leggende che riecheggeranno nei secoli!
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-dark p-6 rounded-xl shadow-lg border border-gold/40"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">
            Nome della Campagna
          </label>
          <input
            type="text"
            name="name"
            placeholder="Inserisci il nome della campagna"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 rounded-md bg-black border border-gold text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Descrizione
          </label>
          <textarea
            name="description"
            placeholder="Descrivi la tua campagna"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-black border border-gold text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Immagine della Campagna
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
            }}
            className="w-full p-2 rounded-md bg-black border border-gold text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gold hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Creazione in corso..." : "Salva Campagna"}
        </button>
      </form>
    </div>
  );
};

export default NewCampaign;
