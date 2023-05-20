import { useEffect, useState } from "react"

export function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        console.log("Register montado")
        return () => {
            console.log("Componente desmontado")
        };
    }, []);
    /*
    function handleFrom(ev){
        ev.preventDefault();
        alert(`Email: ${email} || Username : ${username} || Password: ${password}`)
    }
    */
    function handleInput(ev){
        console.log(ev)
        switch (ev.target.id){
            case "email":
                setEmail(ev.target.value)
                console.log(email)
                break
            case "username":
                setUsername(ev.target.value)
                console.log(username)
                break
            case "password":
                setPassword(ev.target.value)
                console.log(password)
                break
            default:
                break;
        }}

  return (
    <>
        <div className="registerContainer">
        <h1 className="form-floating mb-3 text-center">Register</h1>
        <div className="form-floating mb-3">
                <input type="email" onInput={handleInput} className="form-control" id="floatingInput" placeholder="user"></input>
                <label for="floatingInput">User</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" onInput={handleInput} className="form-control" id="floatingInput" placeholder="name@example.com"></input>
                <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" onInput={handleInput} className="form-control" id="floatingPassword" placeholder="Password"></input>
                <label for="floatingPassword">Password</label>
            </div>
        </div>
        
    </>
  )
}

