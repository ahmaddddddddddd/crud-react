import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


const Create = () => {

    const [nama, setNama] = useState('')
    const [address, setAddress] = useState('')

    const Navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://192.168.18.210:4012/api/user', {
                name: nama,
                address: address
            })
            Navigate('/DummyApi')
        } catch (error) {

        }
    }




    return (
        <div>
            <form className='row g-3 m-5' onSubmit={submit}>
                <div className="col-md-6">
                    nama
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} placeholder='Your Name' />
                </div>
                <div className="col-6">
                    address
                    <input type="text" className="form-control  " value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Add</button>

                </div>
            </form>


        </div>
    )
}

export default Create
