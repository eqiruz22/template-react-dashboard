import React, { useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

const CreateCostumer = () => {
    const [bsms, setBsms] = useState('')
    const [errorBsms, setErrorBsms] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [nama, setNama] = useState('')
    const [nohp, setNohp] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [gedung, setGedung] = useState('')
    const [unit, setUnit] = useState('')
    const [alamat, setAlamat] = useState('')
    const navigate = useNavigate()
    const { user } = useAuthContext()

    if (!user) return null

    const handleChangeBsms = (event) => {
        setBsms(event.target.value)
        if (!event.target.value) {
            setErrorBsms('BSMS ID is required!')
        } else {
            setErrorBsms('')
        }
    }

    const optStatus = [
        {
            id: 1,
            value: 'New'
        },
        {
            id: 2,
            value: 'Temporary'
        },
        {
            id: 3,
            value: 'Active'
        },
        {
            id: 4,
            value: 'inActive'
        },
        {
            id: 5,
            value: 'Void'
        }
    ]

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const handleChangeEmail = (event) => {
        const mail = event.target.value
        setEmail(mail)
        if (!emailRegex.test(mail)) {
            setErrorEmail('Invalid email address!')
        } else {
            setErrorEmail('')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('https://10.81.170.247:4000/api/costumer', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    bsms_id: bsms,
                    type: type,
                    status: status,
                    nama: nama,
                    nohp: nohp,
                    email: email,
                    ins_gedung: gedung,
                    ins_unit: unit,
                    alamat: alamat,
                    user: user['name']
                })
            })
            const response = await res.json()
            if (res.ok) {
                Swal.fire(
                    'Created',
                    `${response.message}`,
                    'success'
                )
                navigate('/costumer')
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
        <div id='wrapper'>
            <Sidebar />
            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <NavbarComponent />
                    <div className='container-fluid'>
                        <h1 className="h3 mb-3 text-gray-800 text-center">Create Costumer</h1>
                        <div className='container'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">BSMS ID</label>
                                    <input type="text" value={bsms} onChange={handleChangeBsms} className={`form-control ${errorBsms && 'is-invalid'}`} />
                                    {errorBsms && <span className='invalid-feedback'>{errorBsms}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Type</label>
                                    <input type="text" value={type} onChange={(event) => setType(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Status</label>
                                    <select value={status} onChange={(event) => setStatus(event.target.value)} className='form-select'>
                                        <option defaultValue={''} key={'default-status'}>-- Choose --</option>
                                        {optStatus.map(item =>
                                            <option defaultValue={item.value} key={item.id}>{item.value}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Nama</label>
                                    <input type="text" value={nama} onChange={(event) => setNama(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>NO HP</label>
                                    <input type="text" value={nohp} onChange={(event) => setNohp(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input type="text" value={email} onChange={handleChangeEmail} className={`form-control ${errorEmail ? 'is-invalid' : ''}`} />
                                    {errorEmail && <span className='invalid-feedback'>{errorEmail}</span>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Instalasi Gedung</label>
                                    <input type="text" value={gedung} onChange={(event) => setGedung(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Instalasi Unit</label>
                                    <input type="text" value={unit} onChange={(event) => setUnit(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Alamat</label>
                                    <input type="text" value={alamat} onChange={(event) => setAlamat(event.target.value)} className='form-control' />
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

export default CreateCostumer