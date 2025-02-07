import React, { useState } from "react";
import {
  Users,
  Coins,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  AlertCircle,
  Globe,
  Map,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Flag,
  Trophy,
  Bell,
  DollarSign,
  Activity,
  ArrowUpDown,
  Briefcase,
  FileText,
  Share2,
  Download,
  Printer,
  Filter,
  ShieldCheck,
  Target,
  Bookmark,
  Lightbulb,
  Euro,
  Clock,
  Search,
  SlidersHorizontal,
  HelpCircle,
} from "lucide-react";
import { PerformanceChart } from '../components/PerformanceChart';
import { GeographicDistribution } from '../components/GeographicDistribution';
import { ExportMenu } from '../components/ExportMenu';
import { FilterPanel } from '../components/FilterPanel';
import { NotificationsPanel } from '../components/NotificationsPanel';
import { Header } from '../components/dashboard/Header';
import { RegionSelector } from '../components/dashboard/RegionSelector';
import { StatisticsGrid } from '../components/dashboard/StatisticsGrid';

interface TontineGroup {
  id: number;
  name: string;
  type: "epargne" | "theme";
  members: number;
  totalContributions: number;
  monthlyContribution: number;
  nextCollection: string;
  performance: number;
  recentTransactions: Transaction[];
  // Pour les tontines d'épargne
  rotationOrder?: number;
  nextBeneficiary?: string;
  cycleProgress?: number;
  // Pour les tontines à thème
  projectDetails?: {
    name: string;
    description: string;
    goal: number;
    deadline: string;
    progress: number;
    category: "education" | "business" | "health" | "housing" | "other";
  };
}

interface Transaction {
  date: string;
  type: "deposit" | "withdrawal";
  amount: number;
  member: string;
}

interface ProjectDetails {
  name: string;
  goal: number;
  deadline: string;
  progress: number;
  description: string;
}

// Ajouter ces nouvelles interfaces
interface TontineEpargneStats {
  totalEpargne: number;
  toursCompletes: number;
  totalGroupes: number;
  prochaineDistribution: string;
  tauxParticipation: number;
  moyenneMensuelle: number;
}

