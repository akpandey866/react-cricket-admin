import React from 'react'
const BookList = (props) => {
  return props.bookDetails.map((val, idx) => {
    let name = `name-${idx}`
    return (
      <div className="form-row" key={val.index}>
        <div className="col">
          <label>Value</label>
          <input
            type="text"
            className="form-control required"
            placeholder=""
            name={`name.${idx}`}
            data-id={idx}
            id={name}
          />
        </div>

        <div className="col p-4">
          {idx === 0 ? (
            <button
              onClick={() => props.add()}
              type="button"
              className="btn btn-primary text-center"
            >
              <i className="fas fa-plus-circle"></i>
            </button>
          ) : (
            <button className="btn btn-danger" onClick={() => props.delete(val)}>
              <i className="fas fas-minus" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    )
  })
}
export default BookList
