import { createNote } from "./notes"
import { setFilters } from './filters'
import { renderNotes } from './views'

renderNotes()

//event listeners
document.querySelector('#create_note').addEventListener('click', () => {
    const id = createNote()
    location.assign(`/edit.html#${id}`)
})


document.querySelector('#search_text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes()
})

document.querySelector('#filter_by').addEventListener('change',(e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes()
    }
})