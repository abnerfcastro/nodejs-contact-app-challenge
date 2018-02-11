
const StorageService = require('./storage-service');

const ContactDAO = {
    data: null,
    lastId: 0,
    load: async function() {
        try {
            this.data = await StorageService.load();
            this.lastId = this.data[this.data.length - 1].id;
        } catch (error) {
            throw error;
        }
    },
    reload: function() {
        return this.load();
    },
    add: function(contact) {
        this.lastId++;
        const newContact = Object.assign({ id: this.lastId }, contact);        
        this.data.push(newContact);
        StorageService.save(this.data);
    },
    all: function() {
        if (!this.data)
            this.load();            
        return Array.from(this.data);
    }
};

module.exports = ContactDAO;