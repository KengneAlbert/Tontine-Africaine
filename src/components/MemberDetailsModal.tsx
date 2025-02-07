import React from 'react';
import { Modal } from './Modal';
import { 
  Phone, 
  Mail, 
  Calendar, 
  Coins, 
  Clock, 
  Shield, 
  UserCheck, 
  ChevronDown,
  Eye,
  TrendingUp,
  Award,
  AlertTriangle,
  AlertCircle,
  BarChart2,
  Target
} from 'lucide-react';

interface MemberDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  contributions: number;
  status: string;
  lastPayment: string;
  totalContributions: number;
  paymentHistory: Array<{
    date: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
  }>;
  nextPaymentDate: string;
  participationRate: number;
  guarantors: Array<{
    id: number;
    name: string;
    status: 'active' | 'inactive';
    since: string;
    contribution: number;
  }>;
  guarantoring: Array<{
    id: number;
    name: string;
    status: 'active' | 'inactive';
    since: string;
    contribution: number;
  }>;
  reliability: number;
  warningCount: number;
  nextPaymentAmount: number;
  lastActivities: Array<{
    date: string;
    type: 'payment' | 'guarantee' | 'warning' | 'achievement';
    description: string;
  }>;
  achievements: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

interface Props {
  member: MemberDetails;
  onClose: () => void;
  isOpen: boolean;
}

export const MemberDetailsModal: React.FC<Props> = ({ member, onClose, isOpen }) => {
  if (!member || !isOpen) return null;

  return (
    <Modal 
      title={`Détails du membre - ${member.name}`} 
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
        {/* Informations personnelles */}
        <div className="bg-gray-50 rounded-lg p-4 md:p-6 transition-all duration-200 ease-in-out">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Informations personnelles</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span>Membre depuis le {member.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total contributions</p>
                <p className="text-lg font-semibold text-green-700">€{member.totalContributions}</p>
              </div>
              <Coins className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Taux de participation</p>
                <p className="text-lg font-semibold text-blue-700">{member.participationRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Prochain versement</p>
                <p className="text-lg font-semibold text-amber-700">{member.nextPaymentDate}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Section des Avaliseurs */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center">
              <Shield className="h-4 w-4 text-amber-500 mr-2" />
              Avaliseurs ({member.guarantors?.length || 0})
            </h3>
            <button className="md:hidden text-gray-500 hover:text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {member.guarantors?.length > 0 ? (
              member.guarantors.map((guarantor) => (
                <div
                  key={guarantor.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      guarantor.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <UserCheck className={`h-4 w-4 ${
                        guarantor.status === 'active' ? 'text-green-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{guarantor.name}</p>
                      <p className="text-xs text-gray-500">Depuis le {guarantor.since}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">€{guarantor.contribution}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guarantor.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {guarantor.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-4 col-span-2">
                Aucun avaliseur
              </div>
            )}
          </div>
        </div>

        {/* Garanties accordées */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <UserCheck className="h-4 w-4 text-amber-500 mr-2" />
            Garanties accordées
          </h3>
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {member.guarantoring?.length > 0 ? (
              member.guarantoring.map((guaranteed) => (
                <div
                  key={guaranteed.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      guaranteed.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Shield className={`h-4 w-4 ${
                        guaranteed.status === 'active' ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{guaranteed.name}</p>
                      <p className="text-xs text-gray-500">Depuis le {guaranteed.since}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">€{guaranteed.contribution}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guaranteed.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {guaranteed.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 text-center py-4 col-span-2">
                Aucune garantie accordée
              </div>
            )}
          </div>
        </div>

        {/* Historique des paiements */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Historique des paiements</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="space-y-2">
                {member.paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-3 ${
                        payment.status === 'completed' ? 'bg-green-500' :
                        payment.status === 'pending' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{payment.date}</p>
                        <p className="text-xs text-gray-500">€{payment.amount}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status === 'completed' ? 'Complété' :
                      payment.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicateurs de performance */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <BarChart2 className="h-4 w-4 text-amber-500 mr-2" />
            Indicateurs de performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Fiabilité</span>
                <Award className={`h-5 w-5 ${
                  member.reliability >= 90 ? 'text-green-500' :
                  member.reliability >= 70 ? 'text-amber-500' :
                  'text-red-500'
                }`} />
              </div>
              <div className="mt-2 text-2xl font-bold">{member.reliability}%</div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Prochain versement</span>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">€{member.nextPaymentAmount}</div>
                <div className="text-sm text-gray-500">{member.nextPaymentDate}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Avertissements</span>
                <AlertTriangle className={`h-5 w-5 ${
                  member.warningCount > 0 ? 'text-amber-500' : 'text-green-500'
                }`} />
              </div>
              <div className="mt-2 text-2xl font-bold">{member.warningCount}</div>
            </div>
          </div>
        </div>

        {/* Dernières activités */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Dernières activités</h3>
          <div className="space-y-3">
            {member.lastActivities?.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                {activity.type === 'payment' && <Coins className="h-4 w-4 text-green-500 mr-3" />}
                {activity.type === 'guarantee' && <Shield className="h-4 w-4 text-blue-500 mr-3" />}
                {activity.type === 'warning' && <AlertCircle className="h-4 w-4 text-red-500 mr-3" />}
                {activity.type === 'achievement' && <Target className="h-4 w-4 text-amber-500 mr-3" />}
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Réalisations */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Award className="h-4 w-4 text-amber-500 mr-2" />
            Réalisations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {member.achievements?.map((achievement, index) => (
              <div key={index} className="bg-amber-50 p-4 rounded-lg">
                <h4 className="font-medium text-amber-900">{achievement.title}</h4>
                <p className="text-sm text-amber-800 mt-1">{achievement.description}</p>
                <p className="text-xs text-amber-700 mt-2">{achievement.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white pt-4 border-t mt-6">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              className="w-full sm:w-auto px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-md"
              onClick={() => window.location.href = `mailto:${member.email}`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Contacter
            </button>
            <button
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Voir toutes les transactions
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
