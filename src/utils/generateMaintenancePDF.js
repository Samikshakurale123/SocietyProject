import jsPDF from "jspdf";

export const generateMaintenancePDF = (month, year, months, total) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // ===== PDF META =====
  doc.setProperties({
    title: "Maintenance Receipt",
    subject: "Society Maintenance Payment",
    author: "Society Management",
    creator: "Society App",
  });

  // ===== HEADER =====
  doc.setFillColor(40, 40, 40);
  doc.rect(0, 0, 210, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("SOCIETY MAINTENANCE RECEIPT", 105, 16, { align: "center" });

  // ===== BODY =====
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  const startY = 50;
  const gap = 12;

  const rows = [
    ["Month", month],
    ["Year", year],
    ["Number of Months", months],
    ["Monthly Charge", "₹ 2200"],
    ["Total Amount Paid", `₹ ${total}`],
    ["Payment Status", "PAID"],
  ];

  rows.forEach((row, i) => {
    doc.text(`${row[0]} :`, 30, startY + i * gap);
    doc.text(`${row[1]}`, 120, startY + i * gap);
  });

  // ===== FOOTER =====
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    "This is a system-generated receipt and does not require a signature.",
    105,
    260,
    { align: "center" }
  );

  // Border (makes editing harder)
  doc.rect(15, 35, 180, 200);

  // SAVE PDF
  doc.save(`Maintenance_Receipt_${month}_${year}.pdf`);
};