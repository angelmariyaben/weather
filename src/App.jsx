import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [search,setSearch]=useState("")
  const [data,setData]=useState({})
  const clouds =[
    {weather:"few clouds",image:"./few.jpeg"},
    {weather:"scatterd clouds",image:"./scatterd.jpeg"},
    {weather:"broken clouds",image:"./broken.jpeg"},
    {weather:"overcast clouds",image:"./overcast.jpeg"},

  ]
  async function getweather(){

 if(search!=""){
  const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=68e0e46869bd61224f1600bec15d79c3`)
  //console.log(res.data);
  setData(res.data) 
 }
 else{
  alert("enter Location")
 } 
}
useEffect(()=>{
  async function getKochi(){
    const kochiRes=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=68e0e46869bd61224f1600bec15d79c3`)
    setData(kochiRes.data)
  }
  getKochi
})
  
  return (
  <>
  <div className="container-fluid position-relative">

    <section className="vh-100" style={{backgroundcolor: "#f5f6f7"}}>
      <div className="container py-5 h-100">
  
        <div className="row d-flex  h-100">

          <div className="col-md-10 col-lg-8 col-xl-6">
    
           <div className="container-fluid m-3">
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" id='input' onChange={(e)=>setData(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-primary" onClick={getweather} type="submit">Search</button>
                    </form>
                  </div>

                    

                        <div className="card bg-dark text-white" style={{borderRadius: "40px"}}>
                          <div className="bg-image" style={{borderRadius: "35px;"}}>
                            <div className='position-absolute top-0 start-0'></div>
                            {
                              clouds.map((e,index)=>{
                                e.weather==(data.weather && data.weather[0].description)?<img src={e.image}
                                className=''
                              })
                            }
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                              className="card-img" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"35px"}} alt="weather" />
                            <div className="mask" style={{backgroundcolor: "rgba(190, 216, 232, .5"}}></div>
                          </div>
                          <div className="card-img-overlay text-dark p-5">
                            <h4 className="mb-0">{data.name},</h4>
                            <p className="display-2 my-3">{Math.round(((data.main && data.main.temp)-273.15)*100)/100}°C</p>
                            <p className="mb-2">Feels Like: <strong>{data.main && data.main.feels_like} °C</strong></p>
                            <h5>Snowy</h5>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </section>
                </div>

</>
  )
}

export default App
