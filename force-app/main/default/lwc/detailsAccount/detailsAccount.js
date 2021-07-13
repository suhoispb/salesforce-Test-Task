import { LightningElement, wire } from "lwc";
import { subscribe, MessageContext } from "lightning/messageService";
import AccountMessageChannel from "@salesforce/messageChannel/AccountMessageChannel__c";
import getAccountById from "@salesforce/apex/Accounts.getAccountById";
import { NavigationMixin } from "lightning/navigation";

class DetailsAccount extends NavigationMixin(LightningElement) {
  accId = "";
  account = null;
  url;

  @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      AccountMessageChannel,
      (message) => this.handleMessage(message)
    );
  }

  handleMessage({ accountId }) {
    this.accId = accountId;
    this.accountHomePageRef = {
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Account",
        actionName: "view",
        recordId: this.accId,
      }
    };
    this[NavigationMixin.GenerateUrl](this.accountHomePageRef).then((url) => {
      this.url = url;
    });
  }

  @wire(getAccountById, { id: "$accId" })
  wiredSessions({ error, data }) {
    if (error) {
      this.account = null;
    }
    if (data) {
      this.account = data;
    }
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
  }
}
export default DetailsAccount;
