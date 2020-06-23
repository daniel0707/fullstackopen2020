import React from 'react'

const Filter = ({ newSearch, setNewSearch }) => {
    return (
        <div>
            filter name: <input value={newSearch} onChange={(event) => setNewSearch(event.target.value)} />
        </div>
    )
}

export default Filter