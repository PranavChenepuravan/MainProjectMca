import React,{ useState,useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';

export const ArchWealth = () => {
    const [currentPage, setCurrentPage] = useState(0);
      const itemsPerPage = 2; // Adjust the number of items per page as needed

      let id=localStorage.getItem('id')

      const [userData,setUserData]=useState('')
      const [rating,setRating]=useState()
      const [data,setData]=useState([])
      const [refresh,setrefresh]=useState(false)

      useEffect(()=>{
        let fetchdata=async ()=>{

            try{
                let response=await axios.get(`http://localhost:4000/pilgrim/viewprofile/${id}`)
                console.log(response.data);
                setUserData(response.data)
            }
            catch(error){
                console.error('Error fetching profile data:', error);
            }

            try{
                let response1=await axios.get(`http://localhost:4000/archaeology/archaeological/${id}`)
                console.log(response1.data);
                setData(response1.data)
            }
            catch(error){
                console.error('Error fetching profile data:', error);
            }
        }
        fetchdata()
    },[refresh])

    console.log(data);





    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating )
      };


    
    let handleChange=(event)=>{
      setData({...data,[event.target.name]:event.target.value})
      console.log(data);
    }
    let handleSubmit=async (statuss,newid)=>{
        let requestData = { status: statuss };
        if (rating !== undefined) {
          requestData.rating = rating;
        }
        try{
            console.log('asdas');
            let response1=await axios.put(`http://localhost:4000/archaeology/managearchaeology/${newid}`,requestData)
            console.log(response1)
        }
        catch(error){
            console.error('Error fetching profile data:', error);
        }

    }






      
      const pageCount = Math.ceil(data.length / itemsPerPage);


      const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };
    
      const indexOfLastItem = (currentPage + 1) * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  return (
    

<div className="overflow-x-auto  ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Institution Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Institution Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Place
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Time of Manufacture
                </th>
                <th scope="col" className="px-6 py-3">
                    Made In
                </th>
                <th scope="col" className="px-6 py-3">
                    Material
                </th>
                <th scope="col" className="px-6 py-3">
                    Size
                </th>
                <th scope="col" className="px-6 py-3">
                    Weight
                </th>
                <th scope="col" className="px-6 py-3">
                    Antique Value
                </th>
                <th scope="col" className="px-6 py-3">
                    Heritage
                </th>
                <th scope="col" className="px-9 py-3">
                    Rating
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>

                
            </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item?.institutionId}
              </td>
              <td className="px-6 py-4">{item?.institutionname}</td>
              <td className="px-6 py-4">{item?.institutiontype}</td>
              <td className="px-6 py-4">{item?.location}</td>
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-4">{item?.phone}</td>
              <td className="px-6 py-4">{item?.eraofmanufacture}</td>
              <td className="px-6 py-4">{item?.madein}</td>
              <td className="px-6 py-4">{item?.material}</td>
              <td className="px-6 py-4">{item?.size}</td>
              <td className="px-6 py-4">{item?.weight}</td>
              <td className="px-6 py-4">{item?.antiquevalue}</td>
              <td className="px-6 py-4">{item?.heritage}</td>   
              <td>
                 <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                    />
              </td>  
              <td className="px-4 py-4">
                    <div><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[90%]" onClick={()=>handleSubmit('approved',item._id)}>Approve</button></div>
                    <div><button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[90%]" onClick={()=>{handleSubmit('rejected',item._id)}}>Reject</button></div>
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

  )
}
export default ArchWealth