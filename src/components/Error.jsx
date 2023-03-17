

const Error = ({mensaje}) => {
  return (
    <div className='bg-red-800 text-white text-center uppercase font-bold p-3 mb-3 rounded-md'>
          <p>{mensaje}</p>
    </div>
  )
}

export default Error;
