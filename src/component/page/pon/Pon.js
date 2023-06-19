import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import { Link, useNavigate } from 'react-router-dom'
import { getPon } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
import ReactPaginate from 'react-paginate'
import { Delete } from './Delete'
const Pon = () => {
    const [pon, setPon] = useState([])
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
                getPon(setPon, user, keyword, page, limit, setPage, setLimit, setRows, setPages)
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
                                <h1 className="h3 mb-0 text-gray-800">Data PON</h1>
                                <div className='d-sm-flex align-items-center mr-5'>
                                    <form onChange={searchData}>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                                    </form>
                                </div>
                                <div className='dropdown'>
                                    <Link to='/pon/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-plus fa-sm text-white-50"></i> Create PON</Link>
                                    <select className='d-none d-sm-inline-block btn btn-sm btn-secondary shadow-sm ml-1' value={limit} onChange={(e) => setLimit(e.target.value)}>
                                        <option defaultValue={10} key={'10'}>10</option>
                                        {dataLimit.map(item =>
                                            <option defaultValue={item.val} key={item.id}>{item.val}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope='colSpan'>#</th>
                                        <th scope='colSpan'>PON ID</th>
                                        <th scope='colSpan'>FSP</th>
                                        <th scope='colSpan'>Capacity</th>
                                        <th scope='colSpan'>Splitter</th>
                                        <th scope='colSpan'>Status</th>
                                        <th scope='colSpan'>Allocation Site</th>
                                        <th scope='colSpan'>OLT ID</th>
                                        <th scope='colSpan'>Description</th>
                                        <th scope='colSpan'>Action</th>
                                    </tr>
                                </thead>
                                {pon.length > 0 ?
                                    pon.map((item, index) =>
                                        <tbody key={`pon_${item.pon_id}`}>
                                            <tr key={`tr-pon_${index + 10}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.pon_id}</td>
                                                <td>{item.fsp}</td>
                                                <td>{item.kapasitas}</td>
                                                <td>{item.splitter}</td>
                                                <td>{item.status}</td>
                                                <td>{item.alokasi_site}</td>
                                                <td>{item.olt_id}</td>
                                                <td>{item.keterangan}</td>
                                                <td>
                                                    <Link to={`/pon/edit/${item.pon_id}`}>
                                                        <button className='btn btn-warning'>Edit</button>
                                                    </Link>
                                                    <Delete id={item.pon_id} onDataUpdate={setPon} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : <tbody>
                                        <tr>
                                            <td colSpan='10' className='text-center'>Data Not Available</td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
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

export default Pon