import React from 'react'
import { Route, Router } from 'wouter'
import Home from './pages/Home'
import MyPlants from './pages/MyPlants'
import AddPlant from './pages/AddPlant'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Route path="/" component={Home} />
          <Route path="/mes-plantes" component={MyPlants} />
          <Route path="/ajouter-plante" component={AddPlant} />
        </main>
      </Router>
    </div>
  )
}

export default App
