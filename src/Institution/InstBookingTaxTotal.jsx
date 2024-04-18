import React, {useEffect,useState} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom'

export const InstBookingTaxTotal = () => {

    let {id}=useParams()
    const [bookingData,setBookingData]=useState([])
    const [refresh,setrefresh]=useState(false)
    const [totalTax, setTotalTax] = useState(0);
    const[data,setData]=useState([''])
    const [totdata,setTotdata]=useState([])
    const [payform,setPayform]=useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/admin/bookingtaxinst/${id}`);
                console.log(id,'Id came here')
                console.log("Response Data:", response.data);
                setBookingData(response.data);
                
                const totalTaxSum = response.data.reduce((sum, item) => {
                    console.log("Item Tax:", item.tax);
                    console.log("Current Sum:", sum);
                    return sum + item.tax;
                }, 0);
                
                console.log("Total Tax Sum:", totalTaxSum);
                const roundedTotalTaxSum = totalTaxSum.toFixed(2);
                setTotalTax(roundedTotalTaxSum);

                const response1 = await axios.get(`http://localhost:4000/admin/institionsbookingtax/${id}`)
                console.log("Response 1 Data", response1.data)
                setTotdata(response1.data)



            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchdata();
    }, [ refresh]);



    let handleChange=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
      }


    let handleSubmit=async(totaltaxes,taxId)=>{
        setrefresh(!refresh)
        let response=await axios.put(`http://localhost:4000/admin/institutionsbookingtax/${taxId}`,{...data,totaltax:totaltaxes,status:'rejected'})
        console.log(response);
    }

const [taxId,setTaxId]=useState('')
    const toggle=(tid)=>{
        setTaxId(tid)
        setPayform(!payform)
        
    }





    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3; // Adjust the number of items per page as needed
  
    const pageCount = Math.ceil(bookingData.length / itemsPerPage);
  
  
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>


  {/* <div className='w-44 mt-4 '>
    <label htmlFor="" className='text-white'>Total Tax</label>
      <div className='flex'>
               <input
                    onChange={handleChange}
                    name='totaltax'
                    type="text"
                    id="password"
                    className="bg-gray-50 border w-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]"
                    value={totalTax}
                    readOnly
                    required
                /> 
     
        </div>
    </div> */}



    {totdata.map((item,index)=>(

<div class="max-w-2xl mx-4 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-2xl sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white/90 shadow-xl rounded-lg text-gray-900">
    <div class="rounded-t-lg h-32 overflow-hidden"></div>

    <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex'> 
         <div>Tax For The Date : </div>
            <h2>{item?.totaltax}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Payed : </div>
            <h2>{item?.totaltax-item?.balance}</h2> 
        </div>
        <div className='flex'> 
            <div>Total Balance : </div>
            <h2>{item?.balance}</h2>
        </div>
        <div className='flex'> 
            <div>Date and Time : </div>
            <h2>{(new Date(item.date)).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</h2>
        </div>
        <div className='flex'> 
            <div>Income Tax Sanction : </div>
            <h2>{item?.status}</h2>
        </div>
        <br />

        <div className='flex flex-col pl-[15%] text-xl'>
    <div className='flex mt-3'> 
        <label htmlFor="payed" className="w-[20%]">Amount :</label>
        <input type="text" onChange={handleChange} name="payed" id="payed" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
    </div>

    <div className='flex mt-3'> 
        <label htmlFor="bankName" className="w-[20%]">Bank Name :</label>
        <input type="text" name="bankName" id="bankName" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="accountNo" className="w-[20%]">Account No :</label>
        <input type="text" name="accountNo" id="accountNo" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="ifscNo" className="w-[20%]">IFSC No :</label>
        <input type="text" name="ifscNo" id="ifscNo" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="userName" className="w-[20%]">User Name :</label>
        <input type="text" name="userName" id="userName" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="password" className="w-[20%]">Password :</label>
        <input type="text" name="password" id="password" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <div className='flex mt-3'> 
        <label htmlFor="dateTime" className="w-[20%]">Date and Time :</label>
        <input type="date" onChange={handleChange} name="dateTime" id="dateTime" className="w-[60%] h-[2.5rem] ml-[5%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   /> 
    </div>
    <br />
    <div className='mt-3 flex '> {/* Centering the Pay button */}
        <button type="button" onClick={()=>handleSubmit(item?.totaltax,item?._id)} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Pay</button>
    </div>
    <div>
        <li className='text-white'> </li>
    </div>
</div>

        




        <div>
            <li className='text-white'> </li>
        </div>
    </div>
</div>


))}





    </>
  )
}
export default InstBookingTaxTotal