export function Login() {
    return (
      <>
          <div className="loginContainer">
          <h1 className="form-floating mb-3 text-center">Login</h1>
          <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="user"></input>
                  <label for="floatingInput">User</label>
              </div>
              <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"></input>
                  <label for="floatingPassword">Password</label>
              </div>
          </div>
      </>
    )
  }