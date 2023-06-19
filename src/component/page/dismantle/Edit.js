import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../hooks/useAuthContext'
const Edit = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage }) => {
    const [edit, setEdit] = useState(false)
    const [bsms, setBsms] = useState('')
    const [desc, setDesc] = useState('')
    const [dismantleId, setDismantleId] = useState('')
    const [list, setList] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuthContext()
    const getDetailDismantle = async () => {
        try {
            await fetch(`http://localhost:4000/api/dismantle/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    setDismantleId(response?.result['id'])
                    setBsms(response?.result['bsms_id'])
                    setDesc(response?.result['keterangan'])
                    setLoading(false)
                    setBtnLoading(false)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const getCostumerList = async () => {
        try {
            await fetch('http://localhost:4000/api/costumer-list', {
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
    const handleCloseEdit = () => setEdit(false)
    const handleOpenEdit = async () => {
        setEdit(true)
        setLoading(true)
        setBtnLoading(true)
        getDetailDismantle()
        getCostumerList()
    }
    const handleChangeDesc = (event) => {
        setDesc(event.target.value)
    }

    console.log(bsms, desc)

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4000/api/dismantle', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    id: dismantleId,
                    bsms: bsms,
                    keterangan: desc,
                    user: user['name']
                })
            })
            if (res.ok) {
                const response = await res.json()
                await fetch('http://localhost:4000/api/dismantle', {
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
                    title: 'Updated',
                    text: `${response.message}`,
                    icon: 'success'
                })
                handleCloseEdit()
                setDesc('')
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <>
            <button onClick={handleOpenEdit} className="btn btn-sm btn-warning">Edit</button>
            <Modal backdrop='static' show={edit} onHide={handleCloseEdit} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Dismantle</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate} name='create-dismantle' id='create-dismantle'>
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

export default Edit