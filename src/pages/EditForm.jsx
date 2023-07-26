import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const EditFrom = () => {

    const [nama, setNama] = useState('')
    const [address, setAddress] = useState('')

    const Navigate = useNavigate()

    const { id } = useParams()
    const fetchData = async () => {

        const response = await axios.get(`http://192.168.18.210:4012/api/user/${id}`)
        setNama(response.data.name)
        setAddress(response.data.address)
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://192.168.18.210:4012/api/user/${id}`, {
                name: nama,
                address: address
            })
            Navigate('/DummyApi')
        } catch (error) {

        }
    }

    useEffect(() => {

        fetchData()
    }, [])


    return (
        <div>



            <form className='row g-3 m-5' onSubmit={submit}>
                <div className="col-md-6">
                    names
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Your Name' />
                </div>
                <div className="col-6">
                    address
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Add</button>

                </div>
            </form>



        </div>
    )
}

export default EditFrom
