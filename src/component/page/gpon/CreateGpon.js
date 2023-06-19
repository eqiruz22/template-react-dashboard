import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import Select from 'react-select'
import { getOdpSelect, getPonSelect } from '../../../request/http'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
const CreateGpon = () => {
    const [ponport, setPonport] = useState('')
    const [errorPonport, setErrorPonport] = useState('')
    const [port, setPort] = useState('')
    const [errorPort, setErrorPort] = useState('')
    const [label, setLabel] = useState('')
    const [errorLabel, setErrorLabel] = useState('')
    const [path, setPath] = useState('')
    const [errorPath, setErrorPath] = useState('')
    const [status, setStatus] = useState('')
    const [pon, setPon] = useState('')
    const [odp, setOdp] = useState('')
    const [ponOpt, setPonOpt] = useState([])
    const [odpOpt, setOdpOpt] = useState([])
    const navigate = useNavigate()
    const { user } = useAuthContext()
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                getPonSelect(setPonOpt, user)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate])

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                getOdpSelect(setOdpOpt, user)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate])

    if (!user) return null

    const handleChangePonponrt = (event) => {
        setPonport(event.target.value)
        if (!event.target.value) {
            setErrorPonport('PON Port is required!')
        } else {
            setErrorPonport('')
        }
    }

    const handleChangePort = (event) => {
        setPort(event.target.value)
        if (!event.target.value) {
            setErrorPort('PORT is required!')
        } else {
            setErrorPort('')
        }
    }

    const handleChangeLabel = (event) => {
        setLabel(event.target.value)
        if (!event.target.value) {
            setErrorLabel('Label is required!')
        } else {
            setErrorLabel('')
        }
    }

    const handleChangePath = (event) => {
        setPath(event.target.value)
        if (!event.target.value) {
            setErrorPath('GPON FULLPATH is required')
        } else {
            setErrorPath('')
        }
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('http://localhost:4000/api/gpon', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    pon_port: ponport,
                    pon_id: pon['value'],
                    odp_id: odp['value'],
                    odp_port: port,
                    labeling: label,
                    gpon_fullpath: path,
                    status: status,
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
                navigate('/gpon')
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
                        <h1 className="h3 mb-0 text-gray-800 text-center">Create GPON</h1>
                        <div className='container'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">PON PORT</label>
                                    <input type="text" value={ponport} onChange={handleChangePonponrt} className={`form-control ${errorPonport && 'is-invalid'}`} />
                                    {errorPonport && <span className='invalid-feedback'>{errorPonport}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">PON ID</label>
                                    <Select options={ponOpt} value={pon} onChange={(selectOptions) => setPon(selectOptions)} />
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">ODP ID</label>
                                    <Select options={odpOpt} value={odp} onChange={(selectOptions) => setOdp(selectOptions)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">PORT</label>
                                    <input type="text" value={port} onChange={handleChangePort} className={`form-control ${errorPort && 'is-invalid'}`} />
                                    {errorPort && <span className='invalid-feedback'>{errorPort}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Label</label>
                                    <input type="text" value={label} onChange={handleChangeLabel} className={`form-control ${errorLabel && 'is-invalid'}`} />
                                    {errorLabel && <span className='invalid-feedback'>{errorLabel}</span>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">GPON FULLPATH</label>
                                    <input type="text" value={path} onChange={handleChangePath} className={`form-control ${errorPath && 'is-invalid'}`} />
                                    {errorPath && <span className='invalid-feedback'>{errorPath}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">Status</label>
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

export default CreateGpon