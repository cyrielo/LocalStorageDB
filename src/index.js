class LocalStorageDB {
	constructor(key) {
		this.STORE_KEY = key;
		this.store = window.localStorage;
		const isStorageCreated = this.store.getItem(this.STORE_KEY);
		if(!isStorageCreated) {
			this.store.setItem(this.STORE_KEY, JSON.stringify({}));
		}
	}

	create(key, data) {
		const storeData = this.get();
		const existingData = storeData[key];
		if(existingData && existingData instanceof Array) {
			existingData.push(data);
			Object.assign(storeData[key], existingData);
		} 
		else if(existingData && !(existingData instanceof Array)) {
			storeData[key] = [existingData];
			storeData[key].push(data);
			this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
		}
		else {
			const newData = {};
			newData[key] = data;
			Object.assign(storeData, newData);
		}
		this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
	}

	get(key = null, pos = null) {
		const storeData = JSON.parse(this.store.getItem(this.STORE_KEY));
		if(!pos && !key) {
			return storeData
		}
		else if(key && !pos) {
			return storeData[key];
		}
		return storeData[key][pos];
	}

	update(update, key, pos = null) {
		const storeData = this.get();
		if(!pos) {
			storeData[key] = update;
		} 
		else {
			storeData[key][pos] = update;
		}
		this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
	}

	delete(key, pos = null) {
		const storeData = this.get();
		if(!pos) {
			delete storeData[key];
		}
		else {
			if(storeData[key] instanceof Array) {
				storeData[key].splice(pos, 1);
			} else {
				delete storeData[key][pos];
			}
		}
		this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
		return true;
	}
}

export default LocalStorageDB;
