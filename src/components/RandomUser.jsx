import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";

function RandomUser() {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [page,setPage]=useState(1);
  const bottomRef = useRef(null);
  
    const loadPost = async (pageNumber) => {
      setLoading(true);
      try {
        const response = await axios.get(`https://randomuser.me/api/?page=${pageNumber}&results=10`);
        const newUsers=response.data.results; 
        setUsers((prevUsers)=>[...prevUsers,...newUsers]);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
      setLoading(false);
    };

    useEffect(() => {
        loadPost(page);
    
    
    }, [page])
    
    useEffect(() => {
        
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [users]);

    const delay=(d)=>{
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve();
            }, d*1000);
        })
    }

    const LoadMoreUsers=async()=>{
        setLoading(true);
        await delay(1);
        setPage((p=>p+1));
    }
  

  return (
    <div className=" bg-green-100 min-h-screen container mx-auto p-2">
        <h1 className="text-3xl font-bold mb-6 text-center  ">Random User Fetcher</h1>
      <div className="flex flex-wrap gap-4 justify-center">
      {users.map((user)=>(
    <div  className=" border-2 border-black w-40 flex flex-col items-center justify-center p-4 gap-2 rounded-md"
    key={user.login.uuid}>
     <img
              className="rounded-full w-20 h-20"
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
            />
            <div className="flex flex-col justify-start text-black text-sm">
            <p className=" ">
              <span className="font-semibold">Name:</span>{user.name.title}{" "}{user.name.first} {user.name.last}
              
            </p>
            <p className="">
            <span className="font-semibold">Gender:</span>{user.gender}
            </p>
            <p className="">
            <span className="font-semibold">Location:</span>{user.location.country}
            </p>
          </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef}></div>
    {loading && <p className="text-center mt-4">Loading...</p>}
    <div className="text-center mt-4">

<button onClick={LoadMoreUsers} disabled={loading} className={`px-4 py-2 text-white rounded-lg bg-black hover:text-xl transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}>  Load More</button>
    </div>
    </div>
  );
}

export default RandomUser;
