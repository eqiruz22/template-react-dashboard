import React from 'react'
import Sidebar from '../../Sidebar'
import NavbarComponent from '../../Navbar'
import Footer from '../../Footer'
import { useEffect, useState } from 'react'
import { ipOnt } from '../../../request/http'
import { useAuthContext } from '../../hooks/useAuthContext'
import ReactPaginate from 'react-paginate'
import Create from './Create'
import Edit from './Edit'
import Delete from './Delete'
import { useNavigate } from 'react-router-dom'
const Ont = () => {
    const [ont, setOnt] = useState([])
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
                ipOnt(setOnt, user, keyword, page, limit, setPage, setLimit, setRows, setPages)
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [user, keyword, page, limit])

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
                                <h1 className="h3 mb-0 text-gray-800">Data ONT</h1>
                                <div className='d-sm-flex align-items-center mr-5'>
                                    <form onSubmit={searchData}>
                                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="form-control" placeholder="Search for" />
                                    </form>
                                </div>
                                <div className='dropdown'>
                                    <Create onDataUpdate={setOnt} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
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
                                            <th scope='colSpan'>IP Address</th>
                                            <th scope='colSpan'>Status</th>
                                            <th scope='colSpan'>BSMS</th>
                                            <th scope='colSpan'>Action</th>
                                        </tr>

                                    </thead>
                                    {ont.length > 0 ?
                                        ont.map((item, index) =>
                                            <tbody key={`ont_${item.ip_address}`} className='table-group-divider'>
                                                <tr key={`tr-ont_${index + 10}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.ip_address}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.bsms_id}</td>
                                                    <td>
                                                        <Edit id={item.ip_address} onDataUpdate={setOnt} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                        <Delete id={item.ip_address} onDataUpdate={setOnt} onPage={setPage} onLimit={setLimit} onRow={setRows} onTotalpage={setPages} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : <tbody>
                                            <tr>
                                                <td colSpan='11' className='text-center'>Data Not Available</td>
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

export default Ont