interface TontineThemeStats {
  projetsCours: Array<{
    nom: string;
    objectif: number;
    collecte: number;
    deadline: string;
    progression: number;
  }>;
  projetsCompletes: number;
  totalInvesti: number;
  prochainsProjets: number;
}

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState<"all" | RegionKey>("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState<TontineGroup | null>(null);
  const [timeRange, setTimeRange] = useState("month");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showRiskIndicators, setShowRiskIndicators] = useState(false);
  const [selectedTontineType, setSelectedTontineType] = useState<
    "epargne" | "theme" | "all"
  >("all");
  const [showHelp, setShowHelp] = useState(false);
  const [performancePeriod, setPerformancePeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'month',
    status: 'all',
    montantMin: 0,
    montantMax: 100000,
    type: 'all'
  });

  const [notifications, setNotifications] = useState<Array<{
    id: number;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    timestamp: string;
    read: boolean;
  }>>([
    {
      id: 1,
      title: "Nouveau membre",
      message: "Marie Dubois a rejoint le groupe Paris",
      type: "success",
      timestamp: "Il y a 5 minutes",
      read: false
    },
    {
      id: 2,
      title: "Paiement en attente",
      message: "Échéance à venir pour le groupe Dakar",
      type: "warning",
      timestamp: "Il y a 1 heure",
      read: false
    },
    {
      id: 3,
      title: "Objectif atteint",
      message: "Le groupe Abidjan a atteint son objectif",
      type: "success",
      timestamp: "Il y a 2 heures",
      read: false
    }
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const regions = [
    { id: "diaspora", name: "Diaspora" },
    { id: "continent", name: "Continent Africain" },
  ];

  type RegionKey = 'diaspora' | 'continent';
  const countries: Record<RegionKey, Array<{
    id: string;
    name: string;
    groupCount: number;
    memberCount: number;
    groups?: Array<TontineGroup>;
  }>> = {
    diaspora: [
      {
        id: "fr",
        name: "France",
        groupCount: 2,
        memberCount: 177,
        groups: [
          {
            id: 1,
            name: "Groupe Paris",
            type: "epargne",
            members: 85,
            totalContributions: 42500,
            monthlyContribution: 500,
            nextCollection: "2024-03-15",
            performance: 98,
            rotationOrder: 5,
            nextBeneficiary: "Marie Claire",
            cycleProgress: 45,
            recentTransactions: [
              {
                date: "2024-02-28",
                type: "deposit",
                amount: 500,
                member: "Sophie Martin",
              },
              {
                date: "2024-02-27",
                type: "deposit",
                amount: 500,
                member: "Jean Dupont",
              },
              {
                date: "2024-02-26",
                type: "withdrawal",
                amount: 5000,
                member: "Marie Claire",
              },
            ],
          },
          {
            id: 2,
            name: "Groupe Projet Éducation",
            type: "theme",
            members: 92,
            totalContributions: 46000,
            monthlyContribution: 500,
            nextCollection: "2024-03-20",
            performance: 95,
            projectDetails: {
              name: "Construction École Primaire",
              description:
                "Financement de la construction d'une école primaire",
              goal: 100000,
              deadline: "2024-12-31",
              progress: 46,
              category: "education",
            },
            recentTransactions: [
              {
                date: "2024-02-28",
                type: "deposit",
                amount: 500,
                member: "Pierre Dubois",
              },
              {
                date: "2024-02-27",
                type: "deposit",
                amount: 500,
                member: "Anne Marie",
              },
            ],
          },
        ],
      },
      { id: "us", name: "États-Unis", groupCount: 8, memberCount: 800 },
      { id: "uk", name: "Royaume-Uni", groupCount: 5, memberCount: 500 },
      { id: "ca", name: "Canada", groupCount: 4, memberCount: 400 },
    ],
    continent: [
      {
        id: "sn",
        name: "Sénégal",
        groupCount: 1,
        memberCount: 100,
        groups: [
          {
            id: 3,
            name: "Groupe Dakar",
            type: "epargne",
            members: 100,
            totalContributions: 30000,
            monthlyContribution: 300,
            nextCollection: "2024-03-10",
            performance: 100,
            recentTransactions: [
              {
                date: "2024-02-28",
                type: "deposit",
                amount: 300,
                member: "Fatou Diallo",
              },
              {
                date: "2024-02-27",
                type: "deposit",
                amount: 300,
                member: "Moussa Sow",
              },
            ],
          },
        ],
      },
      { id: "ci", name: "Côte d'Ivoire", groupCount: 10, memberCount: 1000 },
      { id: "cm", name: "Cameroun", groupCount: 8, memberCount: 800 },
      { id: "ml", name: "Mali", groupCount: 6, memberCount: 600 },
    ],
  };

  // Ajouter ces nouvelles données
  const tontineEpargneStats: TontineEpargneStats = {
    totalEpargne: 125000,
    toursCompletes: 24,
    totalGroupes: 45,
    prochaineDistribution: "2024-03-20",
    tauxParticipation: 97,
    moyenneMensuelle: 15000,
  };

  const tontineThemeStats: TontineThemeStats = {
    projetsCours: [
      {
        nom: "Construction École",
        objectif: 50000,
        collecte: 35000,
        deadline: "2024-06-30",
        progression: 70,
      },
      {
        nom: "Fonds Commerce",
        objectif: 25000,
        collecte: 20000,
        deadline: "2024-04-15",
        progression: 80,
      },
    ],
    projetsCompletes: 12,
    totalInvesti: 89000,
    prochainsProjets: 4,
  };

  const performanceData = {
    month: [
      { name: 'Groupe Paris', performance: 98, contributions: 42500, membres: 85 },
      { name: 'Groupe Lyon', performance: 95, contributions: 38000, membres: 75 },
      { name: 'Groupe Dakar', performance: 92, contributions: 30000, membres: 100 },
      { name: 'Groupe Abidjan', performance: 88, contributions: 35000, membres: 90 },
      { name: 'Groupe Montreal', performance: 85, contributions: 40000, membres: 80 }
    ],
    quarter: [
      { name: 'Q1 2024 Paris', performance: 97, contributions: 127500, membres: 85 },
      { name: 'Q1 2024 Lyon', performance: 94, contributions: 114000, membres: 75 },
      { name: 'Q1 2024 Dakar', performance: 93, contributions: 90000, membres: 100 },
      { name: 'Q1 2024 Abidjan', performance: 91, contributions: 105000, membres: 90 },
      { name: 'Q1 2024 Montreal', performance: 89, contributions: 120000, membres: 80 }
    ],
    year: [
      { name: '2024 Paris', performance: 96, contributions: 510000, membres: 85 },
      { name: '2024 Lyon', performance: 93, contributions: 456000, membres: 75 },
      { name: '2024 Dakar', performance: 94, contributions: 360000, membres: 100 },
      { name: '2024 Abidjan', performance: 90, contributions: 420000, membres: 90 },
      { name: '2024 Montreal', performance: 92, contributions: 480000, membres: 80 }
    ]
  };

  const geoData = [
    { id: 'SEN', name: 'Sénégal', groupCount: 35, memberCount: 3500, growth: 12 },
    { id: 'CIV', name: 'Côte d\'Ivoire', groupCount: 28, memberCount: 2800, growth: 15 },
    { id: 'MLI', name: 'Mali', groupCount: 22, memberCount: 2200, growth: 8 },
    { id: 'CMR', name: 'Cameroun', groupCount: 18, memberCount: 1800, growth: 10 },
    // Ajoutez d'autres pays selon vos besoins
  ];

  const getPeriodLabel = (period: 'month' | 'quarter' | 'year') => {
    switch (period) {
      case 'month':
        return 'Performances mensuelles';
      case 'quarter':
        return 'Performances trimestrielles';
      case 'year':
        return 'Performances annuelles';
    }
  };

  const renderGroupDetails = (group: TontineGroup) => (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              group.members >= 100
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {group.members}/100 membres
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500">Contribution Mensuelle</div>
          <div className="text-2xl font-bold text-gray-900">
            €{group.monthlyContribution}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500">Total Collecté</div>
          <div className="text-2xl font-bold text-gray-900">
            €{group.totalContributions}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-500">Performance</div>
          <div className="text-2xl font-bold text-gray-900">
            {group.performance}%
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Transactions Récentes</h4>
        <div className="space-y-3">
          {group.recentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {transaction.type === "deposit" ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <div className="text-sm font-medium">
                    {transaction.member}
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.date}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-medium ${
                  transaction.type === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "deposit" ? "+" : "-"}€
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Prochaine Collection</h4>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-amber-800">
                Date de collecte
              </div>
              <div className="text-lg font-bold text-amber-900">
                {group.nextCollection}
              </div>
            </div>
            <Calendar className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Ajouter la section spécifique aux projets pour les tontines à thème */}
      {group.type === "theme" && group.projectDetails && (
        <div className="mt-6 border-t pt-6">
          <h4 className="text-lg font-semibold mb-4">Détails du Projet</h4>
          <div className="bg-amber-50 rounded-lg p-4">
            <h5 className="font-medium text-amber-900">
              {group.projectDetails.name}
            </h5>
            <p className="text-sm text-amber-800 mt-2">
              {group.projectDetails.description}
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Objectif : €{group.projectDetails.goal}</span>
                <span>Progrès : {group.projectDetails.progress}%</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div
                  className="bg-amber-600 rounded-full h-2"
                  style={{ width: `${group.projectDetails.progress}%` }}
                />
              </div>
              <p className="text-xs text-amber-700 mt-2">
                Date limite : {group.projectDetails.deadline}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGroupCard = (group: TontineGroup) => {
    if (group.type === "epargne") {
      return (
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  Épargne
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Tour {group.rotationOrder}/12
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Prochain bénéficiaire</p>
              <p className="text-sm font-medium">{group.nextBeneficiary}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Membres</span>
              <span className="font-medium">{group.members}/100</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Contribution</span>
              <span className="font-medium">€{group.monthlyContribution}</span>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Progression du cycle</span>
                <span className="font-medium">{group.cycleProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 rounded-full h-2"
                  style={{ width: `${group.cycleProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {group.projectDetails?.category || "Projet"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {group.projectDetails?.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Objectif</span>
            <span className="font-medium">
              €{group.projectDetails?.goal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Collecté</span>
            <span className="font-medium">
              €{group.totalContributions.toLocaleString()}
            </span>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Progression</span>
              <span className="font-medium">
                {group.projectDetails?.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 rounded-full h-2"
                style={{ width: `${group.projectDetails?.progress}%` }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Deadline:{" "}
            {new Date(
              group.projectDetails?.deadline || ""
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  };

  const renderCountryGroups = () => {
    if (selectedRegion === "all" || selectedCountry === "all") return null;

    const country = countries[selectedRegion].find(
      (c) => c.id === selectedCountry
    );
    if (!country) return null;

    // Si le pays n'a pas de groupes détaillés
    if (!country.groups) {
      return (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-6">Groupes de {country.name}</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-amber-200 mx-auto mb-4" />
              <p className="text-gray-600">
                {country.groupCount} groupes actifs avec {country.memberCount}{" "}
                membres au total
              </p>
              <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Groupes de {country.name}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTontineType("epargne")}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTontineType === "epargne"
                  ? "bg-amber-200 text-amber-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Épargne
            </button>
            <button
              onClick={() => setSelectedTontineType("theme")}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTontineType === "theme"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Projets
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {country.groups
            .filter(
              (g) =>
                selectedTontineType === "all" || g.type === selectedTontineType
            )
            .map((group: TontineGroup) => (
              <div key={group.id} onClick={() => setSelectedGroup(group)}>
                {renderGroupCard(group)}
              </div>
            ))}
        </div>
      </div>
    );
  };

  const handleExport = (format: "pdf" | "excel" | "print") => {
    // Implémenter l'export
  };

  const getAllExportData = () => {
    const exportData = [];

    // Données des pays
    if (selectedRegion !== 'all') {
      countries[selectedRegion].forEach(country => {
        exportData.push({
          type: 'Pays',
          nom: country.name,
          groupes: country.groupCount,
          membres: country.memberCount,
        });

        // Ajouter les données des groupes si disponibles
        country.groups?.forEach(group => {
          exportData.push({
            type: 'Groupe',
            nom: group.name,
            categorie: group.type,
            membres: group.members,
            contributions: group.totalContributions,
            performance: `${group.performance}%`,
            prochaine_collecte: group.nextCollection,
          });
        });
      });
    }

    // Ajouter les statistiques globales
    exportData.push({
      type: 'Statistiques',
      epargne_totale: tontineEpargneStats.totalEpargne,
      participation: `${tontineEpargneStats.tauxParticipation}%`,
      projets_completes: tontineThemeStats.projetsCompletes,
      total_investi: tontineThemeStats.totalInvesti,
    });

    return exportData;
  };

  return (
    <main className="p-8">
      <Header 
        showHelp={showHelp}
        setShowHelp={setShowHelp}
        setShowFilters={setShowFilters}
        setShowExportMenu={setShowExportMenu}
        showExportMenu={showExportMenu}
        activeFilters={activeFilters}
      />

      {showHelp && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-amber-800 mb-2">Guide rapide</h3>
          <ul className="text-sm text-amber-700 space-y-2">
            <li>
              • Sélectionnez une région et un pays pour voir les groupes
              spécifiques
            </li>
            <li>• Choisissez le type de tontine pour filtrer les données</li>
            <li>• Utilisez les filtres avancés pour affiner votre vue</li>
          </ul>
        </div>
      )}

      <RegionSelector 
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setSelectedGroup={setSelectedGroup}
        regions={regions}
        countries={countries}
      />

      <StatisticsGrid 
        selectedRegion={selectedRegion}
        selectedCountry={selectedCountry}
        countries={countries}
      />

      {/* Type de Tontine Selector amélioré */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Type de Tontine</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedTontineType("all")}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTontineType === "all"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedTontineType("epargne")}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTontineType === "epargne"
                    ? "bg-amber-200 text-amber-800"
                    : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                }`}
              >
                Épargne
              </button>
              <button
                onClick={() => setSelectedTontineType("theme")}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTontineType === "theme"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                Thème
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedTontineType("epargne")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTontineType === "epargne"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-amber-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">Tontine d'Épargne</h3>
                  <p className="text-sm text-gray-500">
                    Épargne collective et rotative
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-gray-400" />
                  <span>Montant fixe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Rotation périodique</span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedTontineType("theme")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTontineType === "theme"
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-amber-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">Tontine à Thème</h3>
                  <p className="text-sm text-gray-500">
                    Projets et objectifs spécifiques
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-gray-400" />
                  <span>Projets définis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span>Objectif commun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Notifications Flottantes */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 relative"
        >
          <Bell className="h-6 w-6" />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
      </div>

      <NotificationsPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* Nouvelles sections après les cartes de statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Prochaines Échéances */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-amber-600 mr-2" />
            Prochaines Échéances
          </h2>
          <div className="space-y-3">
            {[
              { date: "2024-03-15", amount: 15000, members: 30 },
              { date: "2024-03-20", amount: 12500, members: 25 },
              { date: "2024-03-25", amount: 10000, members: 20 },
            ].map((deadline, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{deadline.date}</p>
                  <p className="text-xs text-gray-500">
                    {deadline.members} membres
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">€{deadline.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performances */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Trophy className="h-5 w-5 text-amber-600 mr-2" />
            Top Performances
          </h2>
          <div className="space-y-3">
            {[
              { group: "Groupe Paris", performance: 98, trend: "up" },
              { group: "Groupe Lyon", performance: 95, trend: "up" },
              { group: "Groupe Dakar", performance: 92, trend: "down" },
            ].map((group, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium">{group.group}</span>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      group.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {group.performance}%
                  </span>
                  {group.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flux Financier */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <ArrowUpDown className="h-5 w-5 text-amber-600 mr-2" />
            Flux Financier
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600">Entrées</p>
                <p className="text-lg font-bold text-green-700">€25,400</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-600">Sorties</p>
                <p className="text-lg font-bold text-red-700">€18,200</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-2">Balance</p>
              <p className="text-2xl font-bold text-amber-600">+€7,200</p>
            </div>
          </div>
        </div>
      </div>


      {/* Section dynamique basée sur le type de tontine sélectionné */}
      {selectedTontineType === "all" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Statistiques Tontine d'Épargne */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Wallet className="h-5 w-5 text-amber-600 mr-2" />
              Tontines d'Épargne
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Montant total épargné</p>
                <p className="text-2xl font-bold text-gray-900">€125,000</p>
                <p className="text-xs text-green-600 mt-1">+15% ce mois</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Tours complétés</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500 mt-1">Sur 45 groupes</p>
              </div>
            </div>
          </div>

          {/* Statistiques Tontine à Thème */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 text-amber-600 mr-2" />
              Tontines à Thème
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Projets financés</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600 mt-1">3 en cours</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Montant total</p>
                <p className="text-2xl font-bold text-gray-900">€89,000</p>
                <p className="text-xs text-gray-500 mt-1">4 projets à venir</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          {/* Section pour Tontine d'Épargne */}
          {selectedTontineType === "epargne" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center">
                  <Wallet className="h-5 w-5 text-amber-600 mr-2" />
                  Tontine d'Épargne - Vue d'ensemble
                </h2>
                <span className="text-sm text-gray-500">
                  {tontineEpargneStats.totalGroupes} groupes actifs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total épargné</p>
                  <p className="text-2xl font-bold text-green-700">
                    €{tontineEpargneStats.totalEpargne.toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600 ml-1">+15% ce mois</span>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Prochaine distribution</p>
                  <p className="text-lg font-bold text-amber-700">
                    {new Date(tontineEpargneStats.prochaineDistribution).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    €{tontineEpargneStats.moyenneMensuelle.toLocaleString()} à distribuer
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Participation</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {tontineEpargneStats.tauxParticipation}%
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${tontineEpargneStats.tauxParticipation}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section pour Tontine à Thème */}
          {selectedTontineType === "theme" && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center">
                  <Target className="h-5 w-5 text-amber-600 mr-2" />
                  Tontine à Thème - Projets en cours
                </h2>
                <span className="text-sm text-gray-500">
                  {tontineThemeStats.projetsCours.length} projets actifs
                </span>
              </div>

              <div className="space-y-6">
                {tontineThemeStats.projetsCours.map((projet, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{projet.nom}</h3>
                        <p className="text-sm text-gray-500">
                          Objectif: €{projet.objectif.toLocaleString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                        {projet.progression}%
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-amber-600 rounded-full h-2"
                          style={{ width: `${projet.progression}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Collecté: €{projet.collecte.toLocaleString()}</span>
                        <span>Deadline: {new Date(projet.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {tontineThemeStats.projetsCompletes}
                  </p>
                  <p className="text-sm text-gray-500">Projets complétés</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    €{tontineThemeStats.totalInvesti.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Total investi</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {tontineThemeStats.prochainsProjets}
                  </p>
                  <p className="text-sm text-gray-500">Projets à venir</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ajouter une nouvelle section pour les indicateurs de risque */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center">
              <ShieldCheck className="h-5 w-5 text-amber-600 mr-2" />
              Indicateurs de Risque
            </h2>
            <button
              onClick={() => setShowRiskIndicators(!showRiskIndicators)}
              className="text-sm text-amber-600 hover:text-amber-700"
            >
              {showRiskIndicators ? "Masquer" : "Voir plus"}
            </button>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
              showRiskIndicators ? "" : "hidden"
            }`}
          >
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Taux de Remboursement
              </h3>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
              <p className="text-sm text-green-700 mt-1">+2.3% ce mois</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">
                Retards de Paiement
              </h3>
              <p className="text-2xl font-bold text-yellow-600">4.2%</p>
              <p className="text-sm text-yellow-700 mt-1">-0.5% ce mois</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Garanties Actives
              </h3>
              <p className="text-2xl font-bold text-blue-600">245</p>
              <p className="text-sm text-blue-700 mt-1">+12 ce mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <GeographicDistribution
          data={geoData}
          onCountrySelect={(countryId) => {
            const country = countries.continent.find(c => c.id === countryId.toLowerCase());
            if (country) {
              setSelectedRegion('continent');
              setSelectedCountry(countryId.toLowerCase());
            }
          }}
        />

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">{getPeriodLabel(performancePeriod)}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {performancePeriod === 'month' ? 'Mars 2024' :
                 performancePeriod === 'quarter' ? '1er trimestre 2024' :
                 'Année 2024'}
              </p>
            </div>
            <select
              className="border border-gray-300 rounded-md text-sm p-2"
              value={performancePeriod}
              onChange={(e) => setPerformancePeriod(e.target.value as 'month' | 'quarter' | 'year')}
            >
              <option value="month">Vue mensuelle</option>
              <option value="quarter">Vue trimestrielle</option>
              <option value="year">Vue annuelle</option>
            </select>
          </div>
          <div className="h-64">
            <PerformanceChart 
              data={performanceData[performancePeriod]}
              period={performancePeriod}
            />
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Moyenne</p>
                <p className="text-lg font-semibold text-amber-600">
                  {Math.round(performanceData[performancePeriod]
                    .reduce((acc, curr) => acc + curr.performance, 0) / 
                    performanceData[performancePeriod].length)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Contributions</p>
                <p className="text-lg font-semibold text-amber-600">
                  €{performanceData[performancePeriod]
                    .reduce((acc, curr) => acc + curr.contributions, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Membres</p>
                <p className="text-lg font-semibold text-amber-600">
                  {performanceData[performancePeriod]
                    .reduce((acc, curr) => acc + curr.membres, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Group Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Activités des Groupes</h2>
            <button className="text-sm text-amber-600 hover:text-amber-700">
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            <ActivityItem
              title="Nouveau groupe créé"
              description="Groupe #12 créé en France - 25 membres inscrits"
              time="Il y a 2h"
              type="new_group"
            />
            <ActivityItem
              title="Groupe complet"
              description="Groupe #8 au Sénégal a atteint 100 membres"
              time="Il y a 5h"
              type="group_full"
            />
            <ActivityItem
              title="Fusion de groupes"
              description="Groupes #3 et #4 en Côte d'Ivoire fusionnés"
              time="Il y a 1j"
              type="group_merge"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Alertes Groupes</h2>
            <div className="space-y-4">
              <AlertItem
                message="Groupe #5 (France) proche de la capacité maximale"
                type="warning"
              />
              <AlertItem
                message="Nouveau groupe nécessaire au Cameroun"
                type="info"
              />
            </div>
          </div>
        </div>
      </div>

      {/* {renderTontineStats()} */}
      {renderCountryGroups()}
      {selectedGroup && renderGroupDetails(selectedGroup)}

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={activeFilters}
        onApplyFilters={(newFilters) => {
          setActiveFilters(newFilters);
          // Implémenter la logique de filtrage ici
        }}
      />
    </main>
  );
}

// Amélioration du composant StatCard
function StatCard({ title, value, icon, change, details }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
          {icon}
        </div>
        <span
          className={`text-sm font-medium ${
            change.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1 group-hover:text-amber-600 transition-colors">
        {value}
      </p>
      {details && <p className="text-sm text-gray-500 mt-2">{details}</p>}
    </div>
  );
}

function ActivityItem({ title, description, time, type }) {
  const getTypeStyles = () => {
    switch (type) {
      case "new_member":
        return "bg-green-100 text-green-800";
      case "payment":
        return "bg-blue-100 text-blue-800";
      case "new_tontine":
        return "bg-purple-100 text-purple-800";
      case "distribution":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`flex-shrink-0 rounded-full p-2 ${getTypeStyles()}`}>
        <div className="h-2 w-2 rounded-full" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}

function AlertItem({ message, type }) {
  const getAlertStyles = () => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-50 text-red-800 border-red-200";
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg border ${getAlertStyles()}`}
    >
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
