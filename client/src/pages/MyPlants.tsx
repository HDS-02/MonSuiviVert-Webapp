import React, { useState } from 'react'
import { Link } from 'wouter'
import { Leaf, Plus } from 'lucide-react'

interface Plant {
  id: number;
  name: string;
  type: string;
  lastWatered: string;
}

function MyPlants() {
  const [plants, setPlants] = useState<Plant[]>([
    { id: 1, name: 'Monstera', type: 'Plante d\'intérieur', lastWatered: '2024-06-15' },
    { id: 2, name: 'Basilic', type: 'Herbe aromatique', lastWatered: '2024-06-10' },
    { id: 3, name: 'Cactus', type: 'Succulente', lastWatered: '2024-06-05' }
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-plant-green flex items-center">
          <Leaf className="mr-2" /> Mes Plantes
        </h1>
        <Link href="/ajouter-plante" className="btn btn-primary flex items-center">
          <Plus className="mr-1" /> Ajouter une plante
        </Link>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Vous n'avez pas encore de plantes</p>
          <Link href="/ajouter-plante" className="btn btn-primary mt-4">
            Ajouter votre première plante
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {plants.map(plant => (
            <div key={plant.id} className="card">
              <h2 className="text-xl font-semibold mb-2">{plant.name}</h2>
              <p className="text-gray-600 mb-2">{plant.type}</p>
              <p className="text-sm text-gray-500">
                Dernier arrosage : {plant.lastWatered}
              </p>
              <div className="mt-4 flex justify-between">
                <button className="btn btn-primary">Détails</button>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600">
                  Arroser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPlants
