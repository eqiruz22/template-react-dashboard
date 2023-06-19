import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useAuthContext } from '../../hooks/useAuthContext'
const Edit = ({ id, onDataUpdate, onPage, onLimit, onRow, onTotalpage }) => {
    const [modal, setModal] = useState(false)
    const [ip, setIp] = useState('')
    const [errorIp, setErrorIp] = useState('')
    const [status, setStatus] = useState('')
    const [bsms, setBsms] = useState('')
    const [list, setList] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useAuthContext()
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
    const getOntDetail = async () => {
        try {
            await fetch(`http://localhost:4000/api/ont-ip?ip=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response)
                    setIp(response?.result['ip_address'])
                    setStatus(response?.result['status'])
                    setBsms(response?.result['bsms_id'])
                })
        } catch (error) {
            console.log(error)
        }
    }
    const handleClose = () => setModal(false)
    const handleOpen = async () => {
        setModal(true)
        setLoading(true)
        setBtnLoading(true)
        getCostumerList()
        getOntDetail()
    }

    const handleChangeIp = (event) => {
        setIp(event.target.value)
        if (!event.target.value) {
            setErrorIp('This field is required!')
        } else {
            setErrorIp('')
        }
    }

    const handleChangeBsms = (event) => {
        setBsms(event.target.value)
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4000/api/ont', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    ip_address: ip,
                    status: status,
                    bsms_id: bsms,
                    oldip: id,
                    user: user['name']
                })
            })
            const response = await res.json()
            console.log(response)
            if (res.ok) {
                await fetch('http://localhost:4000/api/ont', {
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
                setIp('')
                handleClose()
            } else {
                Swal.fire(
                    'something wrong?',
                    `${response.message}`,
                    'warning'
                )
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button onClick={handleOpen} className="btn btn-sm btn-warning">Edit</button>
            <Modal backdrop='static' show={modal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit ONT</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-3 mt-3">
                            <label htmlFor='ip'>IP Address</label>
                            <input className={`form-control ${errorIp && 'is-invalid'}`} value={ip} onChange={handleChangeIp} type="text" />
                            {errorIp && <span className='invalid-feedback'>{errorIp}</span>}
                        </div>
                        <div className='mb-3 mt-3'>
                            <label htmlFor='bsms'>BSMS ID</label>
                            <select id='bsms' name='bsms' value={bsms} onChange={handleChangeBsms} className='form-control'>
                                {loading ? (
                                    <option disabled>Loading...</option>
                                ) : (
                                    list.map(item =>
                                        <option defaultValue={item.bsms_id} key={item.bsms_id}>{item.bsms_id}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor='status'>Status</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value={'active'} onChange={handleChangeStatus} name="flexRadioDefault" id="flexRadioDefault1" checked={status === 'active'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Active
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" value={'idle'} onChange={handleChangeStatus} name="flexRadioDefault" id="flexRadioDefault2" checked={status === 'idle'} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Idle
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {!btnLoading ? (
                            <div>
                                <button type="submit" className="btn btn-success">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-success">
                                    Loading
                                </button>
                            </div>
                        )}
                    </Modal.Footer>
                </form>
            </Modal>

        </>
    )
}

export default Edit