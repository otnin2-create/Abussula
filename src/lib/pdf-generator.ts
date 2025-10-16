import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FullReport, DISCProfile, MultipleIntelligences } from './types';

export async function generatePDFReport(
  childName: string,
  age: number,
  discProfile: DISCProfile,
  multipleIntelligences: MultipleIntelligences,
  report: FullReport
): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Função para adicionar nova página se necessário
  const checkPageBreak = (neededHeight: number) => {
    if (yPosition + neededHeight > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  // Cabeçalho
  pdf.setFontSize(24);
  pdf.setTextColor(74, 144, 226);
  pdf.text('A Bússola Kids', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setTextColor(100, 100, 100);
  pdf.text('O manual para o coração do teu pequeno', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 20;

  // Informações da criança
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Relatório de ${childName} (${age} anos)`, 20, yPosition);
  yPosition += 15;

  // Perfil DISC
  checkPageBreak(30);
  pdf.setFontSize(16);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Perfil Comportamental (DISC)', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Perfil: ${discProfile.combinationName} (${discProfile.primary}/${discProfile.secondary})`, 20, yPosition);
  yPosition += 8;

  // Scores DISC
  Object.entries(discProfile.scores).forEach(([key, value]) => {
    pdf.text(`${key}: ${value}%`, 20, yPosition);
    yPosition += 6;
  });
  yPosition += 10;

  // Visão de Mundo e Superpoder
  checkPageBreak(25);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('A Lente da Criança', 20, yPosition);
  yPosition += 8;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Visão de Mundo: ${report.worldView}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Superpoder: ${report.superpower}`, 20, yPosition);
  yPosition += 15;

  // Múltiplas Inteligências
  checkPageBreak(40);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Múltiplas Inteligências - Top 3', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  multipleIntelligences.ranking.slice(0, 3).forEach((intelligence, index) => {
    pdf.text(`${index + 1}. ${intelligence.name} (${intelligence.score} pontos)`, 20, yPosition);
    yPosition += 6;
  });
  yPosition += 15;

  // Mapa Emocional
  checkPageBreak(35);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Mapa Emocional', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Como lidar com emoções intensas:', 20, yPosition);
  yPosition += 6;
  pdf.text(report.emotionalMap.intensiveEmotions, 25, yPosition);
  yPosition += 10;

  pdf.text('Sinais de sobrecarga:', 20, yPosition);
  yPosition += 6;
  report.emotionalMap.overloadSigns.forEach(sign => {
    pdf.text(`• ${sign}`, 25, yPosition);
    yPosition += 5;
  });
  yPosition += 10;

  // Estratégias de Vínculo
  checkPageBreak(30);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Como Fortalecer o Vínculo', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Linguagem do Amor: ${report.bondStrengthening.loveLanguage}`, 20, yPosition);
  yPosition += 8;

  pdf.text('Rituais de Conexão:', 20, yPosition);
  yPosition += 6;
  report.bondStrengthening.connectionRituals.forEach(ritual => {
    pdf.text(`• ${ritual}`, 25, yPosition);
    yPosition += 5;
  });
  yPosition += 15;

  // Micro-Scripts
  checkPageBreak(40);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Micro-Scripts para Desafios', 20, yPosition);
  yPosition += 10;

  // Scenario 1
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${report.microScripts.scenario1.title}:`, 20, yPosition);
  yPosition += 6;
  pdf.setTextColor(220, 53, 69);
  pdf.text(`❌ Evitar: ${report.microScripts.scenario1.trap}`, 25, yPosition);
  yPosition += 6;
  pdf.setTextColor(40, 167, 69);
  pdf.text(`✅ Dizer: ${report.microScripts.scenario1.script}`, 25, yPosition);
  yPosition += 10;

  // Scenario 2
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${report.microScripts.scenario2.title}:`, 20, yPosition);
  yPosition += 6;
  pdf.setTextColor(220, 53, 69);
  pdf.text(`❌ Evitar: ${report.microScripts.scenario2.trap}`, 25, yPosition);
  yPosition += 6;
  pdf.setTextColor(40, 167, 69);
  pdf.text(`✅ Dizer: ${report.microScripts.scenario2.script}`, 25, yPosition);
  yPosition += 15;

  // Atividades
  checkPageBreak(50);
  pdf.setFontSize(14);
  pdf.setTextColor(74, 144, 226);
  pdf.text('Plano de Atividades Personalizadas', 20, yPosition);
  yPosition += 10;

  report.activities.slice(0, 4).forEach((activity, index) => {
    checkPageBreak(25);
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${index + 1}. ${activity.title}`, 20, yPosition);
    yPosition += 6;
    pdf.text(`Desenvolve: ${activity.competency}`, 25, yPosition);
    yPosition += 6;
    pdf.text(`Contexto: ${activity.context}`, 25, yPosition);
    yPosition += 10;
  });

  // Rodapé
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Desenvolvido por Otnitech - Desenvolvimento Humano', pageWidth / 2, pageHeight - 10, { align: 'center' });
  pdf.text('@otninascimento', pageWidth / 2, pageHeight - 5, { align: 'center' });

  return pdf.output('blob');
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}