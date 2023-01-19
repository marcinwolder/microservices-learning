export default function genError(errorObj: errResponse){
  return <>
    <h2 className="text-xl font-bold">Oops...</h2>
    <ul className="list-disc list-inside">
      { errorObj.errors.map((error)=>{
        return <li key={error.message}>{error.message}</li>
      }) }
    </ul>
  </>
}