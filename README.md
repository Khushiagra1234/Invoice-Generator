# Invoice Generator with AI Features

**Applicant:** Khushi Tayal  
**Original Repo:** [johnuberbacher/invoice-generator](https://github.com/johnuberbacher/invoice-generator)  
**Edited Repo:** [Khushiagra1234/Invoice-Generator](https://github.com/Khushiagra1234/Invoice-Generator)  

---

## Overview

This is a **web-based invoice generator** built with **React.js**. It allows users to create, preview, and manage invoices dynamically.  

I have enhanced the original project by implementing AI-powered and UX features:

- **Dark Mode Toggle** – Switch between light and dark themes.  
- **AI Notes Generator** – Automatically generates polite invoice notes based on customer, items, and total.  
- **Company Logo Upload** – Upload your company logo to display in invoice preview.  
- **Payment Details** – Add bank, UPI, or other payment instructions for customers.  

---

## Features

1. **Dynamic Invoice Creation** – Add multiple items with quantity, price, and description.  
2. **Theme Support** – Light and Dark mode toggle for enhanced UI experience.  
3. **AI Notes Generation** – Auto-generates professional notes for invoices.  
4. **Logo Upload** – Display your company logo in invoice preview.  
5. **Payment Instructions** – Include custom payment details for customers.  

---

## Key Code Snippets

**Dark Mode Toggle**

```javascript
this.setState({ darkMode: !this.state.darkMode });
AI Notes Generation
const aiResponse = `Thank you ${billTo} for your purchase of ${items.length} items totaling ${currency}${total}. Please make payment by ${dateOfIssue || 'the due date'}.`;
this.setState({ notes: aiResponse });      
```

**Company Logo Upload**


```<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const reader = new FileReader();
    reader.onload = (upload) => this.setState({ logo: upload.target.result });
    reader.readAsDataURL(e.target.files[0]);
  }}
/>
```
**Payment Details Input**

```

 {this.props.info.paymentDetails && (
  <div className="border rounded p-3 mt-3">
    <h6 className="fw-bold mb-2">Bank / Payment Details</h6>
    <Row>
      <Col md={6}>
        <p className="mb-1"><strong>Bank Name:</strong> {this.props.info.paymentDetails.bankName}</p>
        <p className="mb-1"><strong>Account Number:</strong> {this.props.info.paymentDetails.accountNumber}</p>
        <p className="mb-1"><strong>Account Name:</strong> {this.props.info.paymentDetails.accountName}</p>
      </Col>
      <Col md={6}>
        <p className="mb-1"><strong>IFSC:</strong> {this.props.info.paymentDetails.ifscCode}</p>
        <p className="mb-1"><strong>SWIFT:</strong> {this.props.info.paymentDetails.swiftCode}</p>
        <p className="mb-1"><strong>Routing:</strong> {this.props.info.paymentDetails.routingCode}</p>
        <p className="mb-1"><strong>Payable In:</strong> {this.props.info.paymentDetails.country} ({this.props.info.paymentDetails.currency})</p>
      </Col>
    </Row>
  </div>
)}
```


***AI Feature Evaluation***

**1. Dark Mode Toggle**

Shortcomings:

PDF output may not fully reflect the dark mode styling. Currently, html2canvas captures the DOM as-is, but CSS variables or certain Bootstrap classes may not translate perfectly into the rendered PDF.

Some colors (text or background) may appear washed out or inconsistent in the PDF.


Suggested Improvements:

Use a dedicated CSS theme for PDF rendering, separate from the UI theme, ensuring high-fidelity export.

Adjust html2canvas settings (like scale, backgroundColor, or allowTaint) to better capture dark-mode colors.

Optionally, switch to a library like Puppeteer or React-to-PDF, which can render CSS more accurately than html2canvas.

**2. AI Notes Generator**

Shortcomings:

Currently, the notes generation is template-based and static. It cannot handle variations such as different languages, tone, or complex item lists.

No validation for extremely long invoices; notes may become repetitive or truncated.

Cannot dynamically suggest payment terms or handle special cases like discounts or returns.

Suggested Improvements:

Integrate OpenAI API or another NLP service to generate context-aware, human-like invoice notes.

Add options for polite/formal/informal tone or multi-language support.

Validate AI-generated content for length and clarity before inserting into the invoice.

**3. Logo Upload**

Shortcomings:

Image resizing is basic and may distort logos with unusual aspect ratios (e.g., very wide or tall logos).

Logos may appear blurry in the PDF if the resolution is low.

File types are limited to .png and .jpg; other formats (like .svg) are not supported.

Suggested Improvements:

Implement aspect ratio preservation and optional cropping.

Limit maximum and minimum resolution for better PDF clarity.

Consider support for vector logos (SVG) for sharper rendering.

**4. Payment Details**

Shortcomings:

Users manually enter payment instructions, which can be inconsistent (formatting, line breaks, spacing).

The feature does not validate account numbers, UPI IDs, or URLs.

In PDF, long instructions may overflow or wrap incorrectly, affecting invoice layout.

Suggested Improvements:

Implement input validation for common payment methods (bank account, UPI, PayPal).

Use AI to auto-format payment instructions, e.g., line breaks, bolding, or highlighting key info.

Add a preview for overflow handling in the invoice PDF, ensuring the layout stays clean.

***How to Run***

```git clone https://github.com/Khushiagra1234/Invoice-Generator.git
cd Invoice-Generator
npm install
npm start


Open http://localhost:3000 to use the app.
```

***Notes***

All implemented features are fully functional.

AI Notes and Logo Upload integrate seamlessly into the invoice.

Dark Mode ensures improved UI experience for users.

***Screenshots***
