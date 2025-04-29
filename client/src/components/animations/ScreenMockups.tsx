import React from 'react';
import { motion } from 'framer-motion';

// Composant pour le mockup d'un écran mobile
export const PhoneMockup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-64 h-[500px] mx-auto">
      {/* Corps du téléphone */}
      <div className="absolute inset-0 rounded-[40px] border-8 border-gray-800 bg-white shadow-xl overflow-hidden">
        {/* Barre d'état */}
        <div className="h-8 bg-gray-800 flex items-center px-4">
          <div className="w-12 h-2 rounded-full bg-gray-600 mx-auto"></div>
        </div>
        {/* Contenu */}
        <div className="h-[calc(100%-48px)] overflow-hidden">
          {children}
        </div>
        {/* Barre de navigation */}
        <div className="h-12 bg-white border-t border-gray-200 flex items-center justify-around px-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="material-icons text-gray-600 text-sm">home</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="material-icons text-gray-600 text-sm">eco</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary -mt-6 flex items-center justify-center">
            <span className="material-icons text-white">add</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="material-icons text-gray-600 text-sm">calendar_today</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="material-icons text-gray-600 text-sm">emoji_events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Écran d'accueil
export const HomeScreenMockup: React.FC = () => {
  return (
    <PhoneMockup>
      <div className="p-4 h-full bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-800">Mon Suivi Vert</div>
          <div className="flex space-x-2">
            <span className="material-icons text-gray-600">notifications</span>
            <span className="material-icons text-gray-600">account_circle</span>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl p-4 shadow-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-2">
              <span className="material-icons text-green-600">eco</span>
            </div>
            <div>
              <h3 className="font-medium">Bienvenue !</h3>
              <p className="text-sm text-gray-600">Commencez à suivre vos plantes</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h3 className="font-medium mb-2">Mes plantes</h3>
          <div className="flex overflow-x-auto gap-3 pb-2">
            <motion.div 
              className="flex-shrink-0 w-32 h-40 bg-white rounded-lg shadow-sm overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <div className="h-24 bg-green-200"></div>
              <div className="p-2">
                <div className="font-medium text-sm">Monstera</div>
                <div className="text-xs text-gray-500">Bon état</div>
              </div>
            </motion.div>
            <div className="flex-shrink-0 w-32 h-40 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-24 bg-emerald-100"></div>
              <div className="p-2">
                <div className="font-medium text-sm">Ficus</div>
                <div className="text-xs text-gray-500">À arroser</div>
              </div>
            </div>
            <div className="flex-shrink-0 w-32 h-40 bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-24 bg-blue-100"></div>
              <div className="p-2">
                <div className="font-medium text-sm">Orchidée</div>
                <div className="text-xs text-gray-500">Bon état</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-medium mb-2">Tâches à venir</h3>
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons text-blue-500 text-sm">water_drop</span>
              <span className="text-sm">Arroser la Monstera</span>
              <span className="text-xs text-gray-500 ml-auto">Aujourd'hui</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons text-amber-500 text-sm">content_cut</span>
              <span className="text-sm">Tailler le Ficus</span>
              <span className="text-xs text-gray-500 ml-auto">Demain</span>
            </div>
          </div>
        </motion.div>
      </div>
    </PhoneMockup>
  );
};

// Écran d'ajout de plante
export const AddPlantScreenMockup: React.FC = () => {
  return (
    <PhoneMockup>
      <div className="p-4 h-full bg-gray-50">
        <div className="flex items-center mb-6">
          <span className="material-icons text-gray-600 mr-2">arrow_back</span>
          <div className="text-lg font-bold text-gray-800">Ajouter une plante</div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl p-4 shadow-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="material-icons text-gray-400 text-3xl">add_photo_alternate</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Nom de la plante</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md mt-1" placeholder="Monstera" />
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Espèce</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md mt-1" placeholder="Monstera deliciosa" />
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Fréquence d'arrosage</label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option>Chaque semaine</option>
                <option>Tous les 3 jours</option>
                <option>Tous les 15 jours</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end"
        >
          <button className="bg-primary text-white px-6 py-2 rounded-full">
            Ajouter
          </button>
        </motion.div>
      </div>
    </PhoneMockup>
  );
};

