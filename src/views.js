import moment from 'moment'
import {getFilters} from './filters'
import {sortNotes, getNotes} from './notes'


const generateNoteDOM= (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //setup note title text
    note.title.length > 0 ? textEl.textContent = note.title : textEl.textContent = 'Unnamed note'
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //setup link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setup status
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

const renderNotes= () => {
    let notesEl = document.querySelector("#notes")
    //filter notes array
    const filters = getFilters()
    const notes=sortNotes(filters.sortBy)
    const filteredNotes=notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    //clear result return field, wipes reults from previous search before displaying results of the next one
    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl=generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = `No notes! hit "Create Note" to get started`
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    //display results
    
}

const initEditPage = (noteId) => {
    
    const titleField = document.querySelector('#note_title')
    const timeAgo = document.querySelector('#display_time_ago') 
    const bodyField = document.querySelector('#note_body')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note) {
        location.assign("/index.html")
    }


    titleField.value = note.title
    timeAgo.textContent = generateLastEdited(note.updatedAt)
    bodyField.value= note.body
}

//generate last edited message
const generateLastEdited = (timestamp) => `edited ${moment(timestamp).fromNow()}`

export {generateNoteDOM, renderNotes, generateLastEdited, initEditPage}