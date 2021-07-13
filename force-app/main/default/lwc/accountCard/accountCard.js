import { LightningElement, api } from "lwc";

class AccountCard extends LightningElement {
  @api account = {
    AccountImage: "",
    Name: "",
    Owner: "",
    Budget: "",
    Employees: "",
    Type: "",
    Id: "",
  };

  setDetails() {
    const e = new CustomEvent("select", { detail: this.account.Id });
    this.dispatchEvent(e);
  }
}

export default AccountCard;
