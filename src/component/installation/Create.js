import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import NavbarComponent from '../Navbar'
import Footer from '../Footer'
import { useAuthContext } from '../hooks/useAuthContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { getBsmsList, getOntList } from '../../request/http'
export const Create = () => {
    const [bsms, setBsms] = useState('')
    const [list, setList] = useState([])
    const [listOnt, setListOnt] = useState([])
    const [status, setStatus] = useState('')
    const [wo, setWo] = useState('')
    const [costumer, setCostumer] = useState('')
    const [address, setAddress] = useState('')
    const [pack, setPack] = useState('')
    const [tgl, setTgl] = useState('')
    const [pic, setPic] = useState('')
    const [gpon, setGpon] = useState('')
    const [sn, setSn] = useState('')
    const [ip, setIp] = useState('')
    const [ontuser, setOntuser] = useState('')
    const [snstb, setSnstb] = useState('')
    const [mac, setMac] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [perangkat, setPerangkat] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()
    const { user } = useAuthContext()
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                getBsmsList(user, setList)
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
                getOntList(user, setListOnt)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, navigate])

    if (!user) {
        return null
    }

    const formatDate = (date) => {
        const dates = new Date(date)
        const year = dates.getFullYear();
        const month = String(dates.getMonth() + 1).padStart(2, "0");
        const day = String(dates.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('https://10.81.170.247:4000/api/installation', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user['token']}`
                },
                body: JSON.stringify({
                    bsms_id: bsms,
                    status: status,
                    wo_number: wo,
                    pelanggan: costumer,
                    alamat: address,
                    package: pack,
                    tgl_instalasi: formatDate(tgl),
                    teknisi: pic,
                    gpon_path: gpon,
                    sn_ont: sn,
                    ip_ont: ip,
                    ont_user_pass: ontuser,
                    sn_stb: snstb,
                    mac_stb: mac,
                    inet_username: username,
                    inet_password: password,
                    status_perangkat: perangkat,
                    description: desc,
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
                navigate('/')
            } else {
                Swal.fire(
                    'Something wrong!',
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
                        <h1 className="h3 mb-0 text-gray-800 text-center">Create Installation Report</h1>
                        <div className='container'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor='bsms' className="form-label">BSMS</label>
                                    <select name='bsms' id='bsms' value={bsms} onChange={(event) => setBsms(event.target.value)} className={`form-select`}>
                                        <option defaultValue={''}>-- Choose one --</option>
                                        {list.map(item =>
                                            <option defaultValue={item.bsms_id} key={item.bsms_id}>{item.bsms_id}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='status' className="form-label">Status</label>
                                    <select name='status' id='status' value={status} onChange={(event) => setStatus(event.target.value)} className={`form-select`}>
                                        <option defaultValue="">-- Choose one --</option>
                                        <option defaultValue={'Active'} key={'Active'}>Active</option>
                                        <option defaultValue={'Dismantle'} key={'Dismantle'}>Dismantle</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="wo" className='form-label'>Wo Number</label>
                                    <input type="text" id='wo' name='wo' value={wo} onChange={(event) => setWo(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="pelanggan" className='form-label'>Costumer</label>
                                    <input type="text" id='pelanggan' name='pelanggan' value={costumer} onChange={(event) => setCostumer(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="ip" className='form-label'>IP ONT</label>
                                    <select name="ip" id="ip" className='form-control' value={ip} onChange={(event) => setIp(event.target.value)}>
                                        <option defaultValue={''}>-- Choose one --</option>
                                        {listOnt.map((item, index) =>
                                            <option defaultValue={item.ip_address} key={index * 2}>{item.ip_address}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="alamat" className='form-label'>Address</label>
                                    <input type="text" id='alamat' name='alamat' value={address} onChange={(event) => setAddress(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="package" className='form-label'>Package</label>
                                    <input type="text" id='package' name='package' value={pack} onChange={(event) => setPack(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="tgl" className='form-label'>Installation Date</label>
                                    <input type="date" id='tgl' name='tgl' value={tgl} onChange={(event) => setTgl(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="teknisi" className='form-label'>PIC</label>
                                    <input type="text" id='teknisi' name='teknisi' value={pic} onChange={(event) => setPic(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="path" className='form-label'>GPON Path</label>
                                    <input type="text" id='path' name='path' value={gpon} onChange={(event) => setGpon(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="snont" className='form-label'>SN ONT</label>
                                    <input type="text" id='snont' name='snont' value={sn} onChange={(event) => setSn(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="ontuser" className='form-label'>ONT User Password</label>
                                    <input type="text" id='ontuser' name='ontuser' value={ontuser} onChange={(event) => setOntuser(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="snstb" className='form-label'>SN STB</label>
                                    <input type="text" id='snstb' name='snstb' value={snstb} onChange={(event) => setSnstb(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="macstb" className='form-label'>MAC STB</label>
                                    <input type="text" id='macstb' name='macstb' value={mac} onChange={(event) => setMac(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="user" className='form-label'>INET Username</label>
                                    <input type="text" id='user' name='user' value={username} onChange={(event) => setUsername(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className='form-label'>INET Password</label>
                                    <input type="text" id='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="perangkat" className='form-label'>Device Status</label>
                                    <input type="text" id='perangkat' name='perangkat' value={perangkat} onChange={(event) => setPerangkat(event.target.value)} className='form-control' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="desc" className='form-label'>Description</label>
                                    <input type="text" id='desc' name='desc' value={desc} onChange={(event) => setDesc(event.target.value)} className='form-control' />
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
