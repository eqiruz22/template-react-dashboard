import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { getOdpById, getPonSelect } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
const EditOdp = () => {
    const [odp, setOdp] = useState('')
    const [errorOdp, setErrorOdp] = useState('')
    const [type, setType] = useState('')
    const [errorType, setErrorType] = useState('')
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [uplink, setUplink] = useState('')
    const [errorUplink, setErrorUplink] = useState('')
    const [port, setPort] = useState('')
    const [errorPort, setErrorPort] = useState('')
    const [capacity, setCapacity] = useState('')
    const [errorCapacity, setErrorCapacity] = useState('')
    const [location, setLocation] = useState('')
    const [errorLocation, setErrorLocation] = useState('')
    const [desc, setDesc] = useState('')
    const [errorDesc, setErrorDesc] = useState('')
    const [pon, setPon] = useState('')
    const [fsp, setFsp] = useState('')
    const [errorFsp, setErrorFsp] = useState('')
    const [ponOpt, setPonOpt] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    useEffect(() => {
        getOdpById(id, setOdp, setType, setStatus, setUplink, setPort, setCapacity, setLocation, setDesc, setPon, user)
    }, [id, user])

    useEffect(() => {
        getPonSelect(setPonOpt, user)
    }, [user])

    if (!user) return null

    const handleChangeOdp = (event) => {
        setOdp(event.target.value)
        if (!event.target.value) {
            setErrorOdp('ODP ID is required!')
        } else {
            setErrorOdp('')
        }
    }

    const handleChangeFsp = (event) => {
        setFsp(event.target.value)
        if (!event.target.value) {
            setErrorFsp('FSP is required!')
        } else {
            setErrorFsp('')
        }
    }

    const handleChangeType = (event) => {
        setType(event.target.value)
        if (!event.target.value) {
            setErrorType('Type is required!')
        } else {
            setErrorType('')
        }
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
        if (!event.target.value) {
            setErrorStatus('Status is required!')
        } else {
            setErrorStatus('')
        }
    }

    const handleChangeUplink = (event) => {
        setUplink(event.target.value)
        if (!event.target.value) {
            setErrorUplink('ODP Uplink is required!')
        } else {
            setErrorUplink('')
        }
    }

    const handleChangePort = (event) => {
        setPort(event.target.value)
        if (!event.target.value) {
            setErrorPort('UDP Uplink Port is required!')
        } else {
            setErrorPort('')
        }
    }

    const handleChangeCapacity = (event) => {
        setCapacity(event.target.value)
        if (!event.target.value) {
            setErrorCapacity('Capacity is required!')
        } else {
            setErrorCapacity('')
        }
    }

    const handleChangeLocation = (event) => {
        setLocation(event.target.value)
        if (!event.target.value) {
            setErrorLocation('Location is required!')
        } else {
            setErrorLocation('')
        }
    }

    const handleChangeDesc = (event) => {
        setDesc(event.target.value)
        if (!event.target.value) {
            setErrorDesc('Description is required!')
        } else {
            setErrorDesc('')
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('https://10.81.170.247:4000/api/odp', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    odp_id: odp,
                    type: type,
                    status: status,
                    odp_uplink: uplink,
                    odp_uplink_port: port,
                    kapasitas: capacity,
                    lokasi: location,
                    deskripsi: desc,
                    pon_id: pon['value'],
                    oldOdp: id,
                    user: user['name']
                })
            })
            const response = await res.json()
            if (res.ok) {
                Swal.fire({
                    title: 'Success',
                    text: `${response.message}`,
                    icon: 'success'
                })
                navigate('/odp')
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

    return (
        <div id='wrapper'>
            <Sidebar />
            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <NavbarComponent />
                    <div className='container-fluid'>
                        <h1 className="h3 mb-2 text-gray-800 text-center">Edit ODP</h1>
                        <div className='container'>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">ODP ID</label>
                                    <input type="text" value={odp} onChange={handleChangeOdp} className={`form-control ${errorOdp && 'is-invalid'}`} />
                                    {errorOdp && <span className='invalid-feedback'>{errorOdp}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <input type="text" value={type} onChange={handleChangeType} className={`form-control ${errorType && 'is-invalid'}`} />
                                    {errorType && <span className='invalid-feedback'>{errorType}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Capacity</label>
                                    <input type="text" value={capacity} onChange={handleChangeCapacity} className={`form-control ${errorCapacity && 'is-invalid'}`} />
                                    {errorCapacity && <span className='invalid-feedback'>{errorCapacity}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <input type="text" value={status} onChange={handleChangeStatus} className={`form-control ${errorStatus && 'is-invalid'}`} />
                                    {errorStatus && <span className='invalid-feedback'>{errorStatus}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ODP Uplink</label>
                                    <input type="text" value={uplink} onChange={handleChangeUplink} className={`form-control ${errorUplink && 'is-invalid'}`} />
                                    {errorUplink && <span className='invalid-feedback'>{errorUplink}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ODP Uplink Port</label>
                                    <input type="text" value={port} onChange={handleChangePort} className={`form-control ${errorPort && 'is-invalid'}`} />
                                    {errorPort && <span className='invalid-feedback'>{errorPort}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" value={desc} onChange={handleChangeDesc} className={`form-control ${errorDesc && 'is-invalid'}`} />
                                    {errorDesc && <span className='invalid-feedback'>{errorDesc}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Location</label>
                                    <input type="text" value={location} onChange={handleChangeLocation} className={`form-control ${errorLocation && 'is-invalid'}`} />
                                    {errorLocation && <span className='invalid-feedback'>{errorLocation}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">PON ID</label>
                                    <Select options={ponOpt} value={pon} onChange={(selectOptions) => setPon(selectOptions)} />
                                </div>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-primary'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default EditOdp