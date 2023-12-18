import formatCurrency from "../formatCurrency";
async function addReceiptInformation(docFile, receipt, photos) {

    const receiptData = {
        companyName: "SPIT AB / myimages.se",
        organizationNumber: 5569158503,
        saleDateTime: new Date().toLocaleString(),
        receiptId: receipt[0].id,
        receiptIndex: receipt[0].index,
        images: photos,      
        cost: receipt[0].price,
        vat: "Swedish VAT (25%) is included in sale price within purchase in Sweden."                             
      };

      
      const blueColor = '#005b96';
      const lightGrey = '#f2f2f2';
      
      // Draw a header rectangle
      docFile.rect(0, 0, docFile.page.width, 100)
         .fill(lightGrey);
      
      // Header Text
      docFile.fontSize(25)
         .fillColor(blueColor)
         .text(`Receipt`, { align: 'center' });
      
      // Reset fill color for the rest of the text
      docFile.fillColor('black');
      
      // Add a line after the header
      docFile.moveTo(0, 100)
         .lineTo(docFile.page.width, 100)
         .stroke();
      
      // Add some padding for the content
      const contentStartY = 120;
      const lineHeight = 20;
      let currentY = contentStartY;
      
      // Company Name
      docFile.fontSize(16)
         .text(`Company: ${receiptData.companyName}`, 50, currentY)
         .moveDown();
      
      currentY += lineHeight;
      
      // Organization Number
      docFile.fontSize(16)
         .text(`Organization number: ${receiptData.organizationNumber}`, 50, currentY)
         .moveDown();
      
      currentY += lineHeight;
      
      // Date and Time
      docFile.fontSize(14)
         .text(`Date & Time: ${receiptData.saleDateTime}`, 50, currentY)
         .moveDown();
      
      currentY += lineHeight;
      
      // Receipt ID
      docFile.fontSize(14)
         .text(`Receipt ID: ${receiptData.receiptId}`, 50, currentY)
         .moveDown();
      
      currentY += lineHeight;
      
      // Receipt Number
      docFile.fontSize(14)
         .text(`Receipt Number: ${receiptData.receiptIndex}`, 50, currentY)
         .moveDown();
      
      currentY += lineHeight;
    // ...
  
  // Cost
  docFile.fontSize(14)
  .text(`Cost: ${formatCurrency(receiptData.cost)}`, 50, currentY)
  .moveDown();

  currentY += lineHeight;


  docFile.fontSize(14)
  .text(`Vat: ${receiptData.vat}`, 50, currentY)
  .moveDown();
  
  currentY += lineHeight;
  
  // Draw a line before the list
  docFile.moveTo(0, currentY).lineTo(docFile.page.width, currentY).dash(5, {space: 10}).stroke().undash();
  
  // Move currentY below the line
  currentY += 10; 
  
  // Item details
  const imageList = receiptData.images.map(image =>
   `Image ID: ${image.id} - Pricegroup: ${image.size} - Price: ${formatCurrency(image.price)}`

  );
  
  // Set the font size for the list
  docFile.fontSize(14);
  
  // Check if there's enough space for the list
  const listHeight = imageList.length * (14 + 4); // 14 for font size, 4 for line gap
  const spaceAvailable = docFile.page.height - currentY - 30; // 30 for footer space
  
  // If not enough space, add a new page
  if (listHeight > spaceAvailable) {
   docFile.addPage();
   currentY = 50; // Reset currentY for the new page
  }
  
  // Create a list with the image data
  docFile.list(imageList, {
   bulletRadius: 2,
   indent: 20,
   lineGap: 4,
   start: currentY
  });
  
  
  const footerYPosition = docFile.y;
  docFile.moveTo(0, footerYPosition).lineTo(docFile.page.width, footerYPosition).stroke();
  
  // Check if there's enough space for the contact information
  const contactInfoHeight = 20; // adjust as needed
  if (footerYPosition + contactInfoHeight > docFile.page.height - 30) {
      docFile.addPage();
  }
  
  // Add contact information below the footer line
  const contactInfo = "Contact us at support@myimages.se"
  docFile.fontSize(12)
     .text(contactInfo, docFile.x, docFile.y + 10, {
         align: 'center',
         valign: 'bottom'
     });
  
// ... Add more content to the PDF ...


    return docFile
}


module.exports = addReceiptInformation;
