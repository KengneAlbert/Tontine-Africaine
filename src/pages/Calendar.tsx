import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function Calendar() {
  const events = [
    {
      id: 1,
      title: 'Versement mensuel',
      tontine: 'Investissement 2024',
      time: '10:00',
      type: 'payment'
    },
    {
      id: 2,
      title: 'Réunion des membres',
      tontine: 'Projet Immobilier',
      time: '14:30',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Distribution',
      tontine: 'Épargne Études',
      time: '16:00',
      type: 'distribution'
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
        <button className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
          <Plus className="h-5 w-5 mr-2" />
          Nouvel événement
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Calendar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Février 2024</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Aujourd'hui
              </button>
              <select className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                <option>Mois</option>
                <option>Semaine</option>
                <option>Jour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Days of Week */}
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
            <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {Array.from({ length: 35 }).map((_, index) => {
            const day = index - 3; // Adjust to start from the correct day
            const isToday = day === 15;
            const hasEvents = day === 15 || day === 20 || day === 25;

            return (
              <div
                key={index}
                className={`bg-white min-h-[120px] p-2 ${
                  day < 1 || day > 29 ? 'text-gray-300' : ''
                }`}
              >
                <div className={`flex items-center justify-center h-6 w-6 ${
                  isToday ? 'bg-amber-600 text-white rounded-full' : ''
                }`}>
                  {day > 0 && day <= 29 ? day : ''}
                </div>
                {hasEvents && day === 15 && (
                  <div className="mt-2 space-y-1">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 text-xs rounded-lg ${
                          event.type === 'payment' ? 'bg-green-100 text-green-800' :
                          event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div>{event.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Événements à venir</h2>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.tontine}</p>
                </div>
                <span className="text-sm text-gray-500">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}