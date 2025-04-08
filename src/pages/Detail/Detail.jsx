import React from 'react';
import "./Detail.scss";
import CustomPaging from '../../components/DetailSlider/DetailSlider';




const Detail = () => {
  return (
<>
      <section className='detail_main' >
<div className='leftmain'>
        <CustomPaging/>
    </div>
<div className='rightmain'>
<div className='rightmain_detail'>
  <div className='topmain_detail'>
      <div className='topmain_detail_header'>Bletilla 3 Seater Sofa</div>
      <p>Megalodon Chesterfield 2 corner 3, Sc Wash Off Brown. <br />
      Chesterfield Corner Sofa model Megalodon from the Timeless <br />
        Collection</p>
  </div>
      <div className='centermain_detail'>
        <div className='maindetail'><span><b>COLOR</b></span><span>BROWN</span></div>
        <div className='maindetail'><span><b>SIZE</b></span><span>202CM/77CM</span></div>
        <div className='maindetail'><span><b>MATERIAL</b></span><span>LETHER</span></div>
        <div className='maindetail'><span><b>MANUFACTURER</b></span><span>GERMANY</span></div>
      </div>
  <div className='undermain_detail'>
<div className='undermain_detail_price'><span className='price'>₩6,534,527</span> <span className='tax'>Including VAT</span></div>
        <div className='delivery'>Delivery Costs <i className='fas fa-circle-info'></i></div>
        <div className='quantity'><input className='text' type="text"  />
        <button class="icon_button">
    <i class="fas fa-shopping-cart"></i>
    ADD TO CART
  </button>
        </div>
  </div>
</div>
</div>
      </section>
      <section className='detail_center'>
        <div className='inner'>
          <h3>MORE DETAIL VIEW</h3>
          <div className='detail_image_wrap'>
            <div className='DetailImage'><img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1jpg" alt="DetailImage" /></div>
            <div className='DetailImage'><img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1jpg" alt="DetailImage" /></div>
            <div className='DetailImage'><img src="https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/productions/168076369463245589.jpg?w=1280&h=1280&c=c&webp=1jpg" alt="DetailImage" /></div>
          </div>
        </div>
      </section>
      <section className='detail_info'>
        <div className='left_detail_info'>
          <div className='detail_info_title'>DESCRIPTION/BETILLA3 SEATER SOFA</div>
        <p>
        CHESTERFIELD HARRIS TWEED 3 SEATER SOFA BLETILLA UPHOLSTEREDWITH TWEED WOOL AND CERATO LEATHER THIS COMBINATION OF HARRIS TWEED WOOL AND CERATO LEATHERPROCESSED IN A CHESTERFIELD SOFA RESULTS A MARVELLOUS LOOK. THE BLETILLA IS AN ELEGANT AND LESS ROBUST CHESTERFIELD THREE-SEATER SOFA. IT IS AN IDEAL FOR SMALLER SPACES.THE SEATING COMFORT IS PERFECT, EVEN FOR SHORTER HEIGHTS.THE CHESTERFIELD HARRIS TWEED BLETILLA SOFA HAS A BEAUTIFULLY FINISHING DETAILS.WE ONLY USE THE ORIGINAL TWEED FABRIC WITH THE ORB QUALITY MARK FOR THE HARRIS TWEED COLLECTION. THIS IS STAMPED ON THE FABRIC BY THE LEGAL DEPARTMENT OF THE HARRIS TWEED ASSOCIATION. THE TWEED IS FIRST DYED, THEN SPUN WITH PARTICULAR WAY AND THEN WOVEN BY HAND.THIS LUXURIOUS TWEED IS 100% MADE FROM PURE NEW WOOL AND IS FAMOUS BECAUSE OF ITS PLEASANTLY WARM, BREATHABLE COMFORT AND LONGEVITY. YOU WILL OBTAIN A CERTIFICATE OF AUTHENTICITY ON CERTIFIED PAPER WITH THE CHESTERFIELD BLETILLA THREE SEATER SOFA. THIS CHESTERFIELD CERTIFICATE INCLUDES THE PRODUCTION NUMBER WITH WAX SEAL AND STAMP.
        </p>
        </div>
      <div className='between'></div>
      <div className='right_detail_info'>
        <div className='detail_info_title'>MORE IMPORMATION</div>
        <ul class="info-list">
  <li>
    <span class="label">PRODUCTION TIME</span>
    <span class="value">8 TO 16 WEEKS</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">COLOUR</span>
    <span class="value">SC-WASH OFF BROWN</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">COLLECTIONS</span>
    <span class="value">TIMELESS COLLECTION</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">WIDTH</span>
    <span class="value">202CM</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">HEIGHT</span>
    <span class="value">77CM</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">DEPTH</span>
    <span class="value">93CM</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">NUMBER OF SEATS</span>
    <span class="value">3</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">SEAT HEIGHT</span>
    <span class="value">48CM</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">FILTER BY COLLECTION</span>
    <span class="value">TIMELESS COLLECTION</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">COLOR</span>
    <span class="value">ANTIQUE BROWN</span>
    <span class="underline"></span>
  </li>
  <li>
    <span class="label">FDFD</span>
    <span class="value">ANTIQUE BROWN</span>
    <span class="underline"></span>
  </li>
</ul>
      </div>
      </section>
      <section className='more_item'>
        <h3>MORE DETAIL VIEW</h3>
      </section>
</>
  )
}

export default Detail