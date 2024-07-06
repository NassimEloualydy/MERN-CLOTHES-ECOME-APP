import React from 'react'
import { useNavigate } from 'react-router-dom';
const Breadcrumb = ({PathPage,ActivePage}) => {
  const navigate=useNavigate()
 const navigateToUrl=(url)=>{
  if(url.item=="Home")
    navigate('/')
  if(url.item=="Products")
    navigate('/product')

 }
  return (
    <section className="p-5 pb-0 text-center">
        <nav  aria-label="breadcrumb">
            <ol className="breadcrumb">
                
{PathPage.map((item,index)=>(
    
    <li role='button' key={index} onClick={navigateToUrl.bind(this,{item})} className="breadcrumb-item" v-for="u in inactiveurl">
{item}                </li>
))}
<li  className="breadcrumb-item active"  aria-current="page">
    {ActivePage}
</li>
            </ol>
        </nav>
        <hr/>
</section>
  )
}

export default Breadcrumb