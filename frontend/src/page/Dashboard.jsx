import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Dashboard() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    useEffect(() => {
        console.log("Dashboard mounted. User from storage:", user);
        console.log("UserId:", userId);
        if (userId) {
            fetchSubjects();
        } else {
            console.log("No userId found, skipping fetch");
        }
    }, [userId]);

    const fetchSubjects = async () => {
        try {
            console.log(`Fetching subjects for userId: ${userId}`);
            const response = await fetch(`https://ebook-h8w1.onrender.com/subjects?userId=${userId}`);
            const data = await response.json();
            console.log("Subjects fetched:", data);
            if (response.ok) {
                setSubjects(data);
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!newSubject.trim()) return;

        try {
            const response = await fetch('https://ebook-h8w1.onrender.com/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSubject, userId })
            });
            const data = await response.json();
            if (response.ok) {
                setSubjects([...subjects, data]);
                setNewSubject('');
                setIsAdding(false);
            }
        } catch (error) {
            console.error("Error adding subject:", error);
        }
    };

    const handleDeleteSubject = async (id) => {
        try {
            const response = await fetch(`https://ebook-h8w1.onrender.com/subjects/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setSubjects(subjects.filter(subject => subject.id !== id));
            }
        } catch (error) {
            console.error("Error deleting subject:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-slate-900 font-sans overflow-hidden">
            <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white text-xs">E</div>
                        EBook
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 font-medium pl-8">Manage your learning</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Subjects</h2>
                    {subjects.length === 0 ? (
                        <div className="text-slate-400 text-center mt-8 text-sm p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                            No subjects yet.
                        </div>
                    ) : (
                        subjects.map((subject) => (
                            <Link to={`/subject/${subject.id}`} key={subject.id} className="group px-3 py-2 rounded-md hover:bg-gray-100 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    <h3 className="font-medium text-sm">{subject.name}</h3>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDeleteSubject(subject.id);
                                    }}
                                    className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-rose-50 rounded"
                                    title="Delete Subject"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </Link>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold border border-slate-300">
                            {user?.firstName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>


            <main className="flex-1 p-10 flex flex-col items-center justify-center bg-gray-50/50 relative">
                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/login');
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-200 rounded-lg transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                    </button>
                </div>

                <div className="w-full max-w-lg">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome {user?.firstName}!</h3>
                        <p className="text-slate-500">Select a subject from the sidebar or create a new one.</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            Create New Subject
                        </h2>

                        <form onSubmit={handleAddSubject} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-slate-700 mb-1.5 text-sm font-medium">Subject Name</label>
                                <input
                                    type="text"
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    placeholder="e.g. Advanced Algorithms"
                                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                                <span>Create Subject</span>
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;

