import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import { Link, useNavigate } from 'react-router-dom'
import { getCostumer } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
import ReactPaginate from 'react-paginate'
import { Delete } from './Delete'
const Costumer = () => {
    const [costumer, setCostumer] = useState([])
    const { user } = useAuthContext()
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user && user.token) {
                getCostumer(setCostumer, user, keyword, page, limit, setPage, setLimit, setRows, setPages)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, keyword, page, limit, navigate])

    if (!user) return null

    const formatDate = (date) => {
        const originalDate = new Date(date)
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, "0");
        const day = String(originalDate.getDate()).padStart(2, "0");
        const hour = String(originalDate.getHours()).padStart(2, "0");
        const minute = String(originalDate.getMinutes()).padStart(2, "0");
        const second = String(originalDate.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

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
                                <h1 className="h3 mb-0 text-gray-800">Data Costumer</h1>
                                <div className='d-sm-flex align-items-center mr-5'>
                                    <form onSubmit={searchData}>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                                    </form>
                                </div>
                                <div className='dropdown'>
                                    <Link to='/costumer/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-plus fa-sm text-white-50"></i> Create Costumer</Link>
                                    <select className='d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm ml-1' value={limit} onChange={(e) => setLimit(e.target.value)}>
                                        <option defaultValue={10} key={'10'}>10</option>
                                        {dataLimit.map(item =>
                                            <option defaultValue={item.val} key={item.id}>{item.val}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className='table-responsive-md'>
                                <table className='table table-hover overflow-scroll'>
                                    <thead>
                                        <tr>
                                            <th scope='colSpan'>#</th>
                                            <th scope='colSpan'>Name</th>
                                            <th scope='colSpan'>Address</th>
                                            <th scope='colSpan'>BSMS ID</th>
                                            <th scope='colSpan'>Email</th>
                                            <th scope='colSpan'>INS Building</th>
                                            <th scope='colSpan'>INS Unit</th>
                                            <th scope='colSpan'>Last Update</th>
                                            <th scope='colSpan'>Phone</th>
                                            <th scope='colSpan'>Status</th>
                                            <th scope='colSpan'>Date install</th>
                                            <th scope='colSpan'>TTL</th>
                                            <th scope='colSpan'>Type</th>
                                            <th scope='colSpan'>Action</th>
                                        </tr>
                                    </thead>
                                    {costumer.length > 0 ?
                                        costumer.map((item, index) =>
                                            <tbody key={`body-${item.bsms_id}_${index + 10}`}>
                                                <tr key={`tr-item_${item.bsms_id}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.nama}</td>
                                                    <td>{item.alamat}</td>
                                                    <td>{item.bsms_id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.ins_gedung}</td>
                                                    <td>{item.ins_unit}</td>
                                                    <td>{formatDate(item.lastupdate)}</td>
                                                    <td>{item.nohp}</td>
                                                    <td>{item.status}</td>
                                                    <td>{formatDate(item.tgl_act)}</td>
                                                    <td>{formatDate(item.ttl)}</td>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        <Link to={`/costumer/edit/${item.bsms_id}`}>
                                                            <span className='badge text-bg-warning'>Edit</span>
                                                        </Link>
                                                        <Delete id={item.bsms_id} onDataUpdate={setCostumer} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : <tbody>
                                            <tr>
                                                <td colSpan={'13'} className='text-center'>Data Not Available</td>
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
                                        containerClassName={"pagination pagination-sm"}
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

export default Costumer