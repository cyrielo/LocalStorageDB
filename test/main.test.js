import chai from 'chai';
import LocalStorageDB from '../src';

const expect = chai.expect;
let store = new LocalStorageDB('documents');

const users = [{
		"name":"John Doe",
		"email": "john@doe.com"
	},
	{
		"name": "Jane Doe",
		"email": "jane@doe.com"
	}
];

after(() => {
	window.localStorage.clear();
});

describe('Creating data', () => {
	it('should ensure a localStorage item was created after instantiation',() => {
		expect(window.localStorage.getItem('documents')).to.be.a('string');
	});

	it('should be able to save an array of items at once', () => {
		store.create('users', users);
		let items = JSON.parse(window.localStorage.getItem('documents'))['users'];
		expect(items).to.have.lengthOf(2);
	});

	it('should be able to append a single object to existing collection', () => {
		store.create('users', { "name": "Mary Doe", "email": "may@doe.com" });
		let items = JSON.parse(window.localStorage.getItem('documents'))['users'];
		expect(items).to.have.lengthOf(3);
	});

	it('should generate a new collection for items with the same keys', () => {
		store.create('admin', {'name': 'admin', "email":'admin@system.com'});
		store.create('admin', {'name': 'super..admin', "email":'super.admin@system.com'});
		let adminItems = JSON.parse(window.localStorage.getItem('documents'))['admin'];
		expect(adminItems).to.be.an.instanceof(Array);
		expect(adminItems).to.have.lengthOf(2);
	});

});

describe('Reading data', () => {
	it('should be able to get specifc data', () => {
		expect(store.get('users')).to.have.lengthOf(3);
	});

	it('should be able to get specific item from a collection', () => {
		expect(store.get('users', 1)).to.deep.equal(users[1]);
	});

	it('should be able to fetch all items in the store', () => {
		expect(store.get()).to.have.property('users');
		expect(store.get()).to.have.property('admin');
	});

});

describe('Updating data', () => {
	it('should be able to update specific data in a collection', () => {
		let newAdminUser = {"name": "the-super-admin", "email": "super-admin@system.com"};
		store.update(newAdminUser, "admin", 1)
		expect(store.get('admin', 1)).to.deep.equal(newAdminUser);
	});

	it('should be able to overwrite data with new update', () => {
		let newAdminUser = {"name": "the-super-admin", "email": "super-admin@system.com"};
		store.update(newAdminUser, 'admin' );
		expect(store.get('admin')).to.be.an('object');
	});
});

describe('Deleting data', () => {
	it('should be able to delete an entire block', () => {
		store.delete('admin');
		expect(store.get('admin')).to.be.undefined;
	});

	it('should be able to delete specific items from a collection', () => {
		store.delete('users', 1);
		expect(store.get('users')).to.have.lengthOf(2);
		store.delete('users', 1);
		expect(store.get('users')).to.have.lengthOf(1);
	});
});


