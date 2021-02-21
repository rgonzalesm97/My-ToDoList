//GLOBAL VARIABLES-------------------------------------------------------------------------------------
const body = document.querySelector("body");
let pageName = "";
let userEmail = ""; 
let form = null;
let error = null;
let ul = null;
let listTitle = null;



//HOME PAGE SCRIPT VARIABLES----------------------------------------------------------------------------
const homePage = `
<div id="homePage">
    <div id="homeContainer">
        <h1>My To Do List</h1>
        <p>This is your todo list wher you can add, remove or edit objectives so you can be organized.</p>
        <button onclick="GoToSignUp()">Sign Up</button>
        <br><br>
        <button onclick="GoToLogIn()">Log In</button>
    </div>
</div>
`;
const signUpPage = `
<div id="signUpFormPage">
    <div id="signUpFormContainer">
        <h1>Sign Up</h1>
        <form id="form">
            <label for="fname">First name:</label><br>
            <input type="text" id="fname" name="fname"><br><br>
            <label for="lname">Last name:</label><br>
            <input type="text" id="lname" name="lname"><br><br>
            <label for="email">e-mail:</label><br>
            <input type="text" id="email" name="email"><br><br>
            <label for="psw">Password:</label><br>
            <input type="password" id="psw" name="psw"><br><br>
            <input type="checkbox" id="termsofuse">I agree to the Terms of Use<br><br>
            <input type="submit" value="Submit">
        </form>
        <div id="error"></div>
        <br>
        <button onclick="GoToLogIn()">Go to Log In</button>
    </div>
</div>
`;
const logInPage = `
<div id="logInFormPage">
    <div id="logInFormContainer">
        <h1>Log In</h1>
        <form id="form">
            <label for="email">e-mail:</label><br>
            <input type="text" id="email" name="email"><br><br>
            <label for="psw">Password:</label><br>
            <input type="password" id="psw" name="psw"><br><br>
            <input type="submit" value="Log In">
        </form>
        <div id="error"></div>
        <br>
        <button onclick="GoToSignUp()">Go to Sign Up</button>
    </div>
</div>
`;
const dashboardPage = `
<div id="dashboardPage">
    <div id="dashboardContainer">
        <div class="dashboardHead">
            <h1>DASHBOARD</h1>
            <div>
                <button onclick="GoToSettings()">Settings</button>
                <button onclick="GoToHome()">Log Out</button>
            </div>
        </div>
        <h1>My Lists</h1>
        <ul id="allLists">       
        </ul>
        <form id="form">
            <button type="submit">Create New To-Do List</button>
            <input type="text" id="ListName">
        </form>
    </div>
</div>
`;
const listPage = `
<div id="listPage">
    <div id="listContainer" class="deactive">
        <div class="listHead">
            <div>
                <h1 id="listTitle"></h1>
            </div>
            <button onclick="GoToDashboard()">Back</button>
            <div>
                <button onclick="GoToSettings()">Settings</button> 
                <button onclick="GoToHome()">Log Out</button>
            </div> 
        </div>
        <ul id="actuallist">   
        </ul>
        <form id="form">
            <button type="submit" id="createListElementBtn">Create New Element</button>
            <input type="text" id="ElementName">
        </form>
        <br>
        <div>
            <button onclick="EditListName()">Edit List Name</button>
            <label for="newname">New name: </label>
            <input type="text" id="editName" name="editName">
        </div>
        <br>
        <button onclick="DeleteList()">Delete List</button>
    </div>
</div>
`;
const settingsPage = `
<div id="settingsPage">
    <div id="settingsContainer">

        <h1>Settings</h1>
        
        <label id="Fname"></label><br>
        <input type="text" id="setFname" name="Fname">
        <button onclick="ChangeName()">Change</button><br><br>

        <label id="Lname"></label><br>
        <input type="text" id="setLname" name="Lname">
        <button id="lnameChange" onclick="ChangeLName()">Change</button><br><br>

        <label id="Email"></label><br>
        <input type="text" id="setEmail" name="Email">
        <button id="emailChange" onclick="ChangeEmail()">Change</button><br><br>

        <label id="Psw"></label><br>
        <input type="password" id="setPsw" name="Psw">
        <button id="pswChange" onclick="ChangePsw()">Change</button><br><br>

        <button onclick="GoToDashboard()">Back to Dashboard</button>

    </div>
</div>
`;

//GO TO FUNCTIONS-------------------------------------------------------------------------
function GoToHome(){
    pageName = "Home Page";
    ChangePage();
}

