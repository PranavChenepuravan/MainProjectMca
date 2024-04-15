import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';

export const InstFestivalList = () => {


    let id=localStorage.getItem('id')
    const [data,setData]=useState([''])
    const [refresh,setrefresh]=useState('')

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust the number of items per page as needed
    

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };


    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);







    useEffect(()=>{
        let fetchdata=async ()=>{
            let response=await axios.get(`http://localhost:4000/institution/festival/${id}`)
            console.log(response.data);
            setData(response.data)
        }
        fetchdata()

    },[refresh])


  return (
    <>
         <div className="  overflow-x-auto  ">
      <div className='flex'>
        <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2">Search</button>
        <input  type="text" name='time' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[20%] h-[2%]" required />
      </div>
     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Festival Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Picture
                </th>
                <th scope="col" className="px-6 py-3">
                    About
                </th>
                <th scope="col" className="px-6 py-3">
                    Starting Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Ending Date
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
                
            </tr>
        </thead>
        <tbody>
            {currentItems?.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td>
                        {item?.festival?.festivalname}
                    </td>
                    <td>
                        <img src={`http://localhost:4000/uploads/${item.festival?.photo}`} alt="" />
                    </td>
                    <td>
                    {item?.festival?.about}
                    </td>
                    <td>
                        {item?.festival?.startingdate}
                    </td>
                    <td>
                        {item?.festival?.endingdate}
                    </td>
                    <td>
                      <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><Link to={`/instlayout/instfestivalevents/${item?.festival?._id}`}>Events</Link></button>
                    </td>
                   

                </tr>
            ))}
            
        </tbody>
    </table>

    <div className="flex justify-between text-white w-24 mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
       
        />
      </div>
    </div>
    </>
  )
}
export default InstFestivalList
