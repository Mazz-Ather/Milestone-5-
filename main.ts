document.getElementById("resume")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const profilePic = document.getElementById('profilePic') as HTMLInputElement
  const nameElem = document.getElementById("name") as HTMLInputElement;
  const emailElem = document.getElementById("email") as HTMLInputElement;
  const phoneElem = document.getElementById("phone") as HTMLInputElement;
  const educationElem = document.getElementById(
    "education"
  ) as HTMLInputElement;
  const experienceElem = document.getElementById(
    "experience"
  ) as HTMLInputElement;
  const skillsElem = document.getElementById("skills") as HTMLInputElement;

  const userNameElement = document.getElementById(
    "username"
  ) as HTMLInputElement;

  //* check
  if (
    profilePic &&
    nameElem &&
    emailElem &&
    phoneElem &&
    educationElem &&
    experienceElem &&
    skillsElem &&
    userNameElement
  ) {
    const name = nameElem.value;
    const email = emailElem.value;
    const phone = phoneElem.value;
    const education = educationElem.value;
    const experience = experienceElem.value;
    const skills = skillsElem.value;

    //* profile pic
const profilePicFile = profilePic.files?.[0];
const profilePicURL = profilePicFile? URL.createObjectURL(profilePicFile): "";


    const username = userNameElement.value;
    const uniquePath = `Resume_${username.replace(/\s=/g, "_")}_cv.html`;

    var resumeOutput = `
    <h1>RESUME</h1> 
    <h2> Name:</h2>
    <p> <span id="editName" class="editable"> ${name} </span></p>

    <h2> Email:</h2> 
    <p > <span id="editEmail" class="editable">${email} </span></p>

 <h2> phone no.:</h2>
<p> <span id="editPhone" class="editable">${phone}</span> </p>

<h2> Education:</h2>
 <p> <span id="editEducation" class="editable">${education} </span></p>

 
 <h2> Skills: </h2>
 <p> <span id="editSkills" class="editable">${skills} </span></p>
 
 <h2> Experience:</h2>
  <p> <span id="editExperience" class="editable">${experience} </span></p>
`;
    let button: any = document.querySelector("#button");

    const downloadLink = document.createElement("a");
    (downloadLink.href = "data:text/html;charset=utf-8"),
      encodeURIComponent(resumeOutput);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download Resume";

    const outputElem = document.getElementById("resumeOutput");
    if (outputElem) {
      outputElem.innerHTML = resumeOutput;
      outputElem.classList.remove('hidden')
      // button.innerHTML = "Edit";
      makeEditable();
 const buttonContainer = document.createElement('div')
 buttonContainer.id = "buttonContainer"
 outputElem.appendChild(buttonContainer)
 //pdf
 const downloadButton = document.createElement('button')
 downloadButton.textContent = 'Download As PDF'
 downloadButton.addEventListener("click" , ()=>{
  window.print();
 })
 buttonContainer.appendChild(downloadButton)
 
 outputElem.appendChild(downloadLink);
}
  } else {
    console.error("please fill out every input properly");
  }
});

function makeEditable() {
  const editAbleElements = document.querySelectorAll(".editable");
  editAbleElements.forEach((element) => {
    element.addEventListener("click", () => {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || "";

      if (currentElement.tagName === "p" || currentElement.tagName === "span") {
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.classList.add("editing input");

        input.addEventListener("blur", () => {
          currentElement.textContent = input.value;
          currentElement.style.display = "inline";
          input.remove();
        });

        currentElement.style.display = "none";
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}
