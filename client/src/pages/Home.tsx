import React from 'react'
import { Link } from 'wouter'
import { Leaf, Sprout, Calendar } from 'lucide-react'

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-plant-green">Bienvenue sur Mon Suivi Vert</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <Leaf className="mx-auto text-plant-green mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Mes Plantes</h2>
          <p className="mb-4">Gérez votre collection de plantes</p>
          <Link href="/mes-plantes" className="btn btn-primary block text-center">
            Voir mes plantes
          </Link>
        </div>
        
        <div className="card">
          <Sprout className="mx-auto text-plant-green mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Ajouter une Plante</h2>
          <p className="mb-4">Enregistrez une nouvelle plante</p>
          <Link href="/ajouter-plante" className="btn btn-primary block text-center">
            Ajouter
          </Link>
        </div>
        
        <div className="card">
          <Calendar className="mx-auto text-plant-green mb-4" size={48} />
          <h2 className="text-xl font-semibold mb-2">Calendrier</h2>
          <p className="mb-4">Suivez vos tâches de jardinage</p>
          <Link href="#" className="btn btn-primary block text-center">
            Voir le calendrier
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
