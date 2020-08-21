import { initEditPage, generateLastEdited } from './views'
import { updateNote, removeNote, getNotes } from './notes'

const titleField = document.querySelector('#note_title')
const timeAgo = document.querySelector('#display_time_ago') 
const bodyField = document.querySelector('#note_body')
const removeButton = document.querySelector('#remove_note')
const noteId= location.hash.substring(1)

const pageTitle = document.querySelector('#pageTitle')
pageTitle.textContent = `Note: ${getNotes().find((note) => note.id === noteId).title}`

initEditPage(noteId)

titleField.addEventListener('input',(e) =>  {

    const note = updateNote(noteId, {
        title: e.target.value
    })

    timeAgo.textContent = generateLastEdited(note.updatedAt)

    window.addEventListener('click', () => {
        pageTitle.textContent = `Note: ${note.title}`
    }, {once: true})
})

// titleField.addEventListener('click', () => {
// 
//     window.addEventListener('click', () => {
//         pageTitle.textContent = `Note: ${note.title}`
//     }, {once: true})
//     
// })

bodyField.addEventListener('input',(e) =>  {

    const note = updateNote (noteId, {
        body: e.target.value
    })

    timeAgo.textContent = generateLastEdited(note.updatedAt)
})

removeButton.addEventListener('click',() =>  {

    removeNote(noteId)
    location.assign('/index.html')
})

window.addEventListener('storage',(e) => {
    if (e.key === 'notes') {
        const pageTitle = document.querySelector('#pageTitle')
        pageTitle.textContent = `Note: ${getNotes().find((note) => note.id === noteId).title}`
        initEditPage(noteId)
    }
})

