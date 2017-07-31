/**
  @class LocalStorageDB
  @desc  provides a robust storage interface offline on localStorage
*/
class LocalStorageDB {
  /**
   * @method constructor
   * @param {String} key
   * @desc constructor to create the storage item
   */
  constructor(key) {
    if (!key) {
      throw new Error('No parameter key passed to constructor. Expected String but got undefined');
    }
    this.STORE_KEY = key;
    this.store = window.localStorage;
    const isStorageCreated = this.store.getItem(this.STORE_KEY);
    if (!isStorageCreated) {
      this.store.setItem(this.STORE_KEY, JSON.stringify({}));
    }
  }

  /**
   * @method create
   * @param {String} key
   * @param {Object} data
   * @desc allows you to save data to a particular which is the key
   */
  create(key, data) {
    const storeData = this.get();
    const existingData = storeData[key];
    if (existingData && existingData instanceof Array) {
      existingData.push(data);
      Object.assign(storeData[key], existingData);
    } else if (existingData && !(existingData instanceof Array)) {
      storeData[key] = [existingData];
      storeData[key].push(data);
      this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
    } else {
      const newData = {};
      newData[key] = data;
      Object.assign(storeData, newData);
    }
    this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
  }

  /**
   * @method get
   * @param {String} key
   * @param {Number} pos
   * @return {Object} a result set matching the request
   */
  get(key = null, pos = null) {
    const storeData = JSON.parse(this.store.getItem(this.STORE_KEY));
    if (!pos && !key) {
      return storeData;
    } else if (key && !pos) {
      return storeData[key];
    }
    return storeData[key][pos];
  }

  /**
   * @method update
   * @param {Object} update
   * @param {Object} key
   * @param {Number} pos
   */
  update(update, key, pos = null) {
    const storeData = this.get();
    if (!pos) {
      storeData[key] = update;
    } else {
      storeData[key][pos] = update;
    }
    this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
  }

  /**
   * @method remove
   * @param {Object} key
   * @param {Number} pos
   * @return {Boolean} return true when item is successfully removed
   */
  remove(key, pos = null) {
    const storeData = this.get();
    if (!pos) {
      delete storeData[key];
    } else if (storeData[key] instanceof Array) {
      storeData[key].splice(pos, 1);
    } else {
      delete storeData[key][pos];
    }
    this.store.setItem(this.STORE_KEY, JSON.stringify(storeData));
    return true;
  }
}

window.LocalStorageDB = LocalStorageDB;
export default LocalStorageDB;
