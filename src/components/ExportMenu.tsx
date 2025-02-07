import React from 'react';
import { FileText, Download, Printer, Share2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface ExportMenuProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  title: string;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ isOpen, onClose, data, title }) => {
  const handleExportPDF = async (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la redirection
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text(title, 20, 20);
      
      let y = 40;
      data.forEach((item: any) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        const line = Object.entries(item)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ');
        doc.setFontSize(10);
        doc.text(line, 20, y);
        y += 10;
      });

      doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
    }
    onClose();
  };

  const handleExportExcel = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la redirection
    try {
      // Formater les données pour Excel
      const formattedData = data.map((item: any) => {
        const row: any = {};
        Object.entries(item).forEach(([key, value]) => {
          row[key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')] = value;
        });
        return row;
      });

      const ws = XLSX.utils.json_to_sheet(formattedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Données");
      
      // Ajuster la largeur des colonnes
      const colWidths = Object.keys(formattedData[0] || {}).map(key => ({
        wch: Math.max(key.length, 15)
      }));
      ws['!cols'] = colWidths;

      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const fileData = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      saveAs(fileData, `${title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
    }
    onClose();
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la redirection
    
    // Créer un élément temporaire pour l'impression
    const printContainer = document.createElement('div');
    printContainer.style.display = 'none';
    document.body.appendChild(printContainer);
    
    printContainer.innerHTML = `
      <div style="padding: 20px;">
        <h1 style="font-size: 20px; margin-bottom: 20px;">${title}</h1>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.length > 0 ? `
            <tr>${Object.keys(data[0]).map(key => 
              `<th style="border: 1px solid #ddd; padding: 8px; text-align: left; background: #f5f5f5;">
                ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
              </th>`
            ).join('')}</tr>
          ` : ''}
          ${data.map(row => 
            `<tr>${Object.values(row).map(value => 
              `<td style="border: 1px solid #ddd; padding: 8px;">
                ${value}
              </td>`
            ).join('')}</tr>`
          ).join('')}
        </table>
      </div>
    `;

    window.print();
    document.body.removeChild(printContainer);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
      <button
        type="button" // Ajouter type="button" pour éviter la soumission de formulaire
        onClick={handleExportPDF}
        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <FileText className="h-4 w-4 mr-2" />
        Exporter en PDF
      </button>
      <button
        type="button"
        onClick={handleExportExcel}
        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <Download className="h-4 w-4 mr-2" />
        Exporter en Excel
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <Printer className="h-4 w-4 mr-2" />
        Imprimer
      </button>
    </div>
  );
};
