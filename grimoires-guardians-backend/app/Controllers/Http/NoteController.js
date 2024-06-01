'use strict'

const Note = use('App/Models/Note')
const Database = use('Database')

class NoteController {
    async getNotes({ params, response }) {
        try {
            const notes = await Note.query().where('game_id', params.gameId).fetch();
            return response.status(200).json({ notes: notes.toJSON() });
        } catch (error) {
            console.error('Error fetching notes:', error);
            return response.status(500).json({ error: 'Failed to fetch notes' });
        }
    }

    async createNote({ request, response, params }) {
        const { name, fileType, type, parentId } = request.only(['name', 'fileType', 'type', 'parentId']);

        if (type === 'folder') {
            return response.status(201).json({
                message: 'Folder created successfully',
                note: { id: `${Date.now()}`, name, type, children: [] }
            });
        }

        try {
            const note = new Note();
            note.data = JSON.stringify({ name, fileType });
            await note.save();

            const newNoteObject = {
                id: note.id,
                type: 'file',
                name: name,
                fileType: fileType,
                data: JSON.parse(note.data)
            };

            return response.status(201).json({
                message: 'Note created successfully',
                note: newNoteObject
            });
        } catch (error) {
            console.error('Error creating note:', error);
            return response.status(500).json({ error: 'Failed to create note' });
        }
    }

    async loadNote({ params, response }) {
        const { noteId } = params;

        try {
            const note = await Note.find(noteId);
            if (!note) {
                return response.status(404).json({ error: 'Note not found' });
            }

            const noteData = JSON.parse(note.data);
            const file = {
                id: note.id,
                name: noteData.name,
                data: noteData,
                fileType: noteData.fileType
            };

            return response.status(200).json({ note: file });
        } catch (error) {
            console.error('Error loading note:', error);
            return response.status(500).json({ error: 'Failed to load note' });
        }
    }

    async updateNote({ params, request, response }) {
        const { noteId } = params;
        const { name, data } = request.only(['name', 'data']);

        try {
            const note = await Note.find(noteId);
            if (!note) {
                return response.status(404).json({ error: 'Note not found' });
            }

            const currentData = JSON.parse(note.data);
            note.data = JSON.stringify({ name, fileType: currentData.fileType, ...data });
            await note.save();

            return response.status(200).json({
                message: 'Note updated successfully',
                note: {
                    id: note.id,
                    name: JSON.parse(note.data).name,
                    data: JSON.parse(note.data),
                    fileType: JSON.parse(note.data).fileType
                }
            });
        } catch (error) {
            console.error('Error updating note:', error);
            return response.status(500).json({ error: 'Failed to update note' });
        }
    }

    async deleteNote({ params, response }) {
        const { gameId, noteId } = params;

        try {
            // Essayer de supprimer la note de la base de données
            const note = await Note.find(noteId);
            if (note) {
                await note.delete();
                console.log(`Note ${noteId} deleted from database`);
            } else {
                console.log(`Note ${noteId} not found in database`);
            }

            // Récupération du jeu et de la structure
            const game = await Database.table('games').where('id', gameId).first();
            if (!game) {
                return response.status(404).json({ error: 'Game not found' });
            }

            const field = `note_files_structure`;
            let structure = JSON.parse(game[field] || '[]');

            // Fonction récursive pour trouver et supprimer la note
            const findAndRemoveNote = (items, id) => {
                return items.filter(item => {
                    if (item.id === id) {
                        return false;
                    }
                    if (item.children) {
                        item.children = findAndRemoveNote(item.children, id);
                    }
                    return true;
                });
            };

            structure = findAndRemoveNote(structure, noteId);

            // Mise à jour de la structure du jeu
            await Database.table('games').where('id', gameId).update({ [field]: JSON.stringify(structure) });
            console.log(`Note ${noteId} deleted from structure`);

            return response.status(200).json({ message: 'Note deleted successfully', structure });
        } catch (error) {
            console.error('Error deleting note from structure:', error);
            return response.status(500).json({ error: 'Failed to delete note from structure' });
        }
    }

}

module.exports = NoteController;
