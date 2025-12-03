import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function SubjectDetails() {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [notes, setNotes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', url: '' });
    const [newVideo, setNewVideo] = useState({ title: '', url: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubjectDetails();
    }, [id]);

    const fetchSubjectDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/subjects/${id}`);
            const data = await response.json();
            if (response.ok) {
                setSubject(data);
                setNotes(data.notes || []);
                setVideos(data.videos || []);
            } else {
                console.error("Failed to fetch subject details");
            }
        } catch (error) {
            console.error("Error fetching subject details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!newNote.title || !newNote.url) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newNote, subjectId: id })
            });
            const data = await response.json();
            if (response.ok) {
                setNotes([...notes, data]);
                setNewNote({ title: '', url: '' });
            }
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const handleAddVideo = async (e) => {
        e.preventDefault();
        if (!newVideo.title || !newVideo.url) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/videos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newVideo, subjectId: id })
            });
            const data = await response.json();
            if (response.ok) {
                setVideos([...videos, data]);
                setNewVideo({ title: '', url: '' });
            }
        } catch (error) {
            console.error("Error adding video:", error);
        }
    };

    const handleDeleteNote = async (noteId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/notes/${noteId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setNotes(notes.filter(note => note.id !== noteId));
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/videos/${videoId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setVideos(videos.filter(video => video.id !== videoId));
            }
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (!subject) return <div className="text-white text-center mt-10">Subject not found</div>;

    return (
        <div className="flex h-screen bg-gray-50 text-slate-900 font-sans overflow-hidden">
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/dashboard" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-6 transition-colors group text-sm font-medium">
                        <div className="p-1.5 rounded-md bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        Back to Dashboard
                    </Link>

                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        Add Content
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                            <h3 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Add Note
                            </h3>
                            <form onSubmit={handleAddNote} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-400"
                                />
                                <input
                                    type="url"
                                    placeholder="Note URL"
                                    value={newNote.url}
                                    onChange={(e) => setNewNote({ ...newNote, url: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-400"
                                />
                                <button type="submit" className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-medium rounded-lg text-sm transition-all shadow-sm">
                                    Add Note
                                </button>
                            </form>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                            <h3 className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-wider">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Add Video
                            </h3>
                            <form onSubmit={handleAddVideo} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Video Title"
                                    value={newVideo.title}
                                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-400"
                                />
                                <input
                                    type="url"
                                    placeholder="Video URL"
                                    value={newVideo.url}
                                    onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-400"
                                />
                                <button type="submit" className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 font-medium rounded-lg text-sm transition-all shadow-sm">
                                    Add Video
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto bg-gray-50/50">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-gray-200">
                        {subject.name}
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="p-1.5 rounded bg-yellow-100 text-yellow-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </span>
                                Study Notes
                            </h2>

                            <div className="space-y-3">
                                {notes.map(note => (
                                    <div key={note.id} className="group flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                                        <a href={note.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                            <div className="min-w-0">
                                                <div className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate">{note.title}</div>
                                                <div className="text-xs text-slate-400 truncate">{note.url}</div>
                                            </div>
                                        </a>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-rose-50 rounded"
                                            title="Delete Note"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                                {notes.length === 0 && (
                                    <div className="text-center py-8 text-slate-400 border border-dashed border-gray-200 rounded-lg bg-gray-50/50 text-sm">
                                        No notes yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="p-1.5 rounded bg-red-100 text-red-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                Video Tutorials
                            </h2>

                            <div className="space-y-3">
                                {videos.map(video => (
                                    <div key={video.id} className="group flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
                                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                            <div className="min-w-0">
                                                <div className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors truncate">{video.title}</div>
                                                <div className="text-xs text-slate-400 truncate">{video.url}</div>
                                            </div>
                                        </a>
                                        <button
                                            onClick={() => handleDeleteVideo(video.id)}
                                            className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-rose-50 rounded"
                                            title="Delete Video"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                                {videos.length === 0 && (
                                    <div className="text-center py-8 text-slate-400 border border-dashed border-gray-200 rounded-lg bg-gray-50/50 text-sm">
                                        No videos yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SubjectDetails;
