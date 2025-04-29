import React, { useState } from 'react'
import { useLocation } from 'wouter'
import { Plus, Leaf } from 'lucide-react'

function AddPlant() {
  const [, setLocation] = useLocation()
  const [plantName, setPlantName] = useState('')
  const [plantType, setPlantType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (plantName && plantType) {
      // Logique d'ajout de plante (à implémenter)
      alert(`Plante ajoutée : ${plantName} (${plantType})`)
      setLocation('/mes-plantes')
    } else {
      alert('Veuillez remplir tous les champs')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-plant-green flex items-center">
        <Leaf className="mr-2" /> Ajouter une Plante
      </h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-4">
          <label htmlFor="plantName" className="block mb-2">Nom de la plante</label>
          <input 
            type="text" 
            id="plantName"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Ex: Monstera, Basilic..."
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="plantType" className="block mb-2">Type de plante</label>
          <select 
            id="plantType"
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="Plante d'intérieur">Plante d'intérieur</option>
            <option value="Plante d'extérieur">Plante d'extérieur</option>
            <option value="Herbe aromatique">Herbe aromatique</option>
            <option value="Succulente">Succulente</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary w-full flex items-center justify-center"
        >
          <Plus className="mr-2" /> Ajouter ma plante
        </button>
      </form>
    </div>
  )
}

export default AddPlant
