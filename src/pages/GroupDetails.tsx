import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  Coins,
  BarChart3,
  Calendar,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  PieChart,
} from "lucide-react";
import { MemberDetailsModal } from "../components/MemberDetailsModal";

export default function GroupDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Exemple de données du groupe
  const group = {
    id: 1,
    name: "Groupe Paris",
    country: "France",
    region: "Île-de-France",
    members: 85,
    totalContributions: 42500,
    monthlyContribution: 500,
    nextCollection: "2024-03-15",
    performance: 98,
    createdAt: "2023-01-15",
    admin: {
      name: "Sophie Martin",
      email: "sophie.m@example.com",
      phone: "+33 6 12 34 56 78",
    },
    membersList: [
      {
        id: 1,
        name: "Marie Dubois",
        joinDate: "2023-01-15",
        contributions: 6000,
        status: "active",
        lastPayment: "2024-02-28",
        email: "marie.d@example.com",
        phone: "+33 6 11 22 33 44",
      },
      {
        id: 2,
        name: "Stéphanie Mbida",
        joinDate: "2023-01-20",
        contributions: 5500,
        status: "active",
        lastPayment: "2024-02-27",
        email: "jean.d@example.com",
        phone: "+33 6 22 33 44 55",
      },
    ],
    transactions: [
      {
        id: 1,
        type: "deposit",
        amount: 500,
        member: "Marie Dubois",
        date: "2024-02-28",
        status: "completed",
      },
      {
        id: 2,
        type: "withdrawal",
        amount: 5000,
        member: "Stéphanie Mbida",
        date: "2024-02-27",
        status: "completed",
      },
    ],
    statistics: {
      monthlyStats: [
        { month: "Jan", contributions: 7500 },
        { month: "Fév", contributions: 8000 },
        { month: "Mar", contributions: 7000 },
      ],
      participationRate: 98,
      totalCollected: 42500,
      averageContribution: 500,
    },
  };

  const tabs = [
    { id: "overview", name: "Vue d'ensemble" },
    { id: "members", name: "Membres" },
    { id: "transactions", name: "Transactions" },
    { id: "statistics", name: "Statistiques" },
    { id: "settings", name: "Paramètres" },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Group Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
            <p className="text-gray-500 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {group.country}, {group.region}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                group.members >= 100
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {group.members}/100 membres
            </span>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Gérer le groupe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* Admin Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Administrateur du Groupe</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{group.admin.name}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {group.admin.email}
                </span>
                <span className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {group.admin.phone}
                </span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 text-amber-600 hover:text-amber-700">
            Contacter
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Activité Récente</h3>
          <button className="text-sm text-amber-600 hover:text-amber-700">
            Voir tout
          </button>
        </div>
        <div className="space-y-4">
          {group.transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
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
    </div>
  );

  interface Member {
    id: number;
    name: string;
    joinDate: string;
    contributions: number;
    status: string;
    lastPayment: string;
    email: string;
    phone: string;
  }

  const handleMemberSelect = (member: Member) => {
    setSelectedMember({
      ...member,
      totalContributions: 12500,
      participationRate: 98,
      nextPaymentDate: "2024-03-15",
      paymentHistory: [
        { date: "2024-02-01", amount: 500, status: "completed" },
        { date: "2024-01-01", amount: 500, status: "completed" },
        { date: "2023-12-01", amount: 500, status: "failed" },
      ],
      // Ajouter les données des avaliseurs
      guarantors: [
        {
          id: 1,
          name: "Pierre Dubois",
          status: "active",
          since: "2023-06-15",
          contribution: 1500,
        },
        {
          id: 2,
          name: "Marie Lambert",
          status: "inactive",
          since: "2023-04-20",
          contribution: 1000,
        },
      ],
      // Ajouter les données des garanties accordées
      guarantoring: [
        {
          id: 3,
          name: "Jean Martin",
          status: "active",
          since: "2023-08-01",
          contribution: 2000,
        },
      ],
    });
  };

  const renderMembers = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Liste des Membres</h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Ajouter un membre
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'adhésion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contributions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dernier Paiement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {group.membersList.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    €{member.contributions}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status === "active" ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.lastPayment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-amber-600 hover:text-amber-900"
                    onClick={() => handleMemberSelect(member)}
                  >
                    Voir détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MemberDetailsModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Historique des Transactions
            </h3>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                Nouvelle transaction
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {group.transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {transaction.type === "deposit"
                          ? "Versement"
                          : "Retrait"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.member}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status === "completed"
                        ? "Complété"
                        : "En cours"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStatistics = () => (
    <div className="space-y-6">
      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Taux de Participation</p>
              <p className="text-2xl font-bold text-gray-900">
                {group.statistics.participationRate}%
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Collecté</p>
              <p className="text-2xl font-bold text-gray-900">
                €{group.statistics.totalCollected}
              </p>
            </div>
            <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Coins className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contribution Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">
                €{group.statistics.averageContribution}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6">
          Évolution des Contributions
        </h3>
        <div className="h-64 flex items-center justify-center border-t">
          <BarChart3 className="h-32 w-32 text-amber-200" />
        </div>
      </div>

      {/* Member Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">
            Répartition des Membres
          </h3>
          <div className="h-64 flex items-center justify-center border-t">
            <PieChart className="h-32 w-32 text-amber-200" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-6">Performance Mensuelle</h3>
          <div className="h-64 flex items-center justify-center border-t">
            <BarChart3 className="h-32 w-32 text-amber-200" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Paramètres du Groupe</h3>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les paramètres et les règles du groupe.
          </p>
        </div>
        <div className="p-6 space-y-6">
          {/* Contribution Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Paramètres des Contributions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Montant de la contribution mensuelle
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  defaultValue={group.monthlyContribution}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jour de collecte
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  min="1"
                  max="31"
                  defaultValue="15"
                />
              </div>
            </div>
          </div>

          {/* Group Rules */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Règles du Groupe
            </h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Autoriser les nouveaux membres
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Notifications automatiques
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Pénalités pour retard de paiement
                </label>
              </div>
            </div>
          </div>

          {/* Admin Settings */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Administration
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Administrateur principal
                </label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                  <option>Sophie Martin</option>
                  <option>Stéphanie Mbida</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Co-administrateurs
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  multiple
                >
                  <option>Marie Dubois</option>
                  <option>Pierre Martin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "members" && renderMembers()}
        {activeTab === "transactions" && renderTransactions()}
        {activeTab === "statistics" && renderStatistics()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
}
