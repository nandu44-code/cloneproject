import React, { useEffect,useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import './Banner.css'
import axios from '../../axios'


function Banner() {

    const [movie,setMovie] = useState()
    useEffect(() => {
      
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
            console.log(response.data)
            console.log(response.data.results.length)
            const total_movies = response.data.results.length
            const min=0
            const max=total_movies-1
            const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            setMovie(response.data.results[randomInt])
        })
        .catch(error=>{
            if (error.response) {
             
                console.log('Response error data:', error.response.data);
                
            }
        });
            
       
      },[])

  return (

    <div 
        style={{ backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})` }}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title?movie.title:movie.name: ""}</h1>
            <div className='banner_buttons' >
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 className='description'>{movie ? movie.overview: ""}</h1>
        </div>
        <div className='fade_bottom'>
            
        </div>

    </div>
  )
}

export default Banner
