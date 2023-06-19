import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import Swal from 'sweetalert2'

export const Delete = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage }) => {
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
                    const res = await fetch(`http://localhost:4000/api/installation/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user['token']}`
                        },
                        body: JSON.stringify({
                            user: user['name']
                        })
                    })
                    const response = await res.json()
                    console.log(response)
                    if (res.ok) {
                        await fetch('http://localhost:4000/api/installation', {
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
                            'Success',
                            `${response.message}`,
                            'success'
                        )
                    } else {
                        Swal.fire(
                            'Something wrong?',
                            `${response.message}`,
                            'error'
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
            <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
        </>
    )
}
