import jsPDF from "jspdf";

export const generateMaintenancePDF = (month, year, months, total, comment) => {
  const doc = new jsPDF();

 
  const logoPath = "/logo.jpg";

  const img = new Image();
  img.src = logoPath;

  img.onload = () => {
    doc.addImage(img, "JPEG", 15, 10, 40, 20);

    doc.setFontSize(16);
    doc.text("Maintenance Receipt", 70, 20);

    doc.setFontSize(12);
    doc.text(`Month: ${month}`, 20, 50);
    doc.text(`Year: ${year}`, 20, 60);
    doc.text(`Number of Months: ${months}`, 20, 70);
    doc.text(`Total Amount: ₹${total}`, 20, 80);
    doc.text(`Comment: ${comment}`, 20, 90);

    doc.save(`Maintenance_${month}_${year}.pdf`);
  };
};
