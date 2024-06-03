import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputBase, IconButton, Button, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const CharacterForm = ({ file, onSave }) => {
    const [name, setName] = useState(file.name || '');
    const [classType, setClassType] = useState(file.data?.classType || '');
    const [species, setSpecies] = useState(file.data?.species || '');
    const [background, setBackground] = useState(file.data?.background || '');
    const [actionPoints, setActionPoints] = useState(file.data?.actionPoints || '');
    const [hitPoints, setHitPoints] = useState(file.data?.hitPoints || '');
    const [wounds, setWounds] = useState(file.data?.wounds || []);
    const [address, setAddress] = useState(file.data?.address || '');
    const [spirit, setSpirit] = useState(file.data?.spirit || '');
    const [power, setPower] = useState(file.data?.power || '');
    const [defense, setDefense] = useState(file.data?.defense || '');
    const [weapon, setWeapon] = useState(file.data?.weapon || '');
    const [damage, setDamage] = useState(file.data?.damage || '');
    const [equipment, setEquipment] = useState(file.data?.equipment || '');
    const [editName, setEditName] = useState(false);
    const [level, setLevel] = useState(file.data?.niveau || '');
    const [initialFile, setInitialFile] = useState(file);
    const [currentSection, setCurrentSection] = useState('stats'); // State to handle section

    useEffect(() => {
        setName(file.name || '');
        setClassType(file.data?.classType || '');
        setSpecies(file.data?.species || '');
        setBackground(file.data?.background || '');
        setLevel(file.data?.level || '');
        setActionPoints(file.data?.actionPoints || '');
        setHitPoints(file.data?.hitPoints || '');
        setWounds(file.data?.wounds || []);
        setAddress(file.data?.address || '');
        setSpirit(file.data?.spirit || '');
        setPower(file.data?.power || '');
        setDefense(file.data?.defense || '');
        setWeapon(file.data?.weapon || '');
        setDamage(file.data?.damage || '');
        setEquipment(file.data?.equipment || '');
        setInitialFile(file);
    }, [file]);

    useEffect(() => {
        if (initialFile !== file) {
            onSave({
                ...file,
                name,
                data: {
                    ...file.data,
                    classType,
                    species,
                    background,
                    level,
                    actionPoints,
                    hitPoints,
                    wounds,
                    address,
                    spirit,
                    power,
                    defense,
                    weapon,
                    damage,
                    equipment,
                }
            });
            setInitialFile(file);
        }
    }, [name, classType, species, background, level, actionPoints, hitPoints, wounds, address, spirit, power, defense, weapon, damage, equipment, file, onSave, initialFile]);

    const handleNameClick = () => {
        setEditName(true);
    };

    const handleNameBlur = () => {
        setEditName(false);
    };

    const handleWoundsChange = (index) => {
        const newWounds = [...wounds];
        newWounds[index] = !newWounds[index];
        setWounds(newWounds);
    };

    const renderStatsSection = () => (
        <div className="flex lg:flex-row gap-4">
            {/* Bloc Image */}
            <div>
                <div className="flex-1">
                    <div
                        className="w-full h-80 border border-gray-400 bg-cover bg-center mb-4"
                        style={{ backgroundImage: `url(${file.data?.image || '/mnt/data/image.png'})` }}
                    ></div>
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <label className="block text-gray-700 text-sm font-bold">Équipement</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded h-64"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                    ></textarea>
                </div>
            </div>
            {/* Bloc Central */}
            <div className="flex-1 space-y-4">
                <div className="relative flex items-center space-x-2 p-2 border border-red-600 rounded space-y-2">
                    <label
                        className={`text-gray-700 text-lg font-bold cursor-pointer ${editName ? 'hidden' : ''}`}
                        onClick={handleNameClick}
                    >
                        Nom :
                    </label>
                    <InputBase
                        type="text"
                        className={`p-2 ${editName ? '' : 'hidden'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleNameBlur}
                        autoFocus={editName}
                        style={{ color: '#dc2626', border: 'none', outline: 'none', backgroundColor: 'transparent', fontWeight: 'bold' }}
                    />
                </div>
                <div className="flex space-x-2 items-center p-2 border border-red-600 rounded space-y-2">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold text-red-600">Classe</label>
                        <Select
                            className="w-full p-2"
                            value={classType}
                            onChange={(e) => setClassType(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="Guerrier">Guerrier</MenuItem>
                            <MenuItem value="Mage">Mage</MenuItem>
                            <MenuItem value="Archer">Archer</MenuItem>
                        </Select>
                    </div>
                    <div className="text-gray-700 text-sm font-bold mx-2">-</div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold text-red-600">Espèce</label>
                        <Select
                            className="w-full p-2"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            size="small"
                        >
                            <MenuItem value="Elfe">Elfe</MenuItem>
                            <MenuItem value="Humain">Humain</MenuItem>
                            <MenuItem value="Nain">Nain</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <label className="text-red-600 block text-gray-700 text-sm font-bold">Background</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded h-64"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                    ></textarea>
                </div>
            </div>
            {/* Bloc Droit */}
            <div className="flex-1 space-y-4">
                <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold text-red-600">Niveau</div>
                    <InputBase
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(Math.max(1, e.target.value))}
                        inputProps={{ 'aria-label': 'niveau', min: 1, max: 20 }}
                        style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            fontWeight: 'bold',
                            color: '#dc2626',
                            width: '50px'
                        }}
                    />
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="block text-gray-700 text-sm font-bold">Points d'action :</label>
                        <InputBase
                            type="number"
                            value={actionPoints}
                            onChange={(e) => setActionPoints(e.target.value)}
                            inputProps={{ 'aria-label': 'action' }}
                            className="border border-gray-300 p-2 rounded"
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="block text-gray-700 text-sm font-bold">Points de vie :</label>
                        <InputBase
                            type="number"
                            value={hitPoints}
                            onChange={(e) => setHitPoints(e.target.value)}
                            inputProps={{ 'aria-label': 'hitPoints' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="block text-gray-700 text-sm font-bold">Blessures :</div>
                        {[0, 1, 2, 3, 4].map(index => (
                            <input
                                key={index}
                                type="checkbox"
                                checked={wounds[index] || false}
                                onChange={() => handleWoundsChange(index)}
                                className="w-4 h-4"
                            />
                        ))}
                    </div>
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Adresse :</div>
                        <InputBase
                            type="number"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            inputProps={{ 'aria-label': 'address' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Esprit :</div>
                        <InputBase
                            type="number"
                            value={spirit}
                            onChange={(e) => setSpirit(e.target.value)}
                            inputProps={{ 'aria-label': 'spirit' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Puissance :</div>
                        <InputBase
                            type="number"
                            value={power}
                            onChange={(e) => setPower(e.target.value)}
                            inputProps={{ 'aria-label': 'power' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Défense :</div>
                        <InputBase
                            type="number"
                            value={defense}
                            onChange={(e) => setDefense(e.target.value)}
                            inputProps={{ 'aria-label': 'defense' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Arme :</div>
                        <InputBase
                            type="number"
                            value={weapon}
                            onChange={(e) => setWeapon(e.target.value)}
                            inputProps={{ 'aria-label': 'weapon' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Dégâts :</div>
                        <InputBase
                            type="text"
                            value={damage}
                            onChange={(e) => setDamage(e.target.value)}
                            inputProps={{ 'aria-label': 'damage' }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '75px'
                            }}
                        />
                        <IconButton>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderVoiesSection = () => (
        <div className="p-4">
            <Typography variant="h6" className="text-red-600">Voies Section</Typography>
            {/* Add your "voies" content here */}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded p-6 mt-10 border border-gray-300">
            <div className="text-center text-3xl font-bold text-red-600 mb-4">Les Légendaires</div>
            <Box display="flex" justifyContent="center" mb={2}>
                <Button
                    variant={currentSection === 'stats' ? 'contained' : 'outlined'}
                    style={{ borderColor: '#dc2626', color: currentSection === 'stats' ? 'white' : '#dc2626', backgroundColor: currentSection === 'stats' ? '#dc2626' : 'transparent' }}
                    onClick={() => setCurrentSection('stats')}
                >
                    Stats
                </Button>
                <Button
                    variant={currentSection === 'voies' ? 'contained' : 'outlined'}
                    style={{ borderColor: '#dc2626', color: currentSection === 'voies' ? 'white' : '#dc2626', backgroundColor: currentSection === 'voies' ? '#dc2626' : 'transparent' }}
                    onClick={() => setCurrentSection('voies')}
                >
                    Voies
                </Button>
            </Box>
            {currentSection === 'stats' ? renderStatsSection() : renderVoiesSection()}
        </div>
    );
};

export default CharacterForm;
