import React, { useState } from 'react';
import { createTrait } from '../api';

const TraitForm = () => {
  // Stato per i valori del form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isCustom: false
  });

  // Gestore dei cambiamenti per gli input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dati inviati:', formData);

    // Chiamata alla funzione createTrait per inviare i dati
    const response = await createTrait(formData);
    setFormData({
        name: '',
        description: '',
        isCustom: false
      });

    if (response) {
      console.log('Trait creato con successo:', response);
    } else {
      console.error('Errore nella creazione del trait');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='text-white p-10'>
      <div>
        <label htmlFor="name">Nome</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="mt-2 ms-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
      </div>

      <div className='flex items-start'>
        <label htmlFor="description">Descrizione</label>
        <textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required
          className="mt-2 w-full ms-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input 
          type="checkbox" 
          id="isCustom" 
          name="isCustom" 
          checked={formData.isCustom} 
          onChange={handleChange} 
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="isCustom" className="ml-2 font-semibol">Personalizzato</label>
      </div>

      <button 
        type="submit" 
        className="w-20 py-1 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Invia
      </button>
    </form>
  );
};

export default TraitForm;