// Écran des tâches
export const TasksScreenMockup: React.FC = () => {
  return (
    <PhoneMockup>
      <div className="p-4 h-full bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-800">Tâches d'entretien</div>
          <div className="flex space-x-2">
            <span className="material-icons text-gray-600">filter_list</span>
          </div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl p-2 shadow-sm mb-4 border-l-4 border-blue-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center p-2">
            <div className="h-5 w-5 rounded-full border-2 border-blue-500 mr-3"></div>
            <div className="flex-grow">
              <h3 className="font-medium">Arroser la Monstera</h3>
              <p className="text-xs text-gray-600">Aujourd'hui</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="material-icons text-gray-500 text-sm">more_vert</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-2 shadow-sm mb-4 border-l-4 border-amber-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center p-2">
            <div className="h-5 w-5 rounded-full border-2 border-amber-500 mr-3"></div>
            <div className="flex-grow">
              <h3 className="font-medium">Tailler le Ficus</h3>
              <p className="text-xs text-gray-600">Demain</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="material-icons text-gray-500 text-sm">more_vert</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-2 shadow-sm mb-4 border-l-4 border-green-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center p-2">
            <div className="h-5 w-5 rounded-full border-2 border-green-500 mr-3"></div>
            <div className="flex-grow">
              <h3 className="font-medium">Fertiliser l'Orchidée</h3>
              <p className="text-xs text-gray-600">Dans 3 jours</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="material-icons text-gray-500 text-sm">more_vert</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-100 rounded-xl p-4 shadow-sm mb-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-green-600">eco</span>
              <div>
                <p className="text-sm font-medium">Créer une nouvelle tâche</p>
                <p className="text-xs text-gray-600">Planifiez l'entretien de vos plantes</p>
              </div>
            </div>
            <span className="material-icons text-gray-600">add_circle</span>
          </div>
        </motion.div>
      </div>
    </PhoneMockup>
  );
};

// Écran SOS 
export const SOSScreenMockup: React.FC = () => {
  return (
    <PhoneMockup>
      <div className="p-4 h-full bg-gray-50">
        <div className="flex items-center mb-6">
          <span className="material-icons text-gray-600 mr-2">arrow_back</span>
          <div className="text-lg font-bold text-gray-800">SOS Plante</div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl p-4 shadow-sm mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <span className="material-icons text-red-600">emergency</span>
            </div>
            <div>
              <h3 className="font-medium">Diagnostic de plante</h3>
              <p className="text-sm text-gray-600">Décrivez les symptômes observés</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Plante concernée</label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option>Monstera</option>
                <option>Ficus</option>
                <option>Orchidée</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Symptômes observés</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md">
                  <div className="w-4 h-4 rounded border border-gray-400"></div>
                  <span className="text-sm">Feuilles jaunes</span>
                </div>
                <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md">
                  <div className="w-4 h-4 rounded border border-gray-400"></div>
                  <span className="text-sm">Taches brunes</span>
                </div>
                <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md">
                  <div className="w-4 h-4 rounded border border-gray-400"></div>
                  <span className="text-sm">Feuilles tombantes</span>
                </div>
                <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-md">
                  <div className="w-4 h-4 rounded border border-gray-400"></div>
                  <span className="text-sm">Insectes</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-600">Dernier arrosage</label>
              <select className="w-full p-2 border border-gray-300 rounded-md mt-1">
                <option>Aujourd'hui</option>
                <option>Il y a 2-3 jours</option>
                <option>Il y a plus d'une semaine</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <button className="bg-red-500 text-white px-6 py-3 rounded-full flex items-center">
            <span className="material-icons mr-2">healing</span>
            Obtenir un diagnostic
          </button>
        </motion.div>
      </div>
    </PhoneMockup>
  );
};

// Écran des badges
export const BadgesScreenMockup: React.FC = () => {
  return (
    <PhoneMockup>
      <div className="p-4 h-full bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-800">Mes badges</div>
          <div className="flex space-x-2">
            <span className="material-icons text-gray-600">filter_list</span>
          </div>
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-amber-300 to-amber-500 rounded-xl p-4 shadow-sm mb-6 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-xl">4 badges débloqués</h3>
              <p className="text-white/80">Continuez votre progression !</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-200/30 flex items-center justify-center">
              <span className="material-icons text-white text-xl">emoji_events</span>
            </div>
          </div>
        </motion.div>
        
        <h3 className="font-medium mb-3">Badges débloqués</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            className="bg-white rounded-xl p-3 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 mx-auto">
              <span className="material-icons text-green-600">eco</span>
            </div>
            <h4 className="font-medium text-center text-sm">Jardinier Débutant</h4>
            <p className="text-xs text-gray-500 text-center">3 plantes ajoutées</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-3 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 mx-auto">
              <span className="material-icons text-blue-600">water_drop</span>
            </div>
            <h4 className="font-medium text-center text-sm">Maître Arroseur</h4>
            <p className="text-xs text-gray-500 text-center">10 arrosages</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-3 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 mx-auto">
              <span className="material-icons text-purple-600">psychology</span>
            </div>
            <h4 className="font-medium text-center text-sm">Botaniste Curieux</h4>
            <p className="text-xs text-gray-500 text-center">5 analyses effectuées</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-3 shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 mx-auto">
              <span className="material-icons text-amber-600">stream</span>
            </div>
            <h4 className="font-medium text-center text-sm">Régularité d'Or</h4>
            <p className="text-xs text-gray-500 text-center">7 jours consécutifs</p>
          </motion.div>
        </div>
        
        <h3 className="font-medium mt-5 mb-3">Badges à débloquer</h3>
        
        <motion.div 
          className="bg-white/50 rounded-xl p-3 shadow-sm border border-dashed border-gray-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="material-icons text-gray-400">lock</span>
            </div>
            <div>
              <h4 className="font-medium text-sm">Expert Botaniste</h4>
              <div className="w-full mt-1 bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full w-[65%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">13/20 plantes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PhoneMockup>
  );
};
