import React, { useState, FormEvent } from "react";
import {
  Mail,
  Users,
  Globe,
  Send,
  ChevronDown,
  X,
  Plus,
  Eye,
  Save,
  Edit,
  Trash,
  PenTool,
  Calendar,
  Paperclip,
  Clock,
  History,
  ArrowRight,
  ArrowLeft,
  Settings,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tippy";
import { FileDropzone } from "../components/FileDropzone";
import { Modal } from "../components/Modal";
import "react-tippy/dist/tippy.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast, Toaster } from "react-hot-toast";
import { useHotkeys } from "react-hotkeys-hook";
import { Kbd } from "../components/Kbd";
import { GroupSearchSelect } from "../components/GroupSearchSelect";

interface Template {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface Country {
  id: string;
  name: string;
  members?: number;
}

interface Group {
  id: number;
  name: string;
  country: string;
  members: number;
}

interface Signature {
  id: string;
  name: string;
  content: string;
  isDefault?: boolean;
}

interface MessageHistory {
  id: string;
  subject: string;
  recipients: number;
  status: "sent" | "scheduled" | "failed";
  date: Date;
  content: string;
  attachments: string[];
  openRate?: number;
  clickRate?: number;
  errorCount?: number;
  errorDetails?: string;
}

export default function Communications() {
  const [selectedRecipients, setSelectedRecipients] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showVariablesHelp, setShowVariablesHelp] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<Template[]>([
    {
      id: "custom1",
      name: "Mon modèle personnalisé",
      subject: "Sujet personnalisé",
      content: "Contenu personnalisé",
    },
  ]);
  const [previewData] = useState({
    memberName: "John Doe",
    groupName: "Groupe Paris",
    amount: "500€",
    date: new Date().toLocaleDateString(),
  });

  const [signatures, setSignatures] = useState<Signature[]>([
    {
      id: "sig1",
      name: "Signature professionnelle",
      content:
        "Cordialement,\nStéphanie Mbida\nGestionnaire Tontine Africaine\nTél: +33 6 00 00 00 00",
      isDefault: true,
    },
    {
      id: "sig2",
      name: "Signature simple",
      content: "Bien à vous,\nStéphanie Mbida",
    },
  ]);
  const [selectedSignature, setSelectedSignature] = useState<string>("sig1");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [editingSignature, setEditingSignature] = useState<Signature | null>(
    null
  );
  const [showHistory, setShowHistory] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<
    "all" | "sent" | "scheduled" | "failed"
  >("all");
  const [messageHistory] = useState<MessageHistory[]>([
    {
      id: "1",
      subject: "Rappel cotisation Janvier",
      content: "Cher membre, nous vous rappelons...",
      recipients: 234,
      status: "sent",
      date: new Date("2024-01-15"),
      attachments: ["document.pdf"],
      openRate: 85,
      clickRate: 45,
    },
    {
      id: "2",
      subject: "Maintenance plateforme",
      content: "La plateforme sera en maintenance...",
      recipients: 6800,
      status: "scheduled",
      date: new Date("2024-02-01"),
      attachments: [],
    },
    {
      id: "3",
      subject: "Erreur de paiement",
      content: "Une erreur est survenue...",
      recipients: 50,
      status: "failed",
      date: new Date("2024-01-20"),
      attachments: [],
      errorCount: 50,
      errorDetails: "Erreur SMTP",
    },
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const totalSteps = 3;

  const steps = [
    { number: 1, title: "Destinataires", icon: Users },
    { number: 2, title: "Message", icon: Mail },
    { number: 3, title: "Options", icon: Settings },
  ];

  const regions = [
    { id: "diaspora", name: "Diaspora" },
    { id: "continent", name: "Continent Africain" },
  ];

  const countries: Record<
    string,
    Array<{ id: string; name: string; members?: number }>
  > = {
    diaspora: [
      { id: "fr", name: "France" },
      { id: "us", name: "États-Unis" },
      { id: "uk", name: "Royaume-Uni" },
      { id: "ca", name: "Canada" },
    ],
    continent: [
      { id: "sn", name: "Sénégal" },
      { id: "ci", name: "Côte d'Ivoire" },
      { id: "cm", name: "Cameroun" },
      { id: "ml", name: "Mali" },
    ],
  };

  const groups = [
    { id: 1, name: "Groupe Paris", country: "fr", members: 85 },
    { id: 2, name: "Groupe Lyon", country: "fr", members: 92 },
    { id: 3, name: "Groupe Dakar", country: "sn", members: 100 },
  ];

  const templates = [
    {
      id: "welcome",
      name: "Message de bienvenue",
      subject: "Bienvenue dans la communauté Tontine Africaine",
      content: "Cher membre,\n\nNous sommes ravis de vous accueillir...",
    },
    {
      id: "reminder",
      name: "Rappel de cotisation",
      subject: "Rappel : Cotisation mensuelle",
      content: "Cher membre,\n\nNous vous rappelons que votre cotisation...",
    },
    {
      id: "event",
      name: "Annonce d'événement",
      subject: "Événement à venir",
      content: "Cher membre,\n\nNous avons le plaisir de vous annoncer...",
    },
  ];

  const allTemplates = [...templates, ...customTemplates];

  const handleTemplateChange = (templateId: string) => {
    const template = allTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setMessage(template.content);
    }
  };

  const handleSaveTemplate = (newTemplate: Omit<Template, "id">) => {
    setCustomTemplates([
      ...customTemplates,
      {
        id: `custom${customTemplates.length + 1}`,
        ...newTemplate,
      },
    ]);
    setShowTemplateModal(false);
  };

  const handleAddSignature = (newSignature: Omit<Signature, "id">) => {
    const id = `sig${signatures.length + 1}`;
    setSignatures([...signatures, { ...newSignature, id }]);
    setShowSignatureModal(false);
  };

  const handleEditSignature = (
    newData: Omit<Signature, "id">,
    signatureId: string
  ) => {
    setSignatures(
      signatures.map((sig) =>
        sig.id === signatureId
          ? { ...sig, ...newData }
          : newData.isDefault
          ? { ...sig, isDefault: false }
          : sig
      )
    );
    setShowSignatureModal(false);
    setEditingSignature(null);
  };

  // Fonction pour gérer les pièces jointes
  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments((prev) => [...prev, ...Array.from(files)]);
    }
  };

  // Modifier la fonction replaceVariables pour ne pas inclure la signature
  const replaceVariables = (text: string): string => {
    return text
      .replace(/\{\{memberName\}\}/g, previewData.memberName)
      .replace(/\{\{groupName\}\}/g, previewData.groupName)
      .replace(/\{\{amount\}\}/g, previewData.amount)
      .replace(/\{\{date\}\}/g, previewData.date);
  };

  // Ajouter cette fonction pour rendre la signature
  const renderSignature = () => {
    if (!selectedSignature) return null;
    const signature = signatures.find((s) => s.id === selectedSignature);
    if (!signature) return null;

    return (
      <div className="mt-8 border-t border-gray-200 pt-4">
        <div
          className="whitespace-pre-wrap text-gray-600 text-sm"
          dangerouslySetInnerHTML={{
            __html: makeClickable(signature.content),
          }}
        />
      </div>
    );
  };

  const makeClickable = (text: string): string => {
    // Rendre les URLs cliquables
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    text = text.replace(
      urlRegex,
      '<a href="$1" target="_blank" class="text-amber-600 hover:underline">$1</a>'
    );

    // Rendre les emails cliquables
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
    text = text.replace(
      emailRegex,
      '<a href="mailto:$1" class="text-amber-600 hover:underline">$1</a>'
    );

    // Rendre les numéros de téléphone cliquables
    const phoneRegex =
      /(\+?\d{1,4}[\s-]?\d{1,3}[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2})/g;
    text = text.replace(
      phoneRegex,
      '<a href="tel:$1" class="text-amber-600 hover:underline">$1</a>'
    );

    return text;
  };

  const getRecipientCount = () => {
    switch (selectedRecipients) {
      case "all":
        return "6,800";
      case "region":
        return selectedRegion === "diaspora" ? "2,800" : "4,000";
      case "country":
        return (
          countries[selectedRegion]?.find((c) => c.id === selectedCountry)
            ?.members || "0"
        );
      case "group":
        return (
          groups.find((g) => g.id === parseInt(selectedGroup))?.members || "0"
        );
      default:
        return "0";
    }
  };

  const AVAILABLE_VARIABLES = [
    {
      label: "Nom du membre",
      syntax: "{{memberName}}",
      example: "Cher {{memberName}}, votre cotisation...",
      description: "Sera remplacé par le nom du destinataire",
    },
    {
      label: "Nom du groupe",
      syntax: "{{groupName}}",
      example: "Bienvenue dans le {{groupName}}",
      description: "Sera remplacé par le nom du groupe du membre",
    },
    {
      label: "Montant",
      syntax: "{{amount}}",
      example: "Votre cotisation de {{amount}} est due...",
      description: "Sera remplacé par le montant concerné",
    },
    {
      label: "Date",
      syntax: "{{date}}",
      example: "Date limite : {{date}}",
      description: "Sera remplacé par la date concernée",
    },
  ];

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Add handleSend function
  const handleSend = async () => {
    if (!subject || !message) {
      toast.error("Veuillez remplir le sujet et le message");
      return;
    }

    if (
      !selectedRecipients ||
      (selectedRecipients === "group" && !selectedGroup)
    ) {
      toast.error("Veuillez sélectionner les destinataires");
      return;
    }

    const toastId = toast.loading("Envoi en cours...");
    setIsSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Message envoyé avec succès !", { id: toastId });
      // ... reste de la logique d'envoi
    } catch (error) {
      toast.error("Erreur lors de l'envoi", { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  // Ajouter cette fonction pour filtrer l'historique
  const filteredHistory = messageHistory.filter((msg) =>
    historyFilter === "all" ? true : msg.status === historyFilter
  );

  // Ajouter les raccourcis clavier
  useHotkeys("ctrl+enter", () => handleSend(), { enableOnFormTags: true });
  useHotkeys("ctrl+p", () => setShowPreview((prev) => !prev), {
    enableOnFormTags: true,
  });
  useHotkeys("esc", () => {
    setShowVariablesHelp(false);
    setShowHistoryPanel(false);
  });

  // Ajouter l'indicateur de progression
  const getProgressPercentage = () => {
    let progress = 0;
    if (selectedRecipients !== "all" && !selectedRegion) progress = 33;
    if (subject && message) progress = 66;
    if (selectedSignature) progress = 100;
    return progress;
  };

  return (
    <div className="p-4 md:p-8">
      <Toaster position="top-right" />

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <Tooltip
              key={step.number}
              title={`${step.title} (${getProgressPercentage()}% complété)`}
              position="top"
              arrow={true}
              html={
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`flex items-center ${
                    currentStep >= step.number
                      ? "text-amber-600"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`
                    flex items-center justify-center w-8 h-8 rounded-full 
                    ${
                      currentStep >= step.number
                        ? "bg-amber-100"
                        : "bg-gray-100"
                    }
                  `}
                  >
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="ml-2 hidden md:inline">{step.title}</span>
                </button>
              }
            />
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded">
          <motion.div
            className="absolute h-full bg-amber-600 rounded"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Always visible */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Recipients */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Destinataires</h2>
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Destinataires</h2>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="recipients"
                        value="all"
                        checked={selectedRecipients === "all"}
                        onChange={(e) => setSelectedRecipients(e.target.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Tous les membres</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="recipients"
                        value="region"
                        checked={selectedRecipients === "region"}
                        onChange={(e) => setSelectedRecipients(e.target.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Par région</span>
                    </label>
                    {selectedRecipients === "region" && (
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      >
                        <option value="">Sélectionner une région</option>
                        {regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="recipients"
                        value="country"
                        checked={selectedRecipients === "country"}
                        onChange={(e) => setSelectedRecipients(e.target.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Par pays</span>
                    </label>
                    {selectedRecipients === "country" && (
                      <div className="space-y-2">
                        <select
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        >
                          <option value="">Sélectionner une région</option>
                          {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                              {region.name}
                            </option>
                          ))}
                        </select>
                        {selectedRegion && (
                          <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                          >
                            <option value="">Sélectionner un pays</option>
                            {countries[selectedRegion]?.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="recipients"
                        value="group"
                        checked={selectedRecipients === "group"}
                        onChange={(e) => setSelectedRecipients(e.target.value)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span>Par groupe</span>
                    </label>
                    {selectedRecipients === "group" && (
                      <div className="mt-2">
                        <GroupSearchSelect
                          groups={groups}
                          value={selectedGroup}
                          onChange={setSelectedGroup}
                          onSearch={(query) => {
                            // Ici vous pouvez implémenter la recherche côté serveur si nécessaire
                            console.log("Recherche:", query);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Templates */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Modèles</h2>
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                {allTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`block w-full text-left px-4 py-2 rounded-md ${
                      selectedTemplate === template.id
                        ? "bg-amber-100 text-amber-800"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-sm"
            >
              {/* Step Navigation */}
              <div className="border-b px-6 py-4">
                <div className="flex items-center space-x-4">
                  {steps.map((step) => (
                    <button
                      key={step.number}
                      onClick={() => setCurrentStep(step.number)}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        currentStep === step.number
                          ? "bg-amber-50 text-amber-600"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <step.icon className="h-4 w-4 mr-2" />
                      <span>{step.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Destinataires
                        </h2>
                        <div className="space-y-4">
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="recipients"
                              value="all"
                              checked={selectedRecipients === "all"}
                              onChange={(e) =>
                                setSelectedRecipients(e.target.value)
                              }
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                            />
                            <span>Tous les membres</span>
                          </label>
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="recipients"
                              value="region"
                              checked={selectedRecipients === "region"}
                              onChange={(e) =>
                                setSelectedRecipients(e.target.value)
                              }
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                            />
                            <span>Par région</span>
                          </label>
                          {selectedRecipients === "region" && (
                            <select
                              value={selectedRegion}
                              onChange={(e) =>
                                setSelectedRegion(e.target.value)
                              }
                              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                            >
                              <option value="">Sélectionner une région</option>
                              {regions.map((region) => (
                                <option key={region.id} value={region.id}>
                                  {region.name}
                                </option>
                              ))}
                            </select>
                          )}
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="recipients"
                              value="country"
                              checked={selectedRecipients === "country"}
                              onChange={(e) =>
                                setSelectedRecipients(e.target.value)
                              }
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                            />
                            <span>Par pays</span>
                          </label>
                          {selectedRecipients === "country" && (
                            <div className="space-y-2">
                              <select
                                value={selectedRegion}
                                onChange={(e) =>
                                  setSelectedRegion(e.target.value)
                                }
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                              >
                                <option value="">
                                  Sélectionner une région
                                </option>
                                {regions.map((region) => (
                                  <option key={region.id} value={region.id}>
                                    {region.name}
                                  </option>
                                ))}
                              </select>
                              {selectedRegion && (
                                <select
                                  value={selectedCountry}
                                  onChange={(e) =>
                                    setSelectedCountry(e.target.value)
                                  }
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                >
                                  <option value="">Sélectionner un pays</option>
                                  {countries[selectedRegion]?.map((country) => (
                                    <option key={country.id} value={country.id}>
                                      {country.name}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          )}
                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="recipients"
                              value="group"
                              checked={selectedRecipients === "group"}
                              onChange={(e) =>
                                setSelectedRecipients(e.target.value)
                              }
                              className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                            />
                            <span>Par groupe</span>
                          </label>
                          {selectedRecipients === "group" && (
                            <div className="mt-2">
                              <GroupSearchSelect
                                groups={groups}
                                value={selectedGroup}
                                onChange={setSelectedGroup}
                                onSearch={(query) => {
                                  // Ici vous pouvez implémenter la recherche côté serveur si nécessaire
                                  console.log("Recherche:", query);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      {/* Subject with character count */}
                      <div className="relative">
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-16"
                          placeholder="Sujet du message"
                        />
                        <span className="absolute right-2 top-2 text-xs text-gray-400">
                          {subject.length}/100
                        </span>
                      </div>

                      {/* Message editor with improved toolbar */}
                      <div className="border rounded-md">
                        <div className="flex items-center space-x-2 p-2 border-b">
                          <div
                            data-tooltip="Aperçu"
                            data-tooltip-position="top"
                          >
                            <button
                              onClick={() => setShowPreview(!showPreview)}
                              className={`p-1 rounded ${
                                showPreview
                                  ? "bg-amber-100 text-amber-600"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                          <Tooltip
                            title="Variables"
                            html={
                              <button
                                onClick={() =>
                                  setShowVariablesHelp(!showVariablesHelp)
                                }
                                className={`p-1 rounded ${
                                  showVariablesHelp
                                    ? "bg-amber-100 text-amber-600"
                                    : "hover:bg-gray-100"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div
                            className={
                              showPreview ? "col-span-1" : "col-span-2"
                            }
                          >
                            <textarea
                              rows={12}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                              placeholder="Rédigez votre message..."
                            />
                            {/* Variables Helper */}
                            <div className="mt-2 text-sm text-gray-500">
                              <button
                                type="button"
                                onClick={() =>
                                  setShowVariablesHelp(!showVariablesHelp)
                                }
                                className="flex items-center text-amber-600 hover:text-amber-700"
                              >
                                <Plus
                                  className={`h-4 w-4 mr-1 transform transition-transform ${
                                    showVariablesHelp ? "rotate-45" : ""
                                  }`}
                                />
                                Insérer une variable
                              </button>

                              {showVariablesHelp && (
                                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                                  <div className="space-y-3">
                                    {AVAILABLE_VARIABLES.map(
                                      ({
                                        label,
                                        syntax,
                                        example,
                                        description,
                                      }) => (
                                        <div key={syntax} className="group">
                                          <button
                                            onClick={() => {
                                              const textarea =
                                                document.querySelector(
                                                  "textarea"
                                                );
                                              if (textarea) {
                                                const start =
                                                  textarea.selectionStart;
                                                const end =
                                                  textarea.selectionEnd;
                                                const newMessage =
                                                  message.substring(0, start) +
                                                  syntax +
                                                  message.substring(end);
                                                setMessage(newMessage);
                                              }
                                            }}
                                            className="w-full text-left hover:bg-gray-100 p-2 rounded-md"
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="font-medium">
                                                {label}
                                              </span>
                                              <code className="text-xs bg-white px-2 py-1 rounded border">
                                                {syntax}
                                              </code>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1">
                                              {description}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1 italic">
                                              Exemple : {example}
                                            </p>
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Preview Panel */}
                          {showPreview && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="col-span-1 border rounded-md p-4 bg-gray-50"
                            >
                              <h3 className="font-medium mb-2">Aperçu</h3>
                              <div className="prose prose-sm">
                                <h4>{replaceVariables(subject)}</h4>
                                <div className="mb-8">
                                  <div
                                    className="whitespace-pre-wrap"
                                    dangerouslySetInnerHTML={{
                                      __html: makeClickable(
                                        replaceVariables(message)
                                      ),
                                    }}
                                  />
                                </div>
                                {renderSignature()}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-6">
                      {/* Signature Selection */}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-700">
                            Signature
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSignature(null);
                              setShowSignatureModal(true);
                            }}
                            className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Nouvelle signature
                          </button>
                        </div>
                        <select
                          value={selectedSignature}
                          onChange={(e) => setSelectedSignature(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-2"
                        >
                          <option value="">Sans signature</option>
                          {signatures.map((sig) => (
                            <option key={sig.id} value={sig.id}>
                              {sig.name}
                            </option>
                          ))}
                        </select>
                        {selectedSignature && (
                          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <div
                                className="whitespace-pre-wrap font-sans"
                                dangerouslySetInnerHTML={{
                                  __html: makeClickable(
                                    signatures.find(
                                      (s) => s.id === selectedSignature
                                    )?.content || ""
                                  ),
                                }}
                              />
                              <button
                                onClick={() => {
                                  const signature = signatures.find(
                                    (s) => s.id === selectedSignature
                                  );
                                  if (signature) {
                                    setEditingSignature(signature);
                                    setShowSignatureModal(true);
                                  }
                                }}
                                className="ml-2 p-1 text-gray-400 hover:text-amber-600 rounded"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Attachments with drag and drop */}
                      <div className="border-t pt-4">
                        <FileDropzone
                          onDrop={(files) =>
                            setAttachments((prev) => [...prev, ...files])
                          }
                          maxSize={5000000}
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                        />
                        {attachments.length > 0 && (
                          <div className="space-y-2">
                            {attachments.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                              >
                                <span className="text-sm">{file.name}</span>
                                <button
                                  onClick={() =>
                                    setAttachments((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    )
                                  }
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Scheduling with improved UI */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-700">
                            Planification
                          </h3>
                          <button
                            onClick={() =>
                              setScheduledDate(
                                scheduledDate ? null : new Date()
                              )
                            }
                            className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            {scheduledDate
                              ? "Annuler la planification"
                              : "Planifier l'envoi"}
                          </button>
                        </div>
                        {scheduledDate && (
                          <input
                            type="datetime-local"
                            value={scheduledDate.toISOString().slice(0, 16)}
                            onChange={(e) =>
                              setScheduledDate(new Date(e.target.value))
                            }
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                          />
                        )}
                      </div>

                      {/* Final Action Buttons */}
                      {/* <div className="flex items-center justify-between pt-6 border-t">
                        <button
                          onClick={prevStep}
                          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Retour
                        </button>
                        <button
                          onClick={() => setIsSending(true)}
                          disabled={isSending}
                          className="flex items-center px-6 py-2 bg-amber-600 text-white rounded-md"
                        >
                          {isSending ? (
                            <span className="flex items-center">
                              <Loader2 className="animate-spin h-4 w-4 mr-2" />
                              Envoi en cours...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Send className="h-4 w-4 mr-2" />
                              Envoyer
                            </span>
                          )}
                        </button>
                      </div> */}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Retour
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button
                      onClick={nextStep}
                      className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-md ml-auto"
                    >
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSend}
                      disabled={isSending}
                      className="flex items-center px-6 py-2 bg-amber-600 text-white rounded-md ml-auto"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* History Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          showHistoryPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Historique des messages</h2>
            <button
              onClick={() => setShowHistoryPanel(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 border-b">
            <div className="flex space-x-2">
              {(["all", "sent", "scheduled", "failed"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setHistoryFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      historyFilter === filter
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter === "all"
                      ? "Tous"
                      : filter === "sent"
                      ? "Envoyés"
                      : filter === "scheduled"
                      ? "Planifiés"
                      : "Échoués"}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {filteredHistory.map((message) => (
                <div
                  key={message.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{message.subject}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        message.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : message.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {message.status === "sent"
                        ? "Envoyé"
                        : message.status === "scheduled"
                        ? "Planifié"
                        : "Échoué"}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{format(message.date, "PPP à HH:mm", { locale: fr })}</p>
                    <p>{message.recipients} destinataires</p>

                    {message.attachments.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Paperclip className="h-4 w-4" />
                        <span>
                          {message.attachments.length} pièce(s) jointe(s)
                        </span>
                      </div>
                    )}

                    {message.status === "sent" && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-green-50 p-2 rounded">
                          <p className="text-green-800">Taux d'ouverture</p>
                          <p className="text-lg font-semibold">
                            {message.openRate}%
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded">
                          <p className="text-blue-800">Taux de clic</p>
                          <p className="text-lg font-semibold">
                            {message.clickRate}%
                          </p>
                        </div>
                      </div>
                    )}

                    {message.status === "failed" && (
                      <div className="mt-2 bg-red-50 p-2 rounded">
                        <p className="text-red-800">{message.errorDetails}</p>
                        <p className="text-sm">{message.errorCount} échecs</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* History Toggle Button */}
      <button
        onClick={() => setShowHistoryPanel(true)}
        className="fixed bottom-4 right-4 bg-amber-600 text-white rounded-full p-3 shadow-lg hover:bg-amber-700 transition-colors"
      >
        <History className="h-6 w-6" />
      </button>

      {/* Improved Modals with animations */}
      <AnimatePresence>
        {showTemplateModal && (
          <Modal
            title="Créer un nouveau modèle"
            onClose={() => setShowTemplateModal(false)}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold mb-4">
                  Créer un nouveau modèle
                </h2>
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    handleSaveTemplate({
                      name: formData.get("name") as string,
                      subject: formData.get("subject") as string,
                      content: formData.get("content") as string,
                    });
                  }}
                >
                  <div className="space-y-4">
                    <input
                      name="name"
                      placeholder="Nom du modèle"
                      className="w-full border rounded-md p-2"
                    />
                    <input
                      name="subject"
                      placeholder="Sujet"
                      className="w-full border rounded-md p-2"
                    />
                    <textarea
                      name="content"
                      placeholder="Contenu du message"
                      rows={6}
                      className="w-full border rounded-md p-2"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowTemplateModal(false)}
                        className="px-4 py-2 border rounded-md"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 text-white rounded-md"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}

        {showSignatureModal && (
          <Modal
            title={
              editingSignature ? "Modifier la signature" : "Nouvelle signature"
            }
            onClose={() => {
              setShowSignatureModal(false);
              setEditingSignature(null);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-lg font-semibold mb-4">
                  {editingSignature
                    ? "Modifier la signature"
                    : "Nouvelle signature"}
                </h2>
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const signatureData = {
                      name: formData.get("name") as string,
                      content: formData.get("content") as string,
                      isDefault: formData.get("isDefault") === "true",
                    };

                    if (editingSignature) {
                      handleEditSignature(signatureData, editingSignature.id);
                    } else {
                      handleAddSignature(signatureData);
                    }
                  }}
                >
                  <div className="space-y-4">
                    <input
                      name="name"
                      defaultValue={editingSignature?.name}
                      placeholder="Nom de la signature"
                      className="w-full border rounded-md p-2"
                      required
                    />
                    <textarea
                      name="content"
                      defaultValue={editingSignature?.content}
                      placeholder="Contenu de la signature"
                      rows={4}
                      className="w-full border rounded-md p-2"
                      required
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isDefault"
                        defaultChecked={editingSignature?.isDefault}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-600">
                        Définir comme signature par défaut
                      </span>
                    </label>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowSignatureModal(false);
                          setEditingSignature(null);
                        }}
                        className="px-4 py-2 border rounded-md"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-amber-600 text-white rounded-md"
                      >
                        {editingSignature ? "Mettre à jour" : "Enregistrer"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-4 flex flex-col space-y-2 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd>
          <span>pour envoyer</span>
        </div>
        <div className="flex items-center space-x-2">
          <Kbd>Ctrl</Kbd> + <Kbd>P</Kbd>
          <span>pour prévisualiser</span>
        </div>
        <div className="flex items-center space-x-2">
          <Kbd>Esc</Kbd>
          <span>pour fermer</span>
        </div>
      </div>
    </div>
  );
}
