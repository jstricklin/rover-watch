document.addEventListener("DOMContentLoaded", render());
let infoTxt = "<p><bold>RoverWatch</bold> was built utilizing simple HTML, CSS, JavaScript, and API calls to NASA's databse for the rover images</p>"
function render(){
    let contentTitle = document.querySelector(".main-title")
    let content = document.querySelector(".main-content");
    let homeTxt = content.innerHTML;
    let homeTitle = contentTitle.innerHTML;
    document.querySelector("#info").addEventListener("click", ()=>{
        content.innerHTML = infoTxt;
        contentTitle.innerHTML = "Information"
    })
    document.querySelector("#home").addEventListener("click", ()=>{
        content.innerHTML = homeTxt;
        contentTitle.innerHTML = homeTitle;
    })
    document.querySelector("#contact").addEventListener("click", ()=>{
    content.innerHTML = "<p>Expect links to email, github, linkedin, etc...</p>";
        contentTitle.innerHTML = "Contact Me"
    })
}
