import React from 'react';
import { User, Lock, Bell, Globe, CreditCard, HelpCircle } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            <SettingsNavItem icon={<User />} text="Profil" active />
            <SettingsNavItem icon={<Lock />} text="Sécurité" />
            <SettingsNavItem icon={<Bell />} text="Notifications" />
            <SettingsNavItem icon={<Globe />} text="Langue" />
            <SettingsNavItem icon={<CreditCard />} text="Paiements" />
            <SettingsNavItem icon={<HelpCircle />} text="Aide" />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg">
            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Profil</h2>
              <p className="mt-1 text-sm text-gray-500">
                Mettez à jour vos informations personnelles.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-amber-600" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Changer
                  </button>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      defaultValue="Admin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      defaultValue="User"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      defaultValue="admin@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                      defaultValue="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                    defaultValue="Administrateur de la plateforme Tontine Africaine."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700"
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsNavItem({ icon, text, active = false }) {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-amber-50 text-amber-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      {text}
    </a>
  );
}