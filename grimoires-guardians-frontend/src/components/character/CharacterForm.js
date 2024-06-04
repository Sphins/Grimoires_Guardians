import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputBase, IconButton, Button, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

const CharacterForm = ({ file, onSave, gameId }) => {
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
    const [level, setLevel] = useState(file.data?.niveau || '');
    const [editName, setEditName] = useState(false);
    const [currentSection, setCurrentSection] = useState('stats');
    const [profils, setProfils] = useState([]);
    const [races, setRaces] = useState([]);
    const [raceTraits, setRaceTraits] = useState({ adresse: 0, esprit: 0, puissance: 0 });
    const [profileTraits, setProfileTraits] = useState({ adresse: 0, esprit: 0, puissance: 0 });
    const [totalAddress, setTotalAddress] = useState(0);
    const [totalSpirit, setTotalSpirit] = useState(0);
    const [totalPower, setTotalPower] = useState(0);



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
    }, [file]);

    useEffect(() => {
        const fetchProfils = async () => {
            try {
                const response = await api.get(`/api/game/${gameId}/items/profiles`);
                setProfils(response.data.profiles.map(item => {
                    const data = JSON.parse(item.data);
                    setProfileTraits(data.traits);
                    return data;
                }));
            } catch (error) {
                console.error('Failed to fetch profiles', error);
            }
        };

        const fetchRaces = async () => {
            try {
                const response = await api.get(`/api/game/${gameId}/items/peuples`);
                setRaces(response.data.profiles.map(item => {
                    const data = JSON.parse(item.data);
                    setRaceTraits(data.traits);
                    return data;
                }));
            } catch (error) {
                console.error('Failed to fetch races', error);
            }
        };

        setTotalAddress(+address + +raceTraits.adresse + +profileTraits.adresse);
        setTotalSpirit(+spirit + +raceTraits.esprit + +profileTraits.esprit);
        setTotalPower(+power + +raceTraits.puissance + +profileTraits.puissance);

        fetchProfils();
        fetchRaces();
    }, [gameId, address, spirit, power, raceTraits, profileTraits]);

    const handleSave = () => {
        const updatedFile = {
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
        };
        onSave(updatedFile);
    };

    const handleWoundsChange = (index) => {
        const newWounds = [...wounds];
        newWounds[index] = !newWounds[index];
        setWounds(newWounds);
    };

    const rollDice = (value) => {
        const message = `/r 1d20 + ${value}`;
        setMessageInput(message);
        handleSendMessage();
    };


    const renderStatsSection = () => (
        <div className="flex lg:flex-row gap-4">
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
            <div className="flex-1 space-y-4">
                <div className="relative flex items-center space-x-2 p-2 border border-red-600 rounded space-y-2">
                    <label
                        className={`text-gray-700 text-lg font-bold cursor-pointer ${editName ? 'hidden' : ''}`}
                        onClick={() => setEditName(true)}
                    >
                        Nom :
                    </label>
                    <InputBase
                        type="text"
                        className={`p-2 ${editName ? '' : 'hidden'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setEditName(false)}
                        autoFocus={editName}
                        style={{ color: '#dc2626', border: 'none', outline: 'none', backgroundColor: 'transparent', fontWeight: 'bold' }}
                    />
                </div>
                <div className="flex space-x-2 items-center p-2 border border-red-600 rounded space-y-2">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold text-red-600">Profil</label>
                        <Select
                            className="w-full p-2"
                            value={classType}
                            onChange={(e) => setClassType(e.target.value)}
                            size="small"
                        >
                            {profils.map((profil) => (
                                <MenuItem key={profil.id} value={profil.name}>
                                    {profil.name}
                                </MenuItem>
                            ))}
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
                            {races.map((race) => (
                                <MenuItem key={race.id} value={race.name}>
                                    {race.name}
                                </MenuItem>
                            ))}
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
                        <span
                            style={{
                                fontWeight: 'bold',
                                color: '#dc2626',
                            }}
                        >
                            {2 + totalSpirit}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="block text-gray-700 text-sm font-bold">Points de vie :</label>
                        <span
                            style={{
                                fontWeight: 'bold',
                                color: '#dc2626',
                            }}
                        >
                            {10 + (2 * totalPower)}
                        </span>
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
                            value={totalAddress}
                            onChange={(e) => setAddress(e.target.value)}
                            inputProps={{ 'aria-label': 'address', min: 0 }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton onClick={() => rollDice(totalAddress)}>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Esprit :</div>
                        <InputBase
                            type="number"
                            value={totalSpirit}
                            onChange={(e) => setSpirit(e.target.value)}
                            inputProps={{ 'aria-label': 'spirit', min: 0 }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton onClick={() => rollDice(totalSpirit)}>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Puissance :</div>
                        <InputBase
                            type="number"
                            value={totalPower}
                            onChange={(e) => setPower(e.target.value)}
                            inputProps={{ 'aria-label': 'power', min: 0 }}
                            style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                color: '#dc2626',
                                width: '50px'
                            }}
                        />
                        <IconButton onClick={() => rollDice(totalPower)}>
                            <FontAwesomeIcon icon={faDiceD20} className="text-red-600" />
                        </IconButton>
                    </div>
                </div>
                <div className="p-2 border border-red-600 rounded space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="block text-gray-700 text-sm font-bold">Défense :</div>
                        <span
                            style={{
                                fontWeight: 'bold',
                                color: '#dc2626',
                            }}
                        >
                            {10 + totalAddress}
                        </span>
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
            <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </div>
    );
};

export default CharacterForm;
