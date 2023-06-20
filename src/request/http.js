import axios from "axios"


export const ipOnt = async (setOnt, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/ont?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            },
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setOnt(response.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOlt = async (setOlt, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/olt?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setOlt(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOltById = async (id, setOlt, setHostname, setCapacity, setStatus, setIp, setSite, setDesc, user) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/olt/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setOlt(response?.result['olt_id'])
                setHostname(response?.result['hostname'])
                setCapacity(response?.result['kapasitas'])
                setStatus(response?.result['status'])
                setIp(response?.result['ip_management'])
                setSite(response?.result['site'])
                setDesc(response?.result['deskripsi'])
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOltSelect = async (setOlt, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/olt', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                const opt = response.result?.map(item => ({ value: item.olt_id, label: item.olt_id }))
                setOlt(opt)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getPon = async (setPon, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/pon?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setPon(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getPonById = async (setPon, setFsp, setCapacity, setStatus, setAllocation, setOltId, setDesc, setSplitter, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/pon', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setPon(response.result[0].pon_id)
                setFsp(response.result[0].fsp)
                setCapacity(response.result[0].kapasitas)
                setStatus(response.result[0].status)
                setAllocation(response.result[0].alokasi_site)
                setOltId({ value: response.result[0].olt_id, label: response.result[0].olt_id })
                setSplitter(response.result[0].splitter)
                setDesc(response.result[0].keterangan)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getPonSelect = async (setPonOpt, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/pon-select', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                const opt = response?.result.map(item => ({ value: item.pon_id, label: item.pon_id }))
                setPonOpt(opt)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOdp = async (setOdp, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/odp?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setOdp(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOdpById = async (id, setOdp, setType, setStatus, setUplink, setPort, setCapacity, setLocation, setDesc, setPon, user) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/odp/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setOdp(response?.result[0].odp_id)
                setType(response?.result[0].type)
                setStatus(response?.result[0].status)
                setUplink(response?.result[0].odp_uplink)
                setPort(response?.result[0].odp_uplink_port)
                setCapacity(response?.result[0].kapasitas)
                setLocation(response?.result[0].lokasi)
                setDesc(response?.result[0].deskripsi)
                setPon({ value: response?.result[0].pon_id, label: response?.result[0].pon_id })
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOdpSelect = async (setOdpOpt, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/odp-select', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                const opt = response?.result.map(item => ({ value: item.odp_id, label: item.odp_id }))
                setOdpOpt(opt)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getGpon = async (setGpon, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/gpon?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setGpon(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getGponById = async (id, setGpon, setPort, setLabel, setPath, setStatus, setPon, setOdp, user) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/gpon-id?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setGpon(response?.result['pon_port'])
                setPort(response?.result['odp_port'])
                setLabel(response?.result['labeling'])
                setPath(response?.result['gpon_fullpath'])
                setStatus(response?.result['status'])
                setPon({ value: response?.result['pon_id'], label: response?.result['pon_id'] })
                setOdp({ value: response?.result['odp_id'], label: response?.result['odp_id'] })
            })
    } catch (error) {
        console.log(error)
    }
}

export const getCostumer = async (setCostumer, user, keyword, page, limit, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/costumer?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response.result)
                setCostumer(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const gponSelect = async (setGponOpt, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/gpon-select', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                const opt = response?.result.map(item => ({ value: item.gpon_id, label: item.gpon_id }))
                setGponOpt(opt)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getOntSelect = async (setIpOpt, user) => {
    try {
        await fetch('https://10.81.170.247:4000/api/ont-idle', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setIpOpt(response?.result.map(item => ({ value: item.id, label: item.ip_address })))
            })
    } catch (error) {
        console.log(error)
    }
}

export const getCostumerById = async (id, setBsms, setType, setStatus, setNama, setNohp, setEmail, setGedung, setUnit, setAlamat, user) => {

    try {

        await fetch(`https://10.81.170.247:4000/api/costumer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setBsms(response?.result?.bsms_id)
                setType(response?.result?.type)
                setStatus(response?.result?.status)
                setNama(response?.result?.nama)
                setNohp(response?.result?.nohp)
                setEmail(response?.result?.email)
                setGedung(response?.result?.ins_gedung)
                setUnit(response?.result?.ins_unit)
                setAlamat(response?.result?.alamat)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getLog = async (user, keyword, page, limit, setPage, setLimit, setRows, setPages, setLog) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/history?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setLog(response.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getDismantle = async (user, keyword, page, limit, setPage, setLimit, setRows, setPages, setDismantle) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/dismantle?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setDismantle(response.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getInstallation = async (user, keyword, page, limit, setInstallation, setPage, setLimit, setRows, setPages) => {
    try {
        await fetch(`https://10.81.170.247:4000/api/installation?query=${keyword}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user['token']}`,
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                setInstallation(response?.result)
                setPage(response.page)
                setLimit(response.limit)
                setRows(response.row)
                setPages(response.totalPage)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getBsmsList = async (user, setList) => {
    try {
        const response = await axios.get('https://10.81.170.247:4000/api/costumer-list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        })
        console.log(response.data)
        setList(response.data?.result)
    } catch (error) {
        console.log(error)
    }
}

export const getOntList = async (user, setListOnt) => {
    try {
        const response = await axios.get('https://10.81.170.247:4000/api/ont-list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        })
        console.log(response)
        setListOnt(response.data?.result)
    } catch (error) {
        console.log(error)
    }
}

export const getInstallationById = async (user, setBsms, setStatus, setWo, setCostumer, setAddress, setPack, setTgl, setPic, setGpon, setSn, setIp, setOntuser, setSnstb, setMac, setUsername, setPassword, setPerangkat, setOldip, setDesc, id) => {
    try {
        const response = await axios.get(`https://10.81.170.247:4000/api/installation/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user['token']}`
            }
        })
        console.log(response.data)
        setBsms(response.data?.result['bsms_id'])
        setStatus(response.data?.result['status'])
        setWo(response.data?.result['wo_number'])
        setCostumer(response.data?.result['pelanggan'])
        setAddress(response.data?.result['alamat'])
        setPack(response.data?.result['package'])
        setTgl(response.data?.result['tgl_instalasi'])
        setPic(response.data?.result['teknisi'])
        setGpon(response.data?.result['gpon_path'])
        setSn(response.data?.result['sn_ont'])
        setIp(response.data?.result['ip_ont'])
        setOntuser(response.data?.result['ont_user_pass'])
        setSnstb(response.data?.result['sn_stb'])
        setMac(response.data?.result['mac_stb'])
        setUsername(response.data?.result['inet_username'])
        setPassword(response.data?.result['inet_password'])
        setPerangkat(response.data?.result['status_perangkat'])
        setDesc(response.data?.result['description'])
        setOldip(response.data?.result['ip_ont'])
    } catch (error) {
        console.log(error)
    }
}