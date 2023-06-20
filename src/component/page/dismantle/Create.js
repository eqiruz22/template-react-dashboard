import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../hooks/useAuthContext'

const Create = ({ onDataUpdate, onPage, onLimit, onRow, onTotalpage }) => {
    const [create, setCreate] = useState(false)
    const [bsms, setBsms] = useState('')
    const [desc, setDesc] = useState('')
    const [list, setList] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuthContext()

    const handleCloseCreate = () => setCreate(false)
    const handleOpenCreate = async () => {
        setCreate(true)
        setLoading(true)
        setBtnLoading(true)
        try {
            await fetch('https://10.81.170.247:4000/api/costumer-list', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    setList(response.result)
                    setLoading(false)
                    setBtnLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleChangeDesc = (event) => {
        setDesc(event.target.value)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('https://10.81.170.247:4000/api/dismantle', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    bsms: bsms,
                    keterangan: desc,
                    user: user['name']
                })
            })
            if (res.ok) {
                const response = await res.json()
                await fetch('https://10.81.170.247:4000/api/dismantle', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `bearer ${user['token']}`
                    }
                }).then(res => res.json())
                    .then(res => {
                        onDataUpdate(res.result)
                        onPage(res.page)
                        onLimit(res.limit)
                        onRow(res.row)
                        onTotalpage(res.totalPage)
                    })
                Swal.fire({
                    title: 'created',
                    text: `${response.message}`,
                    icon: 'success'
                })
                handleCloseCreate()
                setDesc('')
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
            <button onClick={handleOpenCreate} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-plus fa-sm text-white-50"></i> Create Dismantle</button>
            <Modal backdrop='static' show={create} onHide={handleCloseCreate} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create Dismantle</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleCreate} name='create-dismantle' id='create-dismantle'>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label htmlFor='bsms'>BSMS ID</label>
                            <select id='bsms' name='bsms' className="selectpicker form-control" value={bsms} onChange={(event) => setBsms(event.target.value)}>
                                {loading ? (
                                    <option disabled>Loading...</option>
                                ) : (
                                    list.map(item =>
                                        <option defaultValue={item.bsms_id} key={`bsms_${item.bsms_id}`}>{item.bsms_id}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='description'>Description</label>
                            <input id='description' name='description' type="text" className={`form-control`} value={desc} onChange={handleChangeDesc} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            {!btnLoading ? (
                                <button type='submit' className='btn btn-primary'>Save</button>
                            ) : (
                                <button className='btn btn-primary'>Loading...</button>
                            )}
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Create