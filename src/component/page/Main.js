import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import NavbarComponent from '../Navbar'
import Footer from '../Footer'
import { useAuthContext } from '../hooks/useAuthContext'
import ReactPaginate from 'react-paginate'
import { Link, useNavigate } from 'react-router-dom'
import { getInstallation } from '../../request/http'
import { Delete } from '../installation/Delete'

const Main = () => {
    const [installation, setInstallation] = useState([])
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState('')
    const { user } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                getInstallation(user, keyword, page, limit, setInstallation, setPage, setLimit, setRows, setPages)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, keyword, page, limit, navigate])

    if (!user) return null

    const dataLimit = [
        {
            id: 1,
            val: 20
        },
        {
            id: 2,
            val: 30
        },
        {
            id: 3,
            val: 40
        },
        {
            id: 4,
            val: 50
        },
        {
            id: 5,
            val: 100
        }
    ]

    const changePage = ({ selected }) => {
        setPage(selected)
    }

    const searchData = (event) => {
        event.preventDefault()
        setPage(0)
        setKeyword(query)
    }

    return (
        <div id='wrapper'>
            <Sidebar />
            <div id='content-wrapper' className='d-flex flex-column'>
                <div id='content'>
                    <NavbarComponent />
                    <div className='container-fluid'>
                        <div className='px-5'>
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Data Installation</h1>
                                <div className='d-sm-flex align-items-center mr-5'>
                                    <form onSubmit={searchData}>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                                    </form>
                                </div>
                                <div className='dropdown'>
                                    <Link to='/installation/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-plus fa-sm text-white-50"></i> Installation</Link>
                                    <select className='d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm ml-1' value={limit} onChange={(e) => setLimit(e.target.value)}>
                                        <option defaultValue={10} key={'10'}>10</option>
                                        {dataLimit.map(item =>
                                            <option defaultValue={item.val} key={item.id}>{item.val}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='table-responsive'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope='colSpan'>#</th>
                                            <th scope='colSpan'>BSMS</th>
                                            <th scope='colSpan'>Status</th>
                                            <th scope='colSpan'>WO</th>
                                            <th scope='colSpan'>Costumer</th>
                                            <th scope='colSpan'>Address</th>
                                            <th scope='colSpan'>Package</th>
                                            <th scope='colSpan'>Installation Date</th>
                                            <th scope='colSpan'>PIC</th>
                                            <th scope='colSpan'>GPON</th>
                                            <th scope='colSpan'>SN ONT</th>
                                            <th scope='colSpan'>IP ONT</th>
                                            <th scope='colSpan'>ONT user</th>
                                            <th scope='colSpan'>SN STB</th>
                                            <th scope='colSpan'>MAC STB</th>
                                            <th scope='colSpan'>Username</th>
                                            <th scope='colSpan'>Password</th>
                                            <th scope='colSpan'>Status</th>
                                            <th scope='colSpan'>Description</th>
                                            <th scope='colSpan'>Action</th>
                                        </tr>
                                    </thead>
                                    {installation.length > 0 ?
                                        installation.map((item, index) =>
                                            <tbody key={`body-installation_${index * 2}`} className='table-group-divider'>
                                                <tr key={`tr-installation_${index + 10}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.bsms_id}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.wo_number}</td>
                                                    <td>{item.pelanggan}</td>
                                                    <td>{item.alamat}</td>
                                                    <td>{item.package}</td>
                                                    <td>{item.tgl_instalasi}</td>
                                                    <td>{item.teknisi}</td>
                                                    <td>{item.gpon_path}</td>
                                                    <td>{item.sn_ont}</td>
                                                    <td>{item.ip_address}</td>
                                                    <td>{item.ont_user_pass}</td>
                                                    <td>{item.sn_stb}</td>
                                                    <td>{item.mac_stb}</td>
                                                    <td>{item.inet_username}</td>
                                                    <td>{item.inet_password}</td>
                                                    <td>{item.status_perangkat}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <Link to={`/installation/edit/${item.bsms_id}`}>
                                                            <button className='btn btn-sm btn-warning'>Edit</button>
                                                        </Link>
                                                        <Delete id={item.bsms_id} onDataUpdate={setInstallation} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) :
                                        <tbody>
                                            <tr>
                                                <td colSpan={'20'} className='text-center'>Data Not Available</td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                            <div className='d-sm-flex align-items-center justify-content-between'>
                                <p>Total Data : {rows}</p>
                                <nav aria-label="Page navigation example" key={rows}>
                                    <ReactPaginate
                                        previousLabel={"<<"}
                                        nextLabel={">>"}
                                        pageCount={pages}
                                        onPageChange={changePage}
                                        containerClassName={"pagination"}
                                        pageLinkClassName={"page-link"}
                                        previousLinkClassName={"page-link"}
                                        nextLinkClassName={"page-link"}
                                        activeLinkClassName={"page-item active"}
                                        disabledLinkClassName={"page-item disabled"}
                                    />
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Main