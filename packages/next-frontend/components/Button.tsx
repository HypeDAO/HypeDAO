import React from 'react'

export default const Button ({label="clicky", onClick}) => {
    return (
        <div onclick={onClick()}>{label}</div>
    )
}
