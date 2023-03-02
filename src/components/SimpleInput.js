import useInput from "../hooks/useInput";

const SimpleInput = () => {

  const checkEmail = (email) => {
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  }
  const checkName = (name) => {
    return name.trim().length > 0
  }
  const { inputState: nameInputState,
    inputIsInvalid: nameIsInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    inputResetHandler: nameInputResetHandler
  } = useInput(checkName)

  const { inputState: emailInputState,
    inputIsInvalid: emailIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    inputResetHandler: emailInputResetHandler
  } = useInput(checkEmail)

  const nameInputClasses = !nameIsInvalid ? 'form-control' : 'form-control invalid'
  const emailInputClasses = !emailIsInvalid ? 'form-control' : 'form-control invalid'


  const formSubmitHandler = (event) => {
    event.preventDefault()
    nameInputBlurHandler()
    emailInputBlurHandler()
    if (nameInputState.isValid && emailInputState.isValid) {
      nameInputResetHandler()
      emailInputResetHandler()
    }
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={nameInputState.value} onBlur={nameInputBlurHandler} onChange={nameInputChangeHandler} />
      </div>
      {nameIsInvalid && <p className="error-text"> name is not valid</p>}
      <div className={emailInputClasses}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={emailInputState.value} onBlur={emailInputBlurHandler} onChange={emailInputChangeHandler} />
      </div>

      {emailIsInvalid && <p className="error-text"> email is not valid</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
