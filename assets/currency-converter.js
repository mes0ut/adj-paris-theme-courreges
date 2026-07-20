class CurrencyConverter extends HTMLElement {
  constructor() {
    super();
    this.currencyMessages = this.querySelectorAll('[data-currency-text]');
    if(this.currencyMessages.length < 1) return;

    this.currencyMessages.forEach(msg => this.updateCurrency(msg));
  }

  updateCurrency(msg) {
    const text = msg.textContent;
    const currencyRate = Number(Shopify.currency.rate);
    const leftBracketIndex = text.indexOf('{');
    const rightBracketIndex = text.indexOf('}');
    const extractedString = text.substring(leftBracketIndex, rightBracketIndex + 1);
    const extractedNumber = Number(text.substring(leftBracketIndex + 1, rightBracketIndex));
    const updatedAmount = Math.ceil(extractedNumber * currencyRate).toFixed(2);
    msg.textContent = text.replace(extractedString, msg.getAttribute('data-currency-symbol') + updatedAmount)
  }
}

customElements.define('currency-converter', CurrencyConverter);

