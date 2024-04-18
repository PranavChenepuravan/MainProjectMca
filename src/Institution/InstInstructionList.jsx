import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const InstInstructionList = () => {
  const id = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState('');
  const instrId = localStorage.getItem('_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/institution/instruction/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, refresh]);

  const handleChange = (event) => {
    // You're trying to update data1 here, I assume you meant to update data
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:4000/institution/instruction/${id}`, data);
      setData(''); // Clear data after successful update if needed
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (instId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/institution/instructiondelete/${instId}`);
      console.log(response);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error deleting instruction:', error);
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [drop, setDrop] = useState(false);

  const dropdown = () => {
    setDrop(!drop);
    console.log(drop);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2; // Adjust the number of items per page as needed

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='flex flex-col'>
        <div className="overflow-x-auto">
          <div className='flex pb-2'>
          <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center me-2 mb-2 ">Search</button>
          <input type="text" />
          </div>
          <table className="pt-2  w-[60%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Instruction
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td><input type="text" name="instruction" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-[2%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[95%]" required value={item.instruction} onChange={handleChange} /></td>
                  <td className="px-6 py-4">
                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[40%]"><Link to={`/instlayout/instinstructionediting/${item._id}`}>Edit</Link></button>
                    <div><button onClick={() => handleDelete(item._id)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-[40%]">Delete</button></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  );
};

export default InstInstructionList;