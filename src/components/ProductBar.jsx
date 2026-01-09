import React from 'react'
import img1 from "../assets/am0.webp";
import img2 from "../assets/am1.png";
import img3 from "../assets/am2.png";
import img4 from "../assets/am4.webp";
import img5 from "../assets/am5.webp";
import img6 from "../assets/am6.webp";
import img7 from "../assets/am8.jpg"
import "../styles/productbar.css"
const ProductBar = () => {
  return (
    <div
  className="class_products_list"
  style={{
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "20px",
    scrollbarWidth: "none",       
    msOverflowStyle: "none"       
  }}
>
  <img src={img1} style={{ width: "100%", height: "150px"}} />
  <img src={img2} style={{ width: "100%", height: "150px"}} />
  <img src={img7} style={{ width: "100%", height: "150px"}} />
  <img src={img5} style={{ width: "100%", height: "150px"}} />
  <img src={img6} style={{ width: "100%", height: "150px"}} />
  <img src={img3} style={{ width: "100%", height: "150px"}} />
  <img src={img4} style={{ width: "100%", height: "150px"}} />
</div>

  )
}

export default ProductBar