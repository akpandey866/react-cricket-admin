import React from 'react'

const ImageGallary = ({ images }) => {
  return (
    <div className="row">
      {images.map((url, key) => {
        return (
          <div className="col-md-2 py-2 " key={key}>
            <div className="card ml-2">
              <img src={url} alt="preview" width={100} height={100} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ImageGallary
