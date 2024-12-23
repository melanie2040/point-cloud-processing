import { jsPDF } from "jspdf";

export const generate = (formData) => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Quotation Calculation Summary", 20, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 1: Basics", 20, 30);

    // List styling with bullet points
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, 40);
    doc.text(`Contact: +${formData.countryCode} ${formData.contact}`, 20, 50);
    doc.text(`Email: ${formData.email}`, 20, 60);
    doc.text(`Country: ${formData.country}`, 20, 70);
    doc.text(`Company: ${formData.industry}, ${formData.companyName}`, 20, 80);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 2: Specifications", 20, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`I need my 3D scan for ${formData.qn1}`, 20, 100);
    doc.text(`I need to scan ${formData.qn2}`, 20, 110);
    doc.text(`File format for export: ${formData.qn3}`, 20, 120);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 3: Site", 20, 130);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`My site needs ${formData.qn4}`, 20, 140);
    doc.text(`Site address: ${formData.countryTwo}, ${formData.state}, ${formData.city}, ${formData.street}, ${formData.unit}, ${formData.postalCode}`, 20, 150);
    doc.text(`Will we have any access ${formData.qn6}`, 20, 160);
    doc.text(`Do you require our scanners ${formData.qn7}`, 20, 170);
    doc.text(`Will our team need PPE gear ${formData.qn8}`, 20, 180);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 3: Quotation", 20, 190);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Dimensions: ${formData.width}, ${formData.length}, ${formData.height}`, 20, 200);
    doc.text(`Volume: ${formData.volume} cubic metres`, 20, 210);
    doc.text(`Quotation: USD ${formData.quote}`, 20, 220);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Section 4: Imagery", 20, 230);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const date = new Date(formData.calendar);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',  // "Sat"
        year: 'numeric',   // "2025"
        month: 'short',    // "Jan"
        day: 'numeric'     // "4"
    });
    doc.text(`Scanning Date: ${formattedDate}`, 20, 240)

    // Function to add a single image to the PDF (added inside the callback)
    function addImageToPDF(image) {
        const imageURL = URL.createObjectURL(image);
        return imageURL;
    }

    // Assuming you have an array of images, like form.photos
    doc.addPage();
    let yPosition = 30; // Starting Y position for images
    doc.text(`Site Images: `, 20, 20)
    console.log('one file', formData.photos[1]);
    for (const photo of formData.photos) {
        const url = addImageToPDF(photo);
        doc.addImage(url, 'JPEG', 20, yPosition, 50, 30);
        yPosition += 40;
    }

    doc.text(`Floor Plan: `, 20, yPosition);
    yPosition += 10;
    for (const photo of formData.floorPlan) {
        const url = addImageToPDF(photo);
        doc.addImage(url, 'JPEG', 20, yPosition, 50, 30);
        yPosition += 40;
    };

    return doc;
};