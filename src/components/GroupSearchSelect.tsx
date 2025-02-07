import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Group {
  id: number;
  name: string;
  country: string;
  members: number;
}

interface Props {
  groups: Group[];
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
}

export const GroupSearchSelect: React.FC<Props> = ({ groups, value, onChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedGroup = groups.find(g => g.id.toString() === value);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-md cursor-pointer hover:border-amber-500"
      >
        {selectedGroup ? (
          <div className="flex justify-between w-full">
            <span>{selectedGroup.name}</span>
            <span className="text-gray-500">{selectedGroup.members} membres</span>
          </div>
        ) : (
          <span className="text-gray-500">Sélectionner un groupe</span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div className="p-2 border-b sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="Rechercher un groupe..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
                {search && (
                  <button
                    onClick={() => handleSearch('')}
                    className="absolute right-3 top-2.5"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredGroups.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Aucun groupe trouvé
                </div>
              ) : (
                filteredGroups.map((group, index) => (
                  <div
                    key={group.id}
                    onClick={() => {
                      onChange(group.id.toString());
                      setIsOpen(false);
                    }}
                    className={`p-3 flex justify-between items-center cursor-pointer ${
                      index === highlightedIndex ? 'bg-amber-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-gray-500">{group.country}</div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {group.members} membres
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
