import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  header = 'Contacts';
  description = 'Manage your contact list';
  numberOfContacts = 0;
  counterStyleColor = 'green';
  counterClass = 'warning';
  formHidden = false;
  workStatuses: Option[];
  public contact: Contact;
  public contacts: Contact[];

  constructor() {}

  ngOnInit(): void {
    this.workStatuses = [
      { id: 0, description: 'unknow' },
      { id: 1, description: 'student' },
      { id: 2, description: 'unemployed' },
      { id: 3, description: 'employed' },
    ];
    this.contact = {
      name: '',
      isVIP: false,
      gender: '',
      workStatus: 0,
      company: '',
      education: '',
    };
    this.contacts = [];
  }

  saveContact() {
    this.contacts.push({ ...this.contact });
    this.updateCounter();
  }
  deleteContact(contact: Contact) {
    this.contacts = this.contacts.filter(c => c.name !== contact.name);
    this.updateCounter();
  }

  private updateCounter() {
    this.numberOfContacts = this.contacts.length;
    this.counterClass = this.numberOfContacts === 0 ? 'warning' : 'success';
  }
}

export interface Option {
  id: number;
  description: string;
}

export interface Contact {
  name: string;
  isVIP: boolean;
  gender: string;
  workStatus: number | string;
  company: string;
  education: string;
}
