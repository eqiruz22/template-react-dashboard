import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { getOltById } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
const EditOlt = () => {
    const [olt, setOlt] = useState('')
    const [errorOlt, setErrorOlt] = useState('')
    const [hostname, setHostname] = useState('')
    const [errorHostname, setErrorHostname] = useState('')
    const [capacity, setCapacity] = useState('')
    const [errorCapacity, setErrorCapacity] = useState('')
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [ip, setIp] = useState('')
    const [errorIp, setErrorIp] = useState('')
    const [site, setSite] = useState('')
    const [errorSite, setErrorSite] = useState('')
    const [desc, setDesc] = useState('')
    const [errorDesc, setErrorDesc] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    useEffect(() => {
        getOltById(id, setOlt, setHostname, setCapacity, setStatus, setIp, setSite, setDesc, user)
    }, [id, user])

    if (!user) return null

    const handleChangeOlt = (event) => {
        setOlt(event.target.value)
        if (!event.target.value) {
            setErrorOlt('OLT ID is required!')
        } else {
            setErrorOlt('')
        }
    }

    const handleChangeHostname = (event) => {
        setHostname(event.target.value)
        if (!event.target.value) {
            setErrorHostname('Hostname is required!')
        } else {
            setErrorHostname('')
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

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
        if (!event.target.value) {
            setErrorStatus('Status is required!')
        } else {
            setErrorStatus('')
        }
    }

    const handleChangeIp = (event) => {
        setIp(event.target.value)
        if (!event.target.value) {
            setErrorIp('IP Management is required!')
        } else {
            setErrorIp('')
        }
    }

    const handleChangeSite = (event) => {
        setSite(event.target.value)
        if (!event.target.value) {
            setErrorSite('Site is required!')
        } else {
            setErrorSite('')
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

    const handleEdit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4000/api/olt', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    olt_id: olt,
                    hostname: hostname,
                    kapasitas: capacity,
                    status: status,
                    ip: ip,
                    site: site,
                    deskripsi: desc,
                    user: user['name']
                })
            })
            const response = await res.json()
            console.log(response)
            if (res.ok) {
                Swal.fire({
                    title: 'Success',
                    text: `${response.message}`,
                    icon: 'success'
                })
                navigate('/olt')
            } else {
                Swal.fire({
                    title: 'Something wrong?',
                    text: `${response.message}`,
                    icon: 'warning'
                })
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
                        <h1 className="h3 mb-0 text-gray-800 text-center">Edit OLT</h1>
                        <div className='container'>
                            <form onSubmit={handleEdit}>
                                <div className="mb-3">
                                    <label className="form-label">OLT ID</label>
                                    <input type="text" value={olt} onChange={handleChangeOlt} className={`form-control ${errorOlt && 'is-invalid'}`} />
                                    {errorOlt && <span className='invalid-feedback'>{errorOlt}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Hostname</label>
                                    <input type="text" value={hostname} onChange={handleChangeHostname} className={`form-control ${errorHostname && 'is-invalid'}`} />
                                    {errorHostname && <span className='invalid-feedback'>{errorHostname}</span>}
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
                                    <label className="form-label">IP Management</label>
                                    <input type="text" value={ip} onChange={handleChangeIp} className={`form-control ${errorIp && 'is-invalid'}`} />
                                    {errorIp && <span className='invalid-feedback'>{errorIp}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Site</label>
                                    <input type="text" value={site} onChange={handleChangeSite} className={`form-control ${errorSite && 'is-invalid'}`} />
                                    {errorSite && <span className='invalid-feedback'>{errorSite}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" value={desc} onChange={handleChangeDesc} className={`form-control ${errorDesc && 'is-invalid'}`} />
                                    {errorDesc && <span className='invalid-feedback'>{errorDesc}</span>}
                                </div>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-primary'>Edit</button>
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

export default EditOlt