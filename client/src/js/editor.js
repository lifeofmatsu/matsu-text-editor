import { getDb, putDb } from './database';
import { header } from './header';

// Defines the Editor class.
export default class {
    constructor() {
        const localData = localStorage.getItem('content'); // Attempts to retrieve the previously saved content from localStorage.

        // Checks if CodeMirror is loaded in the global scope.
        if (typeof CodeMirror === 'undefined') {
            throw new Error('CodeMirror is not loaded');
        }

        // Initializes CodeMirror with various options.
        this.editor = CodeMirror(document.querySelector('#main'), {
            value: '',
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });

        // When the editor is ready, set the value to whatever is stored in IndexedDB.
        // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
        getDb().then((data) => {
            console.info('Loaded data from IndexedDB, injecting into editor');
            this.editor.setValue(data || localData || header);
        });

        // Event listener to save content to localStorage on any change in the editor.
        this.editor.on('change', () => {
            localStorage.setItem('content', this.editor.getValue());
        });

        // Event listener to save content to IndexedDB when the editor loses focus.
        this.editor.on('blur', () => {
            console.log('The editor has lost focus');
            putDb(localStorage.getItem('content'));
        });
    }
}
