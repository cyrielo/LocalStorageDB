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


describe('It should be able to create a datastore', () => {
	it('should ensure a localStorage item was created after instantiation',() => {
		expect(window.localStorage.getItem('documents')).to.be.a('string');
	});

	it('should be able to save items', () => {
		store.create('users', users);
		store.create('users', { "name": "Mary Doe", "email": "may@doe.com" });
		store.create('admin', {'name': 'admin', "email":'admin@system.com'});
		store.create('admin', {'name': 'super..admin', "email":'super.admin@system.com'});
		let items = JSON.parse(window.localStorage.getItem('documents'))['users'];
		let adminItems = JSON.parse(window.localStorage.getItem('documents'))['admin'];

		expect(items).to.have.lengthOf(3);
		expect(items[0].name).to.equal(users[0].name);
		expect(adminItems).to.have.lengthOf(2);

	});


	it('should be able to get specifc data', () => {
		expect(store.get('users')).to.have.lengthOf(3);
		expect(store.get('users', 1)).to.deep.equal(users[1]);
		expect(store.get()).to.have.property('users');
		expect(store.get()).to.have.property('admin');
	});

	it('should be able to update existing data', () => {
		let newAdminUser = {"name": "the-super-admin", "email": "super-admin@system.com"};
		store.update(newAdminUser, "admin", 1)
		expect(store.get('admin', 1)).to.deep.equal(newAdminUser);
		store.update(newAdminUser, 'admin' );
		expect(store.get('admin')).to.be.an('object');
	});

	it('should be able to delete an item', () => {
		store.delete('admin');
		expect(store.get('admin')).to.be.undefined;
		store.delete('users', 1);
		expect(store.get('users')).to.have.lengthOf(2);
		store.delete('users', 1);
		expect(store.get('users')).to.have.lengthOf(1);

	});

});


