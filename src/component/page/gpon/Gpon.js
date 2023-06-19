import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getGpon } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
import ReactPaginate from 'react-paginate'
import { Delete } from './Delete'
const Gpon = () => {
    const [gpon, setGpon] = useState([])
    const { user } = useAuthContext()
    const [pages, setPages] = useState(0)
    const [rows, setRows] = useState([])
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState('')
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const id = params.get('id')
    const navigate = useNavigate()
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const user = JSON.parse(storedUser)
            if (user && user.token) {
                getGpon(setGpon, user, keyword, page, limit, setPage, setLimit, setRows, setPages)
            } else {
                navigate('/login')
            }
        } else {
            navigate('/login')
        }
    }, [user, keyword, page, limit, navigate])

    if (!user) return null

    const dataLimit = [
        {
            id: 2,
            val: 20,
        },
        {
            id: 3,
            val: 30
        },
        {
            id: 4,
            val: 40
        },
        {
            id: 5,
            val: 50
        },
        {
            id: 6,
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
                                <h1 className="h3 mb-0 text-gray-800">Data GPON</h1>
                                <div className='d-sm-flex align-items-center mr-5'>
                                    <form onSubmit={searchData}>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                                    </form>
                                </div>
                                <div className='dropdown'>
                                    <Link to='/gpon/create' className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-plus fa-sm text-white-50"></i> Create GPON</Link>
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
                                        <th scope='colSpan'>PON PORT</th>
                                        <th scope='colSpan'>ODP Port</th>
                                        <th scope='colSpan'>Label</th>
                                        <th scope='colSpan'>GPON Fullpath</th>
                                        <th scope='colSpan'>Status</th>
                                        <th scope='colSpan'>PON ID</th>
                                        <th scope='colSpan'>ODP ID</th>
                                        <th scope='colSpan'>Action</th>
                                    </tr>
                                </thead>
                                {gpon.length > 0 ?
                                    gpon.map((item, index) =>
                                        <tbody key={`body-${item.pon_port}`}>
                                            <tr key={`tr-${item.pon_port}-${index + 10}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.pon_port}</td>
                                                <td>{item.odp_port}</td>
                                                <td>{item.labeling}</td>
                                                <td>{item.gpon_fullpath}</td>
                                                <td>{item.status}</td>
                                                <td>{item.pon_id}</td>
                                                <td>{item.odp_id}</td>
                                                <td>
                                                    <Link to={`/gpon/edit?id=${item.pon_port}`}>
                                                        <button className='btn btn-warning'>Edit</button>
                                                    </Link>
                                                    <Delete id={item.pon_port} onDataUpdate={setGpon} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : <tbody>
                                        <tr>
                                            <td colSpan={'9'} className='text-center'>Data Not Available</td>
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

export default Gpon