import React from 'react'

const Breadcrumb = ({PathPage,ActivePage}) => {
  return (
    <section className="p-5 text-center">
        <nav  aria-label="breadcrumb">
            <ol className="breadcrumb">
                
{PathPage.map((item,index)=>(
    
    <li key={index} className="breadcrumb-item" v-for="u in inactiveurl">
{item}                </li>
))}
<li  className="breadcrumb-item active" aria-current="page">
    {ActivePage}
</li>
            </ol>
        </nav>
        <hr/>
</section>
  )
}

export default Breadcrumb