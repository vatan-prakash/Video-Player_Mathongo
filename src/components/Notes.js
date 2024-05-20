'use client'
import React, { useState } from 'react';

const Notes = ({ videoId, currentTime, notes, setNotes }) => {
    const [noteText, setNoteText] = useState('');
    const [addNote, setAddNote] = useState(false);
    const [editNoteIndex, setEditNoteIndex] = useState(null);

    const handleAddNote = () => {
        if (!noteText.trim()) return;
        const newNote = {
            timestamp: currentTime,
            date: new Date().toLocaleString(),
            content: noteText,
        };
        const updatedNotes = { ...notes, [videoId]: [...(notes[videoId] || []), newNote] };
        setNotes(updatedNotes);
        setNoteText('');
        setAddNote(false);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const handleDeleteNote = (index) => {
        const updatedNotes = { ...notes };
        updatedNotes[videoId].splice(index, 1);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const handleEditNote = (index) => {
        setNoteText(notes[videoId][index].content);
        setEditNoteIndex(index);
        setAddNote(true);
    };

    const handleSaveEditNote = () => {
        if (!noteText.trim()) return;
        const updatedNotes = { ...notes };
        updatedNotes[videoId][editNoteIndex].content = noteText;
        setNotes(updatedNotes);
        setNoteText('');
        setAddNote(false);
        setEditNoteIndex(null);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    return (
        <div className="mt-4 p-6 rounded-[16px] bg-white" style={{ border: "1px solid #EAECF0" }}>
            <div className='flex justify-between items-center mb-2'>
                <div className='flex flex-col gap-1'>
                    <h3 className='text-[#1D1D1D] font-semibold text-[16px]'>My Notes</h3>
                    <div className='text-[14px] text-[#475467]'>All your notes at a single place. Click on any note to go to specific timestamp in the video.</div>
                </div>
                <div className='w-[152px] h-[40px] flex justify-center items-center gap-8px rounded-[8px] cursor-pointer' onClick={() => { setAddNote(true); setNoteText(''); setEditNoteIndex(null); }} style={{ boxShadow: "0px 1px 2px 0px #1018280D", border: "1px solid #D0D5DD" }}>
                    <img src="/plus.svg" className='w-[20px] h-[20px]' />
                    <div className='text-[14px] text-[600] ml-2'>Add new Note</div>
                </div>
            </div>
            {addNote && <div>
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Write a note..."
                    className="w-full h-24 p-2 border rounded mb-2"
                />
                <div className='w-[152px] h-[40px] flex justify-center items-center gap-8px rounded-[8px] cursor-pointer' onClick={editNoteIndex !== null ? handleSaveEditNote : handleAddNote} style={{ boxShadow: "0px 1px 2px 0px #1018280D", border: "1px solid #D0D5DD" }}>
                    <div className='text-[14px] text-[600] ml-2'>{editNoteIndex !== null ? 'Save Note' : 'Add Note'}</div>
                </div>
            </div>}
            <ul className='mt-4'>
                {(notes[videoId] || []).map((note, index) => (
                    <li key={index} className="mb-2 p-4 border rounded shadow-sm bg-white">
                        <div className="text-gray-600 text-[14px]">{note.date}</div>
                        <div className="flex gap-2 items-center text-[14px]">
                            <span>Timestamp:</span>
                            <span
                                className="cursor-pointer text-blue-600"
                                onClick={() => {
                                    const iframe = document.querySelector('iframe');
                                    iframe.contentWindow.postMessage(
                                        `{"event":"command","func":"seekTo","args":[${note.timestamp}, true]}`,
                                        '*'
                                    );
                                }}
                            >
                                {new Date(note.timestamp * 1000).toISOString().substr(11, 8)}
                            </span>
                        </div>
                        <div className="mt-2 p-3 rounded-[8px]" style={{ border: "1px solid #EAECF0", boxShadow: "0px 1px 2px 0px #1018280D" }}>{note.content}</div>
                        <div className='flex justify-end mt-2 gap-2'>
                            <div className='w-[98px] py-1 px-5/2 rounded-[8px] text-[14px] flex justify-center items-center cursor-pointer' style={{ border: "1px solid #EAECF0", boxShadow: "0px 1px 2px 0px #1018280D" }} onClick={() => handleEditNote(index)}>Edit Note</div>
                            <div className='w-[98px] py-1 px-5/2 rounded-[8px] text-[14px] flex justify-center items-center cursor-pointer' onClick={() => handleDeleteNote(index)} style={{ border: "1px solid #EAECF0", boxShadow: "0px 1px 2px 0px #1018280D" }}>Delete Note</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;