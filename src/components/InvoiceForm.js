import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '$',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      logo: "", 
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00',
      items: [
        {
          id: 0,
          name: '',
          description: '',
          price: '1.00',
          quantity: 1
        }
      ],
  paymentDetails:{
    bankName: "Bank OF INDIA",
    accountNumber: "1234567890",
    accountName: "KHUSHI",
    swiftCode: "BOIINB1234",
    routingCode: "123456",
    ifscCode: "UTIB0000000",
    currency: "₹",
    country: "India",
  },
};
    this.editField = this.editField.bind(this);
  }

  componentDidMount() {
    this.handleCalculateTotal();
  }

  handleRowDel(items) {
    const index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState({ items: this.state.items });
  }

  handleAddEvent() {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    };
    this.setState({ items: [...this.state.items, newItem] });
  }

  handleCalculateTotal() {
    const { items, taxRate, discountRate } = this.state;
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat(item.price) * parseInt(item.quantity);
    });

    const taxAmmount = (subTotal * (taxRate / 100)) || 0;
    const discountAmmount = (subTotal * (discountRate / 100)) || 0;
    const total = subTotal + taxAmmount - discountAmmount;

    this.setState({
      subTotal: subTotal.toFixed(2),
      taxAmmount: taxAmmount.toFixed(2),
      discountAmmount: discountAmmount.toFixed(2),
      total: total.toFixed(2)
    });
  }

  onItemizedItemEdit(evt) {
    const { id, name, value } = evt.target;
    const newItems = this.state.items.map((item) => {
      if (item.id === id) item[name] = value;
      return item;
    });
    this.setState({ items: newItems }, this.handleCalculateTotal);
  }

  editField(event) {
    this.setState({ [event.target.name]: event.target.value }, this.handleCalculateTotal);
  }

  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  openModal = (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    this.setState({ isOpen: true });
  };

  closeModal = () => this.setState({ isOpen: false });

  // =========================
  // AI Notes Feature
  // =========================
  generateNotes = () => {
    const { billTo, total, items, dateOfIssue, currency } = this.state;
    const prompt = `
      Generate a polite invoice note for a customer.
      Customer: ${billTo}
      Total amount: ${currency}${total}
      Items: ${items.map(i => `${i.quantity} x ${i.name}`).join(', ')}
      Due date: ${dateOfIssue || 'N/A'}
    `;

    // MOCK response for demonstration
    const aiResponse = `Thank you ${billTo} for your purchase of ${items.length} items totaling ${currency}${total}. Please make payment by ${dateOfIssue || 'the due date'}.`;

    this.setState({ notes: aiResponse });
  };
  

  render() {
    return (
      <Form onSubmit={this.openModal}>
        <Row>
          <Col md={8} lg={9}>
          
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              {/* Invoice Header */}
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current Date: </span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold me-2">Due Date:</span>
                    <Form.Control
                      type="date"
                      value={this.state.dateOfIssue}
                      name="dateOfIssue"
                      onChange={this.editField}
                      style={{ maxWidth: '150px' }}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">Invoice Number: </span>
                  <Form.Control
                    type="number"
                    value={this.state.invoiceNumber}
                    name="invoiceNumber"
                    onChange={this.editField}
                    min="1"
                    style={{ maxWidth: '70px' }}
                    required
                  />
                </div>
              </div>

              <hr className="my-4" />
       


              {/* Bill To / Bill From */}
              <div className="mb-3">
  <label className="form-label">Company Logo</label>
  <input 
    type="file" 
    accept="image/*" 
    className="form-control"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (upload) => {
          this.setState({ logo: upload.target.result });
        };
        reader.readAsDataURL(file);
      }
    }}
  />
