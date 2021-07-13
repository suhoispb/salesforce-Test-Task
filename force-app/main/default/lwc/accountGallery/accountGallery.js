import { LightningElement, wire } from "lwc";
import getAllAccounts from "@salesforce/apex/Accounts.getAllAccounts";
import { publish, MessageContext } from "lightning/messageService";
import AccountMessageChannel from "@salesforce/messageChannel/AccountMessageChannel__c";

class AccountGallery extends LightningElement {
  accounts = [];
  value = "";

  @wire(MessageContext)
  messageContext;

  @wire(getAllAccounts, { type: "$value" })
  wiredSessions({ error, data }) {
    if (error) {
      this.accounts = [];
      throw new Error("Failed to retrieve accounts");
    }
    if (data) {
      this.accounts = data;
    }
  }

  handleSelect(event) {
    publish(this.messageContext, AccountMessageChannel, {
      accountId: event.detail,
    });
  }

  types = [
    { label: "All types", value: "" },
    { label: "Prospect", value: "prospect" },
    { label: "Customer - Direct", value: "direct" },
    { label: "Customer - Channel", value: "channel" },
    { label: "Channel Partner / Reseller", value: "reseller" },
    { label: "Installation Partner", value: "installation" },
    { label: "Technology Partner", value: "technology" },
  ];

  changeType(event) {
    this.value = event.detail.value;
  }
}

export default AccountGallery;
