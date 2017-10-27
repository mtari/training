class AddressBook {

	constructor() {
		this.contacts = [];
		this.initialComplete = false;
	}

	getInitialContacts(cb) {
		var _this = this;
		setTimeout(function() {
			_this.initialComplete = true;
			if(cb) {
				return cb();
			}
		}, 3000);
	}

	addContact(contact) {
		this.contacts.push(contact);
	}

	deleteContact(index) {
		this.contacts.splice(index, 1);
	}

	getContact(index) {
		return this.contacts[index];
	}
}