</div>

              <Row className="mb-5">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder="Who is this invoice to?"
                    value={this.state.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder="Email address"
                    value={this.state.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder="Billing address"
                    value={this.state.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="address"
                    required
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder="Who is this invoice from?"
                    value={this.state.billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder="Email address"
                    value={this.state.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder="Billing address"
                    value={this.state.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    onChange={this.editField}
                    autoComplete="address"
                    required
                  />
                </Col>
              </Row>
              

              {/* Invoice Items */}
              <InvoiceItem
                onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                onRowAdd={this.handleAddEvent.bind(this)}
                onRowDel={this.handleRowDel.bind(this)}
                currency={this.state.currency}
                items={this.state.items}
              />

              {/* Totals */}
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>{this.state.currency}{this.state.subTotal}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>({this.state.discountRate || 0}%) {this.state.currency}{this.state.discountAmmount || 0}</span>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>({this.state.taxRate || 0}%) {this.state.currency}{this.state.taxAmmount || 0}</span>
                  </div>
                  <hr />
                  <div className="d-flex flex-row justify-content-between fw-bold" style={{ fontSize: '1.125rem' }}>
                    <span>Total:</span>
                    <span>{this.state.currency}{this.state.total || 0}</span>
                  </div>
                </Col>
              </Row>

              <hr className="my-4" />

              {/* Notes with AI Button */}
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  placeholder="Thanks for your business!"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.editField}
                  as="textarea"
                  className="my-2"
                  rows={1}
                />
                <Button variant="outline-secondary" className="ms-2" onClick={this.generateNotes}>
                  Generate Notes
                </Button>
              </div>
              

            </Card>
            


          </Col>
          

          {/* Sidebar for Currency / Tax / Discount */}
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
              <InvoiceModal
                showModal={this.state.isOpen}
                closeModal={this.closeModal}
                info={this.state}
                items={this.state.items}
                currency={this.state.currency}
                subTotal={this.state.subTotal}
                taxAmmount={this.state.taxAmmount}
                discountAmmount={this.state.discountAmmount}
                total={this.state.total}
              />

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={event => this.onCurrencyChange({ currency: event.target.value })}
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="$">USD (United States Dollar)</option>
                  <option value="Rs">INR (Indian Rupees)</option>
                  <option value="£">GBP (British Pound Sterling)</option>
                  <option value="¥">JPY (Japanese Yen)</option>
                  <option value="$">CAD (Canadian Dollar)</option>
                  <option value="$">AUD (Australian Dollar)</option>
                  <option value="$">SGD (Signapore Dollar)</option>
                  <option value="¥">CNY (Chinese Renminbi)</option>
                  <option value="₿">BTC (Bitcoin)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={this.state.taxRate}
                    onChange={this.editField}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={this.state.discountRate}
                    onChange={this.editField}
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
<Card className="p-3 my-3">
  <h5 className="fw-bold mb-3">Bank / Payment Details</h5>

  <Form.Group className="mb-2">
    <Form.Label>Bank Name</Form.Label>
    <Form.Control
      value={this.state.paymentDetails.bankName}
      onChange={e => this.setState({ paymentDetails: { ...this.state.paymentDetails, bankName: e.target.value } })}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Account Number</Form.Label>
    <Form.Control
      value={this.state.paymentDetails.accountNumber}
      onChange={e => this.setState({ paymentDetails: { ...this.state.paymentDetails, accountNumber: e.target.value } })}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Account Name</Form.Label>
    <Form.Control
      value={this.state.paymentDetails.accountName}
      onChange={e => this.setState({ paymentDetails: { ...this.state.paymentDetails, accountName: e.target.value } })}
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>IFSC / Swift / Routing Codes</Form.Label>
    <Form.Control
      value={`${this.state.paymentDetails.ifscCode} / ${this.state.paymentDetails.swiftCode} / ${this.state.paymentDetails.routingCode}`}
      readOnly
    />
  </Form.Group>

  <Form.Group className="mb-2">
    <Form.Label>Payable In</Form.Label>
    <Form.Control
      value={`${this.state.paymentDetails.country} (${this.state.paymentDetails.currency})`}
      readOnly
    />
  </Form.Group>
</Card>
            </div>
          </Col>
        </Row>
        
        <InvoiceModal
  showModal={this.state.isOpen}
  closeModal={() => this.setState({ isOpen: false })}
  info={this.state}   // logo, billTo, billFrom, etc.
  items={this.state.items}
  currency={this.state.currency}
  subTotal={this.state.subTotal}
  taxAmmount={this.state.taxAmmount}
  discountAmmount={this.state.discountAmmount}
  total={this.state.total}
/>

      </Form>
    );
  }
}

export default InvoiceForm;
