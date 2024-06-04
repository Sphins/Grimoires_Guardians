import React from 'react';
import FileFolderManager from './FileFolderManager';

const CharacterManagement = ({ gameId, setTabIndex }) => {
    const fileTypes = ["Héro", "Créature"]; // Ajoutez les types de fichiers que vous utilisez

    return (
        <FileFolderManager
            gameId={gameId}
            fileTypes={fileTypes}
            structureType="character"
            setTabIndex={setTabIndex}
        />
    );
};

export default CharacterManagement;
