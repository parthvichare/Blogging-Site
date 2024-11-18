import React,{useContext} from 'react'
import { BlogContext } from '../BlogContext'
import SideBarImageUpload from '../SideBarsToggle/SideBarImageUpload'

const AddButton = () => {
    const{toggleAddButton,addToggle}=useContext(BlogContext)
    console.log(addToggle)
  return (
    <div>
    <button onClick={toggleAddButton} type="button" class='text-4xl text-red-600 mb-8 -mt-1'>
        +
    </button>
    <SideBarImageUpload/>
    </div>
  )
}

export default AddButton