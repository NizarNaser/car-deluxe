import React from 'react'

const SubsTableItem = ({email,mongoId,date,deleteEmail}) => {
    const emailDate = new Date(date)
  return (
    <tr className='bg-white border-b text-left'>
        <th scope='row' className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>
          {email?email:"no email"}
        </th>
        <td className='py-4 px-6 hidden sm:block'>{emailDate?emailDate.toDateString():"no date"}</td>
        <td onClick={()=>deleteEmail(mongoId)} className='py-4 px-6 cursor-pointer'>X</td>
      
    </tr>
  )
}

export default SubsTableItem
