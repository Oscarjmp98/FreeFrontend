import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import './styles/UserHome.css';

function UserHome({ user, iduser }) {
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [newName, setNewName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Cargar videos existentes al montar el componente
        fetchVideos();
    }, []);

    if (user !== "user" || !user) {
        return <Navigate to="/" />
    }

    const fetchVideos = async () => {
        try {
            /*const response = await axios.get(`http://localhost:4000/v1/signos/videos/${iduser}`);*/
            const response = await axios.get(`https://free-backend-sandy.vercel.app/v1/signos/videos/${iduser}`);
            setVideos(response.data);
        } catch (error) {
            console.error('Error al cargar los videos:', error);
            setMessage('Error al cargar los videos');
        }
    };

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!video) {
            setMessage('Selecciona un video primero');
            return;
        }

        if (!newName.trim()) {
            setMessage('Especifica un nuevo nombre para el video');
            return;
        }

        const formData = new FormData();
        formData.append('video', video);
        formData.append('newName', newName);

        try {
            setUploading(true);
            const response = await axios.post(`https://free-backend-sandy.vercel.app/v1/signos/upload/${iduser}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Actualizar la lista de videos después de subir uno nuevo
            await fetchVideos();
            
            setVideo(null);
            setNewName('');
            setMessage('Video subido exitosamente');

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error al subir el video:', error);
            setMessage('Error al subir el video');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="user-home-container">
            <header className="app-header">
                <h1>FreeTube</h1>
                <button className="btn btn-ghost" onClick={() => navigate('/')}>Cerrar sesión</button>
            </header>
            <main className="main-content">
                <section className="upload-section">
                    <h2>Subir Video</h2>
                    <form onSubmit={handleUpload} className="upload-form">
                        <div className="form-group">
                            <label htmlFor="video-file" className="file-input-label">
                                {video ? video.name : 'Seleccionar video'}
                                <input
                                    id="video-file"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="file-input"
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Nuevo nombre del video"
                                value={newName}
                                onChange={handleNameChange}
                                className="form-input"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            {uploading ? 'Subiendo...' : 'Subir Video'}
                        </button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </section>

                <section className="videos-section">
                    <h2>Videos Subidos</h2>
                    <div className="video-grid">
                        {videos.length > 0 ? (
                            videos.map((video, index) => (
                                <div key={index} className="video-item">
                                    <video controls>
                                        <source src={video.url} type="video/mp4" />
                                        Tu navegador no soporta reproducción de video.
                                    </video>
                                    <p className="video-title">{video.filename}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-videos">No hay videos disponibles.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserHome;

