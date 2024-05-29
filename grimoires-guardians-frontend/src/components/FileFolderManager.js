import React, { useState, useCallback, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import api from '../services/api';
import FileEditPopup from './FileEditPopup';

const ItemTypes = {
    FOLDER: 'folder',
    FILE: 'file'
};

const DraggableItem = ({ item, index, moveItem, findItem, parentId, level, toggleFolder, openFolders, deleteItem, handleFileClick }) => {
    const originalIndex = findItem(item.id).index;

    const [{ isDragging }, drag] = useDrag({
        type: item.type, // Assurez-vous que item.type est correctement défini
        item: { id: item.id, originalIndex, parentId, type: item.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (draggedItem, monitor) => {
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveItem(draggedItem.id, draggedItem.originalIndex, draggedItem.parentId);
            }
        },
    });

    const [, drop] = useDrop({
        accept: [ItemTypes.FOLDER, ItemTypes.FILE],
        drop: (draggedItem) => {
            if (draggedItem.id !== item.id) {
                moveItem(draggedItem.id, index, item.type === 'folder' ? item.id : parentId);
            }
        },
    });

    const isFolderOpen = openFolders.includes(item.id);
    const handleClick = () => toggleFolder(item.id);

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div style={{ backgroundColor: '#f0f0f0', margin: '2px 0', paddingLeft: level * 20 }}>
                <ListItem button onClick={item.type === 'file' ? () => handleFileClick(item) : handleClick}>
                    {item.type === 'folder' ? (isFolderOpen ? <FolderOpenIcon /> : <FolderIcon />) : <InsertDriveFileIcon />}
                    <ListItemText primary={item.name} />
                    <IconButton edge="end" onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} disabled={item.type === 'folder' && item.children && item.children.length > 0}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
                {item.type === 'folder' && item.children && isFolderOpen && (
                    <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => (
                            <DraggableItem
                                key={child.id}
                                item={child}
                                index={childIndex}
                                moveItem={moveItem}
                                findItem={findItem}
                                parentId={item.id}
                                level={level + 1}
                                toggleFolder={toggleFolder}
                                openFolders={openFolders}
                                deleteItem={deleteItem}
                                handleFileClick={handleFileClick}
                            />
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};


const FileFolderManager = ({ fileTypes, gameId, structureType }) => {
    const [structure, setStructure] = useState([]);
    const [openFolders, setOpenFolders] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editFile, setEditFile] = useState(null);
    const [newItem, setNewItem] = useState({ type: '', name: '', parentId: null, fileType: '' });

    const findItem = useCallback((id, items = structure) => {
        let result;
        items.some((item, index) => {
            if (item.id === id) {
                result = { item, index, parent: items };
                return true;
            }
            if (item.children) {
                result = findItem(id, item.children);
                return result !== undefined;
            }
            return false;
        });
        return result;
    }, [structure]);
    const moveItem = useCallback((id, toIndex, newParentId) => {
        const findItemAndRemove = (id, items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    items.splice(i, 1);
                    return item;
                }
                if (item.children) {
                    const found = findItemAndRemove(id, item.children);
                    if (found) return found;
                }
            }
        };

        const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation
        const item = findItemAndRemove(id, updatedStructure);

        if (!item) return; // Ensure the item exists before moving

        if (newParentId === null) {
            updatedStructure.splice(toIndex, 0, item);
        } else {
            const newParent = findItem(newParentId, updatedStructure).item;
            if (!newParent.children) newParent.children = [];
            newParent.children.splice(toIndex, 0, item);
        }

        setStructure(updatedStructure);
        saveStructure(updatedStructure); // Save structure after moving item
    }, [structure, findItem]);

    const deleteItem = useCallback((id) => {
        const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation

        const findItemAndRemove = (id, items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.id === id) {
                    items.splice(i, 1);
                    return true;
                }
                if (item.children) {
                    const found = findItemAndRemove(id, item.children);
                    if (found) return true;
                }
            }
            return false;
        };

        findItemAndRemove(id, updatedStructure);
        setStructure(updatedStructure);
        saveStructure(updatedStructure); // Save structure after deleting item
    }, [structure]);

    const toggleFolder = (id) => {
        setOpenFolders((prevOpenFolders) =>
            prevOpenFolders.includes(id) ? prevOpenFolders.filter((folderId) => folderId !== id) : [...prevOpenFolders, id]
        );
    };

    const handleOpenDialog = (type, parentId = null) => {
        setNewItem({ type, name: '', parentId, fileType: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleCreateItem = async () => {
        if (newItem.name.trim() === '' || (newItem.type === 'file' && newItem.fileType.trim() === '')) return;

        try {
            const response = await api.post(`/api/game/${gameId}/create-file`, {
                name: newItem.name,
                fileType: newItem.fileType,
                data: {},
                type: newItem.type // Ajoutez le type ici
            });

            const newItemObject = response.data.item;
            newItemObject.type = newItem.type; // Assurez-vous que le type est défini

            const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation

            if (newItem.parentId === null) {
                updatedStructure.push(newItemObject);
            } else {
                const parent = findItem(newItem.parentId, updatedStructure).item;
                if (!parent.children) parent.children = [];
                parent.children.push(newItemObject);
            }

            setStructure(updatedStructure);
            handleCloseDialog();
            saveStructure(updatedStructure); // Save structure after creating item
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newItem.name.trim() !== '' && (newItem.type === 'folder' || newItem.fileType.trim() !== '')) {
            handleCreateItem();
        }
    };

    const saveStructure = async (structure) => {
        if (!gameId) {
            console.error('gameId is undefined');
            return;
        }
        try {
            await api.post(`/api/game/${gameId}/structure`, {
                type: structureType,
                structure
            });
        } catch (error) {
            console.error('Error saving structure:', error);
        }
    };

    const loadStructure = async () => {
        if (!gameId) {
            console.error('gameId is undefined');
            return;
        }
        try {
            const response = await api.get(`/api/game/${gameId}/structure`, {
                params: { type: structureType }
            });
            const structureData = response.data.structure || [];

            // Assurez-vous que chaque élément a un type correctement défini
            const ensureType = (items) => {
                return items.map(item => {
                    if (!item.type) {
                        item.type = item.children ? ItemTypes.FOLDER : ItemTypes.FILE;
                    }
                    if (item.children) {
                        item.children = ensureType(item.children);
                    }
                    return item;
                });
            };

            const updatedStructure = ensureType(structureData);
            setStructure(updatedStructure);
        } catch (error) {
            console.error('Error loading structure:', error);
        }
    };



    const handleFileClick = async (file) => {
        try {
            const response = await api.get(`/api/file/${file.id}`);
            const fileData = response.data.item;
            fileData.type = file.type; // Assurez-vous que le type est défini ici
            setEditFile(fileData);
        } catch (error) {
            console.error('Error loading file:', error);
        }
    };


    const handleSaveFile = async (updatedFile) => {
        try {
            const response = await api.put(`/api/file/${updatedFile.id}`, {
                name: updatedFile.name,
                data: updatedFile.data,
                type: updatedFile.type // Ajoutez le type ici
            });

            const updatedItem = response.data.item;
            updatedItem.type = updatedFile.type; // Assurez-vous que le type est défini

            const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation
            const { index, parent } = findItem(updatedItem.id, updatedStructure);
            parent[index] = updatedItem;

            setStructure(updatedStructure);
            saveStructure(updatedStructure); // Save structure after editing item
            setEditFile(null); // Fermer le popup après la sauvegarde
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };


    useEffect(() => {
        loadStructure();
    }, [structureType, gameId]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
                <Paper style={{ padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Box>
                        <Tooltip title="Ajouter Dossier">
                            <IconButton color="primary" onClick={() => handleOpenDialog('folder')}>
                                <CreateNewFolderIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Ajouter Fiche">
                            <IconButton color="secondary" onClick={() => handleOpenDialog('file')}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>
                <List>
                    {structure.map((item, index) => (
                        <DraggableItem
                            key={item.id}
                            item={item}
                            index={index}
                            moveItem={moveItem}
                            findItem={findItem}
                            parentId={null}
                            level={0}
                            toggleFolder={toggleFolder}
                            openFolders={openFolders}
                            deleteItem={deleteItem}
                            handleFileClick={handleFileClick}
                        />
                    ))}
                </List>
                <Dialog open={openDialog} onClose={handleCloseDialog} onKeyPress={handleKeyPress}>
                    <DialogTitle>{`Ajouter un Nouveau ${newItem.type === 'folder' ? 'Dossier' : 'Fiche'}`}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nom"
                            name="name"
                            fullWidth
                            value={newItem.name}
                            onChange={handleInputChange}
                        />
                        {newItem.type === 'file' && (
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="file-type-label">Type</InputLabel>
                                <Select
                                    labelId="file-type-label"
                                    name="fileType"
                                    value={newItem.fileType}
                                    onChange={handleInputChange}
                                >
                                    {fileTypes.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={handleCreateItem} color="primary">
                            Ajouter
                        </Button>
                    </DialogActions>
                </Dialog>
                {editFile && (
                    <FileEditPopup
                        open={Boolean(editFile)}
                        onClose={() => setEditFile(null)}
                        file={editFile}
                        onSave={handleSaveFile}
                    />
                )}
            </Box>
        </DndProvider>
    );
};

export default FileFolderManager;

