import React from 'react'

const Signup = () => {

    const [user, setUser] = React.useState({email: "", password: ""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value})
    }

    const handleCreateAccount = async() => {
      try {
        let response = await fetch('http://localhost:8080/users',{
          method: "post",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(user)
        });

        response = response.json();

      } catch (error) {
        console.log(error)
      }
    }
    console.log(user)


  return (
    <div>
        <div className="flex flex-col w-sm gap-4">
                <h2 className="text-lg font-semibold">Create new account</h2>
                 <input type='text' placeholder='Enter Your Email' name='email' value={user.email} onChange={(e)=>handleChange(e)} className='border border-gray-300 rounded-sm w-sm inputt'/>
                
                 <input type='text' placeholder='Create Your Password' name='password' value={user.password} onChange={(e)=>handleChange(e)} className='border border-gray-300 rounded-sm w-sm inputt'/>

                 <button className='bg-[#fce180] px-4 border border-amber-400 rounded-md btn hover:bg-[#baa559] hover:text-white transform duration-500 mt-2' onClick={handleCreateAccount}>Create Account</button>
            </div>
    </div>
  )
}

export default Signup