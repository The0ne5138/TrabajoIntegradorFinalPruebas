import useFetch from "../../hooks/useFetch";
import SongCard from "./SongCard";
import AddSongForm from "./AddSongForm"; 
import SongForm from './SongForm';
import { useEffect, useState } from "react";
import Buscar from "./Buscar"

function SongList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
        {}
    );

    const [songs, setSongs] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const [isCreating, setIsCreating] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);

    const [editingSong, setEditingSong] = useState(null);

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            setSongs(data.results);
            setNextPage(data.next);
            setPreviousPage(data.previous);
        }
    }, [data]);
    // DJ
    useEffect(() => {
        const filtered = songs.filter(song => {
          return song.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredSongs(filtered);
      }, [searchTerm, songs]);


    const handleDelete = async (songId) => {
        try {
        await deleteSong(songId);
        setSongs(songs.filter(song => song.id !== songId)); // Actualizar el estado después de eliminar
        } catch (error) {
        alert('Error deleting song: ' + error.message);
        }
    };

    const handleEdit = (song) => {
        setEditingSong(song); // Establece la canción que se va a editar en el estado
      };
    
      const handleSave = () => {
        // Después de guardar, limpia el estado de edición y actualiza la lista de canciones
        setEditingSong(null);
        // Aquí podrías agregar lógica para volver a cargar las canciones si es necesario
      };
    const fetchPage = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setSongs(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!data) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div>
                    <Buscar />
                </div>

                <h2 className="title">Lista de Canciones</h2>
                {/*  <AddSongForm onAdd={handleAdd} /> Formulario  */}
                <div>
                    <ul>
                        {songs.map((song) => (
                        <div key={song.id} className="column is-two-third">
                            <SongCard 
                            song={song} 
                            type = "song"
                            onDelete={() => handleDelete(song.id)} 
                            onEdit={() => handleEdit(song)} 
                            />
                        </div>
                        ))}
                    </ul>

                    {/* Mostrar SongForm si una canción está en edición */}
                    {editingSong && (
                        <SongForm 
                        song={editingSong} 
                        onSave={handleSave} 
                        />
                    )}
                </div>


                <div>
                    {previousPage && <button onClick={() => fetchPage(previousPage)}>Anterior</button>}
                    {nextPage && <button onClick={() => fetchPage(nextPage)}>Siguiente</button>}
                </div>
            </div>
        </div>
    );
}

export default SongList;