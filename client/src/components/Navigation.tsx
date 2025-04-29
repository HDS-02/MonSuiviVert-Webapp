import React from 'react'
import { Link } from 'wouter'
import { Home as HomeIcon, Leaf, Plus } from 'lucide-react'

function Navigation() {
  return (
    <nav className="bg-plant-green text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <Leaf className="mr-2" /> Mon Suivi Vert
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="flex items-center hover:text-gray-200">
            <HomeIcon className="mr-1" /> Accueil
          </Link>
          <Link href="/mes-plantes" className="flex items-center hover:text-gray-200">
            <Leaf className="mr-1" /> Mes Plantes
          </Link>
          <Link href="/ajouter-plante" className="flex items-center hover:text-gray-200">
            <Plus className="mr-1" /> Ajouter
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
