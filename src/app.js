import { inject } from "aurelia-framework";
import { MdToastService, MdModal } from "aurelia-materialize-bridge";

@inject(MdToastService)
export class App {
  selectedDate = null;
  modal;
  activePage = 1;

  textValue = "";
  disabledValue = false;

  constructor(toast) {
    this.toast = toast;
    this.message = 'Hello World!';
  }

  agree(e) {
    this.toast.show("You agreed!", 4000);
  }

  disagree(e) {
    this.toast.show("You disagreed!", 4000);
  }

  openModal() {
    this.modal.open();
  }

  setDate() {
    let date = new Date();
    this.selectedDate = date;
  }

  
  setText() {
    this.textValue = "something";
  }
  setDisabled() {
    this.disabledValue = !this.disabledValue;
  }

  setToFive() {		
    this.activePage = 5;		
  }
}

// tslint:disable-next-line:max-classes-per-file
export class StringifyValueConverter {
  toView(value) {
    return JSON.stringify(value);
  }
}