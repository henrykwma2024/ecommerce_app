import { Controller } from "@hotwired/stimulus"
import { post } from "@rails/request.js"


// Connects to data-controller="strip-checkout"
export default class extends Controller {
  static values = { url: String }
  async connect() {
    const publicKey = document.querySelector("meta[name='stripe-public-key']").content
    const stripe = Stripe(publicKey);
    
    const fetchClientSecret = async () => {
      const response = await post(this.urlValue)
      const { clientSecret } = await response.json;
      return clientSecret;
    };
  
    const checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret,
    });
  
    // Mount Checkout
    checkout.mount(this.element);
  }
}
