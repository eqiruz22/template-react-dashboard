import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { getOltSelect } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
const CreatePon = () => {
    const [pon, setPon] = useState('')
    const [errorPon, setErrorPon] = useState('')
    const [fsp, setFsp] = useState('')
    const [errorFsp, setErrorFsp] = useState('')
    const [capacity, setCapacity] = useState('')
    const [errorCapacity, setErrorCapacity] = useState('')
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const [allocation, setAllocation] = useState('')
    const [errorAllocation, setErrorAllocation] = useState('')
    const [oltId, setOltId] = useState('')
    const [desc, setDesc] = useState('')
    const [errorDesc, setErrorDesc] = useState('')
    const [splitter, setSplitter] = useState('')
    const [errorSplitter, setErrorSplitter] = useState('')
    const [olt, setOlt] = useState([])
    const navigate = useNavigate()
    const { user } = useAuthContext()
    useEffect(() => {
        getOltSelect(setOlt, user)
    }, [user])

    if (!user) return null

    const handleChangePon = (event) => {
        setPon(event.target.value)
        if (!event.target.value) {
            setErrorPon('PON ID is required!')
        } else {
            setErrorPon('')
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

    const handleChangeAllocation = (event) => {
        setAllocation(event.target.value)
        if (!event.target.value) {
            setErrorAllocation('Allocation is required!')
        } else {
            setErrorAllocation('')
        }
    }

    const handleChangeSplitter = (event) => {
        setSplitter(event.target.value)
        if (!event.target.value) {
            setErrorSplitter('Splitter is required!')
        } else {
            setErrorSplitter('')
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4000/api/pon', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    pon_id: pon,
                    fsp: fsp,
                    capacity: capacity,
                    splitter: splitter,
                    status: status,
                    alokasi: allocation,
                    desc: desc,
                    olt_id: oltId['value'],
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
                navigate('/pon')
            } else {
                Swal.fire(
                    'Error !',
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
                        <h1 className="h3 mb-0 text-gray-800 text-center">Create PON</h1>
                        <div className='container'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">PON ID</label>
                                    <input type="text" value={pon} onChange={handleChangePon} className={`form-control ${errorPon && 'is-invalid'}`} />
                                    {errorPon && <span className='invalid-feedback'>{errorPon}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">FSP</label>
                                    <input type="text" value={fsp} onChange={handleChangeFsp} className={`form-control ${errorFsp && 'is-invalid'}`} />
                                    {errorFsp && <span className='invalid-feedback'>{errorFsp}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Capacity</label>
                                    <input type="text" value={capacity} onChange={handleChangeCapacity} className={`form-control ${errorCapacity && 'is-invalid'}`} />
                                    {errorCapacity && <span className='invalid-feedback'>{errorCapacity}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Splitter</label>
                                    <input type="text" value={splitter} onChange={handleChangeSplitter} className={`form-control ${errorSplitter && 'is-invalid'}`} />
                                    {errorSplitter && <span className='invalid-feedback'>{errorSplitter}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <input type="text" value={status} onChange={handleChangeStatus} className={`form-control ${errorStatus && 'is-invalid'}`} />
                                    {errorStatus && <span className='invalid-feedback'>{errorStatus}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Allocation</label>
                                    <input type="text" value={allocation} onChange={handleChangeAllocation} className={`form-control ${errorAllocation && 'is-invalid'}`} />
                                    {errorAllocation && <span className='invalid-feedback'>{errorAllocation}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" value={desc} onChange={handleChangeDesc} className={`form-control ${errorDesc && 'is-invalid'}`} />
                                    {errorDesc && <span className='invalid-feedback'>{errorDesc}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">OLT ID</label>
                                    <Select options={olt} value={oltId} onChange={(selectOption) => setOltId(selectOption)} />
                                </div>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-primary'>Create</button>
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

export default CreatePon