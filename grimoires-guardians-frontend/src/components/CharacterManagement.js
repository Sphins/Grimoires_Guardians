import React, { useState, useCallback } from 'react';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper, List, ListItem, ListItemText, IconButton, Tooltip, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    FOLDER: 'folder',
    FILE: 'file'
};

const DraggableItem = ({ item, index, moveItem, findItem, parentId, level }) => {
    const originalIndex = findItem(item.id).index;

    const [{ isDragging }, drag] = useDrag({
        type: item.type,
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
        hover: (draggedItem) => {
            if (draggedItem.id !== item.id && item.type === 'folder') {
                moveItem(draggedItem.id, index, item.id);
            }
        }
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div style={{ backgroundColor: '#f0f0f0', margin: '2px 0', paddingLeft: level * 20 }}>
                <ListItem>
                    {item.type === 'folder' ? <FolderIcon /> : <InsertDriveFileIcon />}
                    <ListItemText primary={item.name} />
                    <IconButton edge="end" onClick={() => moveItem(item.id, index, null)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
                {item.type === 'folder' && item.children && (
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
                            />
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};

const CharacterManagement = () => {
    const [structure, setStructure] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newItem, setNewItem] = useState({ type: '', name: '', parentId: null });

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

        const updateLevel = (item, newLevel) => {
            item.level = newLevel;
            if (item.children) {
                item.children.forEach(child => updateLevel(child, newLevel + 1));
            }
        };

        const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation
        const item = findItemAndRemove(id, updatedStructure);

        if (newParentId === null) {
            item.level = 0; // Reset level to 0 if it's moved to the root
            updatedStructure.splice(toIndex, 0, item);
        } else {
            const newParent = findItem(newParentId, updatedStructure).item;
            if (!newParent.children) newParent.children = [];
            item.level = newParent.level + 1;
            newParent.children.push(item);
            updateLevel(item, item.level);
        }

        setStructure(updatedStructure);
    }, [structure, findItem]);

    const handleOpenDialog = (type, parentId = null) => {
        setNewItem({ type, name: '', parentId });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleCreateItem = () => {
        if (newItem.name.trim() === '') return;

        const updatedStructure = JSON.parse(JSON.stringify(structure)); // Deep copy to prevent state mutation
        const newItemObject = {
            id: Date.now(),
            type: newItem.type,
            name: newItem.name,
            children: newItem.type === 'folder' ? [] : undefined,
            level: newItem.parentId === null ? 0 : findItem(newItem.parentId).item.level + 1,
        };

        if (newItem.parentId === null) {
            updatedStructure.push(newItemObject);
        } else {
            const parent = findItem(newItem.parentId, updatedStructure).item;
            parent.children.push(newItemObject);
        }

        setStructure(updatedStructure);
        handleCloseDialog();
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box>
                <Typography variant="h5" gutterBottom>Gestion des Personnages</Typography>
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
                            level={item.level}
                        />
                    ))}
                </List>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
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
            </Box>
        </DndProvider>
    );
};

export default CharacterManagement;