function GoToSignUp(){
    pageName = "Sign Up Page";
    ChangePage();
    form = document.getElementById("form");
    form.addEventListener("submit", SaveSignUpData);
    error = document.getElementById("error");
}

function GoToLogIn(){
    pageName = "Log In Page";
    ChangePage();
    form = document.getElementById("form");
    form.addEventListener("submit", ValidateLogInInfo);
    error = document.getElementById("error");
}

function GoToDashboard(){
    pageName = "Dashboard Page";
    ChangePage();
    form = document.getElementById("form");
    form.addEventListener("submit", CreateList);
    ul = document.getElementById("allLists");
    ul.addEventListener("click", GoToList);
    UpdateDashboard();
}

function GoToList(e){
    pageName = "List Page"
    ChangePage();
    UpdateList(e.target.innerText);
    form = document.getElementById("form");
    form.addEventListener("submit", CreateElement);
}

function GoToSettings(){
    pageName = "Settings Page";
    ChangePage();
    UpdateSettings();
}

//CHANGE PAGE FUNCTION-------------------------------------------------------------------------
function ChangePage(){

    switch(pageName){

        case "Home Page":
            body.innerHTML = "";
            body.innerHTML = homePage;
            break;

        case "Sign Up Page":
            body.innerHTML = "";
            body.innerHTML = signUpPage;
            break;

        case "Log In Page":
            body.innerHTML = "";
            body.innerHTML = logInPage;
            break;

        case "Dashboard Page":
            body.innerHTML = "";
            body.innerHTML = dashboardPage;
            break;

        case "List Page":
            body.innerHTML = "";
            body.innerHTML = listPage;
            break;

        case "Settings Page":
            body.innerHTML = "";
            body.innerHTML = settingsPage;
            break;

        default:
            console.log("default, somthing went wrong");
    }
}

//SIGN UP RELATED FUNCTION-----------------------------------------------------------------------------
function SaveSignUpData(e){
    e.preventDefault();
    const firstName = form.querySelector("#fname").value;
    const lastName = form.querySelector("#lname").value;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#psw").value;
    const termsofuse = document.getElementById("termsofuse").checked;

    if(ValidateEmail(email) && firstName !== "" && lastName !== "" && password !== "" && termsofuse){

        let info = {
            pass : password,
            fname : firstName,
            lname : lastName,
            listNames : []
        }

        if(localStorage.getItem(email) === null){
            localStorage.setItem(email, JSON.stringify(info));
            userEmail = email;
            form.reset();
            error.innerText = "";
            GoToDashboard();
        }
        else{
            error.innerText = "This email account already exist, please log in";
        }
    }
    else{
        error.innerText = "Please enter a valid information";
    }
}

//LOG IN RELATED FUNCTION-----------------------------------------------------------------------------
function ValidateLogInInfo(e){
    e.preventDefault();
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#psw").value;

    //check
    if(localStorage.getItem(email) !== null){
        if(JSON.parse(localStorage.getItem(email)).pass === password){
            userEmail = email;
            form.reset();
            error.innerText = "";
            GoToDashboard();
        }else{
            error.innerText = "Wrong passwor";
        }
    }else{
        error.innerText = "User not registered, please sign up"
    }
}

//DASHBOARD RELATED FUNCTION-----------------------------------------------------------------------------
function CreateList(e){
    e.preventDefault();
    const listName = form.querySelector("#ListName").value;

    if(listName === "" || CheckForRepetition(listName)){
        alert("List name cannot be empty or repeated");
    }
    else{
        AddList(listName);
        UpdateDashboard();
        form.reset();
    }
    return;
}

function AddList(listName){
    const obj = JSON.parse(localStorage.getItem(userEmail))
    
    obj.listNames.push(listName);
    obj[listName] = [];

    localStorage.setItem(userEmail, JSON.stringify(obj));
}

function UpdateDashboard(){
    const obj = JSON.parse(localStorage.getItem(userEmail))
    ul.innerHTML = "";

    for(let prop of obj.listNames){
        const newLI = document.createElement("li");
        newLI.innerText = prop;
        ul.appendChild(newLI);
    }    
}

//LIST RELATED FUNCTION-----------------------------------------------------------------------------
function UpdateList(name){

    listTitle = document.getElementById("listTitle");
    listTitle.innerText = name;

    const obj = JSON.parse(localStorage.getItem(userEmail));

    ul = document.getElementById("actuallist");
    ul.innerHTML = "";
    
    for(let prop of obj[name]){
        const newElementLi = document.createElement("li");
        newElementLi.innerHTML = '<input type="checkbox"> ' + prop;
        ul.appendChild(newElementLi);
    }
}

