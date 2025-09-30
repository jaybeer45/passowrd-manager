import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

// import { Bounce } from "react-toastify";
const Maneger = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);
  const showPass = () => {
    // alert("show the password")
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length >= 3 && form.password.length > 3 ){
    setpasswordArray([...passwordArray, {...form, id : uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id : uuidv4()}]));
    console.log([...passwordArray, form]);
    setForm({
      site: "",
      username: "",
      password: "",
    });
    toast.success("Password saved ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  else{
    toast.warn("Password not saved",{
      theme : "dark"
    })
  }
    
  };

  const deletePassword = (id) => {
    console.log("deleting Password with",  id)
    let c = confirm("Do You Really Want To Delete This Password ")
    if (c){
    setpasswordArray(passwordArray.filter(item=>item.id !== id ))
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item !== id )))
    toast.success("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }

  }

const editPassword = (id) => {
  
  console.log ("editing password with", id )
  const editPasswordTo = passwordArray.find(item=>item.id === id)
    if (editPasswordTo){
      setForm({
           site : editPasswordTo.site,
           username: editPasswordTo.username,
           password: editPasswordTo.password
      });
      setpasswordArray(passwordArray.filter(item=>item.id !== id ))
    }
}

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast("copied to clipboard!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <>
        <div
          className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform
        bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"
        ></div>

        <div className=" p-2-2 md:px-0 md:mycontainer min-h-[85vh] mx-10 ">
          <h1 className="text-4xl font-bold text-center ">
            <span className="font-bold   text-green-800"> &lt;</span>
            Pass<span className="font-bold text-green-800 ">OP/&gt;</span>
          </h1>
          <p className="text-sm text-center text-green-800">
            Your own Password Maneger{" "}
          </p>

          <div className=" flex flex-col p-4 gap-6 items-center ">
            <input
              value={form.site}
              onChange={handleChange}
              className="rounded-full text-black shadow:md py-1 border border-green-500 w-full p-4 "
              type="text"
              name="site"
              id="site"
              placeholder=" Enter website URL"
            />
            <div className="flex md:flex-row flex-col w-full justify-between  gap-6 ">
              <input
                value={form.username}
                onChange={handleChange}
                className="rounded-full text-black shadow:md py-1 border border-green-500 w-full p-4 "
                type="text"
                name="username"
                id="username"
                placeholder=" Enter Username"
              />

              <div className="relative items-center">
                <input
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                  className="rounded-full text-black shadow:md py-1 border border-green-500 w-full p-4 "
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                />
                <span
                  onClick={showPass}
                  className="absolute right-1 top-1 gap-2"
                >
                  <img
                    className="p-2 cursor-pointer"
                    width={30}
                    src="icons/eye.png"
                    alt="eye"
                    ref={ref}
                  />
                </span>
              </div>
            </div>

            <button
              onClick={savePassword}
              className="bg-green-400 flex justify-center item-center w-fit px-8 py-2 gap-2 rounded-full
        border border-green-700 hover:bg-green-300"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>

          <div className="password">
            <h2 className="text-2xl font-bold ">Your Password</h2>
            {passwordArray.length === 0 && <div> No Password to show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-green-400 text-black text-center border border-white py-2 ">
                  <tr>
                    <th className="py-2 ">Site</th>
                    <th className="py-2 ">Username</th>
                    <th className="py-2 ">Password</th>
                    <th className="py-2 ">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.username}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center">
                          <div className="flex items-center justify-center ">
                            <span>{item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="justify-center py-2 border border-white text-center">
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer mx-1"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Maneger;
