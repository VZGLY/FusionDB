import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(API_URL);
    
    fetch(`${API_URL}/persons`)
      .then(response => response.json())
      .then(data => {
        setPersons(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Erreur de chargement');
        setLoading(false);
      });
  }, []);

  const addPerson = async () => {
    if (!name.trim()) return;
    try {
      const response = await fetch(`${API_URL}/persons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout');
      const newPerson = await response.json();
      setPersons([...persons, newPerson]);
      setName('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{color:'red'}}>Erreur: {error}</p>;

  return (
    <div style={{padding: 20, fontFamily: 'Arial'}}>
      <h1>Liste des personnes</h1>
      <ul>
        {persons.map(p => (
          <li key={p.id}>{p.name} (id: {p.id})</li>
        ))}
      </ul>

      <h2>Ajouter une personne</h2>
      <input 
        type="text" 
        value={name} 
        placeholder="Nom" 
        onChange={e => setName(e.target.value)} 
      />
      <button onClick={addPerson}>Ajouter</button>
    </div>
  );
}

export default App;
