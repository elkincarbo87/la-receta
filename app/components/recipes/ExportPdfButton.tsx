"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { parseQuantity, formatQuantity } from "@/app/lib/scaling";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface Tag {
  id: string;
  name: string;
}

interface ExportPdfButtonProps {
  recipe: {
    name: string;
    date: Date;
    notes: string | null;
    rating: number | null;
    photos: { id: string; url: string }[];
    ingredients: Ingredient[];
    tags: Tag[];
  };
  scale?: number;
}

export function ExportPdfButton({ recipe, scale = 1 }: ExportPdfButtonProps) {
  function generatePdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = margin;

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(recipe.name, pageWidth / 2, y, { align: "center" });
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const dateStr = recipe.date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(dateStr, pageWidth / 2, y, { align: "center" });
    y += 6;

    if (recipe.rating != null) {
      const stars = "★".repeat(recipe.rating) + "☆".repeat(5 - recipe.rating);
      doc.setFontSize(12);
      doc.text(stars, pageWidth / 2, y, { align: "center" });
      y += 8;
    }

    if (recipe.tags.length > 0) {
      doc.setFontSize(10);
      const tagStr = recipe.tags.map((t) => t.name).join(" · ");
      doc.text(tagStr, pageWidth / 2, y, { align: "center" });
      y += 8;
    }

    const firstPhoto = recipe.photos[0]?.url;
    if (firstPhoto) {
      try {
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = 60;
        doc.addImage(firstPhoto, "JPEG", margin, y, imgWidth, imgHeight);
        y += imgHeight + 8;
      } catch {
        // Skip image if it fails to load
      }
    }

    const tableData = recipe.ingredients.map((ing) => {
      const base = parseQuantity(ing.quantity);
      const scaled = base != null ? base * scale : null;
      const qty =
        scaled != null ? `${formatQuantity(scaled)} ${ing.unit}` : `${ing.quantity} ${ing.unit}`;
      const original =
        scale !== 1 && scaled != null ? `${ing.quantity} ${ing.unit}` : "";
      return [ing.name, qty, original];
    });

    const showOriginal = scale !== 1;

    autoTable(doc, {
      startY: y,
      head: showOriginal
        ? [["Ingrediente", "Cantidad escalada", "Original"]]
        : [["Ingrediente", "Cantidad"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [63, 63, 63] },
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { left: margin, right: margin },
    });

    const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 20;
    y = finalY + 8;

    if (recipe.notes) {
      if (y > 250) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Notas / Método", margin, y);
      y += 6;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitNotes = doc.splitTextToSize(recipe.notes, pageWidth - margin * 2);
      doc.text(splitNotes, margin, y);
    }

    const safeName = recipe.name.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s-]/g, "");
    doc.save(`${safeName}.pdf`);
  }

  return (
    <Button variant="outline" onClick={generatePdf}>
      <FileDown className="h-4 w-4 mr-2" />
      Exportar PDF
    </Button>
  );
}
