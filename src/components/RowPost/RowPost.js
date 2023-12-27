import React,{ useEffect,useState } from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../constants/constants'
function RowPost(props) {
    const[movies,setMovies] =useState([])
    const[UrlId,setUrlId] = useState('')

    useEffect(() => {
    axios.get(props.url).then(response=>{
        console.log(response.data)
        setMovies(response.data.results)
    }).catch(error=>{
        alert('Network Error')
    })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          //https:developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    }

    const handlemovie = (id)=>{
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if (response.data.results.length!==0){
                setUrlId(response.data.results[0])
            }
        })

    }
    
  return (
    <div className='row'>
      <h6 className='title'>{props.title}</h6>
      {console.log(props)}
      <div className='posters'>
        {movies.map((obj)=>
        <img onClick={()=>handlemovie(obj.id)}alt='' className={props.isSmall ? 'smallPoster': 'poster' } src={`${imageUrl+obj.backdrop_path}`}/>
        )}
      </div>
      { UrlId && <Youtube opts={opts} videoId={UrlId.key} /> }
    </div>
  )
}


export default RowPost
