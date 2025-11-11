
import SideNav from "../components/SideNav";
import Content from "./Content";

const Dashboard = () => {
  
  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
  

           <div className="w-full h-full py-16 p-4 sm:pt-20 ">
          <Content />
        </div>

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;