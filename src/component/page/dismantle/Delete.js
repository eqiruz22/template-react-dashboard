import React from 'react'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../hooks/useAuthContext'

const Delete = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage }) => {
    const { user } = useAuthContext()
    const handleDelete = (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`http://localhost:4000/api/dismantle/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user['token']}`
                        },
                        body: JSON.stringify({
                            user: user['name']
                        })
                    })
                    if (res.ok) {
                        const response = await res.json()
                        console.log(response)
                        await fetch('http://localhost:4000/api/dismantle', {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${user['token']}`
                            }
                        }).then(response => response.json())
                            .then(response => {
                                console.log(response)
                                onDataUpdate(response.result)
                                onPage(response.page)
                                onLimit(response.limit)
                                onRow(response.row)
                                onTotalpage(response.totalPage)
                            })
                        Swal.fire(
                            'Deleted',
                            `${response.message}`,
                            'success'
                        )
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <>
            <button className='btn btn-sm btn-danger ml-1' onClick={handleDelete}>Delete</button>
        </>
    )
}

export default Delete