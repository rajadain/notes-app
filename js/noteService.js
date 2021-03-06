(function() {
  angular
    .module('notes-app')
    .factory('noteService', noteService);

  function noteService($localStorage) {
    var notes;
    var next;

    var noteService = {
      get: getNote,
      all: allNotes,
      new: newNote,
      add: addNote,
      del: delNote,
      copy: copyNote,
    };

    initialize();
    return noteService;

    function initialize() {
      notes = $localStorage.$default({
       notes: [
          {
            id      : 0,
            title   : "Sample Note",
            content : "This is some sample content for this sample note.",
            created : new Date(1404010593 * 1000),
            modified: new Date(1404010731 * 1000),
            liked   : false,
            lists   : [],
          }
        ]
      }).notes;

      next = notes.length || 1;
    }

    function getNote(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) return notes[i];
      }
      return null;
    }

    function allNotes() {
      return notes;
    }

    function newNote() {
      return {
        id      : next++,
        title   : "",
        content : "",
        created : new Date(),
        modified: new Date(),
        liked   : false,
        lists   : [],
      };
    }

    function addNote(note) {
      if (getNote(note.id)) {
        // Note already exists
        return false;
      } else {
        notes.push(note);
        return true;
      }
    }

    function delNote(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
          var deletedNote = notes[i];
          notes.splice(i, 1);
          return deletedNote;
        }
      }
      return null;
    }

    function copyNote(note) {
      return {
        id      : note.id      ,
        title   : note.title   ,
        content : note.content ,
        created : note.created ,
        modified: note.modified,
        liked   : note.liked   ,
        lists   : note.lists   ,
      };
    }
  }
})();