function CreateElement(e){
    e.preventDefault();

    const elementName = document.getElementById("ElementName").value;

    if(elementName === ""){
        alert("Please enter a valid Element");
    }
    else{
        AddElement(elementName);
        UpdateList(listTitle.innerText);
        form.reset();
    }
}

function AddElement(elementName){
    const obj = JSON.parse(localStorage.getItem(userEmail));
    obj[listTitle.innerText].push(elementName);
    localStorage.setItem(userEmail, JSON.stringify(obj));
}

function DeleteList(){
    const obj = JSON.parse(localStorage.getItem(userEmail));

    delete obj[listTitle.innerText];

    const index = obj.listNames.indexOf(listTitle.innerText);
    obj.listNames.splice(index, 1);
    localStorage.setItem(userEmail, JSON.stringify(obj));

    GoToDashboard();
}

function EditListName(){
    const name = listTitle.innerText;
    const newName = document.getElementById("editName").value;
    const obj = JSON.parse(localStorage.getItem(userEmail));
    const index = obj.listNames.indexOf(name);

    for(let prop of obj.listNames){
        if(newName === prop){
            alert("You already have a List with that name, please choose another name");
            return;
        }
    }

    if(newName === ""){
        alert("Please enter a valid name");
    }
    else{
        obj.listNames[index] = newName;

        obj[newName] = obj[name];
        delete obj[name];
        localStorage.setItem(userEmail, JSON.stringify(obj));
        UpdateList(newName);
        document.getElementById("editName").value = "";
    }
}

function CheckForRepetition(listName){
    const obj = JSON.parse(localStorage.getItem(userEmail));

    for(let prop of obj.listNames){
        if(listName === prop){
            return true;
        }
    }
    return false;
}

//SETTINGS RELATED FUNCTION-----------------------------------------------------------------------------
function ChangeName(){
    const obj = JSON.parse(localStorage.getItem(userEmail));
    const firstName = document.getElementById("setFname").value;

    if(firstName === ""){
        alert("Please enter a valid First name");
    }else{
        obj.fname = firstName;
        localStorage.setItem(userEmail, JSON.stringify(obj))
        UpdateSettings();
        document.getElementById("setFname").value = "";
    }
}

function ChangeLName(){
    const obj = JSON.parse(localStorage.getItem(userEmail));
    const lastName = document.getElementById("setLname").value;

    if(lastName === ""){
        alert("Please enter a valid Last name");
    }else{
        obj.lname = lastName;
        localStorage.setItem(userEmail, JSON.stringify(obj))
        UpdateSettings();
        document.getElementById("setLname").value = "";
    }
}

function ChangeEmail(){
    const obj = JSON.parse(localStorage.getItem(userEmail));
    const newEmail = document.getElementById("setEmail").value;

    if(!ValidateEmail(newEmail)){
        alert("Please enter a valid e-mail");
    }else{
        localStorage.setItem(newEmail, JSON.stringify(obj));
        localStorage.removeItem(userEmail);
        userEmail = newEmail;
        UpdateSettings();
        document.getElementById("setEmail").value = "";
    }
}

function ChangePsw(){
    const obj = JSON.parse(localStorage.getItem(userEmail));
    const password = document.getElementById("setPsw").value;

    if(password === ""){
        alert("Please enter a valid Password");
    }else{
        obj.pass = password;
        localStorage.setItem(userEmail, JSON.stringify(obj))
        UpdateSettings();
        document.getElementById("setPsw").value = "";
    }
}

function UpdateSettings(){
    const obj = JSON.parse(localStorage.getItem(userEmail));

    const firstName = obj.fname;
    const lastName = obj.lname;
    const pass = obj.pass;

    document.getElementById("Fname").innerHTML = `First name: <b>${firstName}</b>`;
    document.getElementById("Lname").innerHTML = `Last name: <b>${lastName}</b>`;
    document.getElementById("Email").innerHTML = `e-mail: <b>${userEmail}</b>`;
    document.getElementById("Psw").innerHTML = `Password: <b>${pass}</b>`;
}

//OTHER FUNCTIONS-------------------------------------------------------------------------------
function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true);
  }
    
    return (false);
}

//OnInit
pageName = "Home Page";
ChangePage();


