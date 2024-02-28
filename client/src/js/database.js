import { openDB } from 'idb';

// Initializes the database or opens a connection if it already exists.
const initdb = async () =>
    openDB('jate', 1, {
        // Database upgrade callback, executed if the database is being created or version is being upgraded.
        upgrade(db) {
            // Checks if the 'jate' object store already exists.
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            // Creates a new object store named 'jate' with 'id' as the key and auto-increment enabled.
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });

            console.log('jate database created');
        },
    });

// Method to add or update content in the database.
export const putDb = async (content) => {
    console.log('PUT to the database');

    const jateDb = await openDB('jate', 1);
    const transaction = jateDb.transaction('jate', 'readwrite'); // Starts a read-write transaction.
    const store = transaction.objectStore('jate'); // Accesses the 'jate' object store.
    const request = store.put({ id: 1, value: content }); // Attempts to add or update the content in the store.
    const result = await request; 

    console.log('🚀 - data saved to the database', result);
};

// Method to retrieve content from the database.
export const getDb = async () => {
    console.log('GET from the database');

    const jateDb = await openDB('jate', 1);
    const transaction = jateDb.transaction('jate', 'readonly'); // Starts a read-only transaction.
    const store = transaction.objectStore('jate'); // Accesses the 'jate' object store.
    const request = store.get(1); // Attempts to retrieve the content with id 1.
    const result = await request;

    console.log('result.value', result);
    return result?.value; // Returns the value of the result if it exists.
};

initdb();
