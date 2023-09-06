// API's
const BASE_API_All = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const category_API = "https://www.themealdb.com/api/json/v1/1/categories.php";
const category_Filter_API =
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
const Areas_API = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const Ingrediant_API =
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
const spinner = document.getElementById("spinnerDiv");

getAllMeals();
closeHeader();
var headerOpen = true;

$("#btnCloseOpen").on("click", () => {
  if (headerOpen) {
    closeHeader();
    headerOpen = false;
  } else {
    openHeader();
    headerOpen = true;
  }
});

function closeHeader() {
  $("#btnCloseOpen")
    .removeClass("fa-solid fa-xmark")
    .addClass("fa-solid open-close-icon fa-2x fa-align-justify");
  let boxWidth = $(".headerToClose").innerWidth();
  $("li").slideUp(500);
  $("section").animate({ left: `-${boxWidth}px` }, 500);
}
function openHeader() {
  $("#btnCloseOpen")
    .removeClass("fa-solid open-close-icon fa-2x fa-align-justify")
    .addClass("fa-solid fa-xmark");
  let boxWidth = $(".headerToClose").width();
  $("section").animate({ left: `0px` }, 500);
  $("li").slideDown(500);
}

function spinnerStart() {
  var content = `
        <div class="spinner">
          <div class="spinner-border" id="spinnerDiv"></div>
        </div>
  `;
  $(".displayContainer")[0].innerHTML = content;
}
function spinnerStop() {
  var content = `
        <div class="spinner">
          <div class="spinner-border d-none" id="spinnerDiv"></div>
        </div>
  `;
  $(".displayContainer")[0].innerHTML = content;
}

function displayError(err) {
  const errorElement = document.createElement("p");
  errorElement.innerHTML = err;
  errorElement.setAttribute("class", "bg-danger");
  $(".displayContainer").append(errorElement);
}

async function getAllMeals() {
  try {
    spinnerStart();
    const res = await fetch(BASE_API_All);
    if (!res.ok) {
      throw new Error("Error will load the data");
    }
    const data = await res.json();
    const meals = await data.meals;
    spinnerStop();
    displayMeals(meals);
  } catch (error) {
    console.log(error);

    displayError(error);
  } finally {
    closeHeader();
  }
}

function just20Item(largeArray) {
  var smallArray = [];
  if (largeArray.length > 21) {
    for (let i = 0; i < 20; i++) {
      smallArray.push(largeArray[i]);
    }
  } else {
    smallArray = largeArray;
  }
  return smallArray;
}

function displayMeals(Meals) {
  var someMeals = just20Item(Meals);
  var cartona = ``;
  someMeals.forEach((element) => {
    cartona += `
        <div  class="col-lg-3 col-md-6 col-sm-12 mt-4 cardContainer cursor-pointer">
            <div class="card" onClick="getMealById('${element.idMeal}')">
              <div class="imgContainer">
                <img class="w-100" src="${element.strMealThumb}" alt="" />
              </div>
              <div class="imgTitle cursor-pointer text-black">
                <span>${element.strMeal}</span>
              </div>
            </div>
          </div>
        `;
  });
  $(".displayContainer")[0].innerHTML = cartona;
  $(".cardContainer").on("click", (e) => {
    console.log(e.target.id);
  });
}

async function getMealById(id) {
  idNum = parseInt(id);
  console.log(idNum);
  try {
    spinnerStart();
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!res.ok) {
      throw new Error("Error will load the data");
    }
    const data = await res.json();
    const meals = await data.meals;
    const meal = await meals[0];
    spinnerStop();
    displayMealDesc(meal);
  } catch (error) {
    console.log(error);
    displayErrors(error);
  } finally {
  }
}

function displayMealDesc(meal) {
  var mealCon = `
   <div class="col-lg-4 ">
   <div class="imgCon text-light border-0">
     <img class="w-100" src="${meal.strMealThumb}" alt="" />
   </div>
   <p class="fs-2 fw-bold">${meal.strMeal}</p>
 </div>
 <div class="col-lg-8  text-light">
   <h1>Instructions</h1>
   <p>
     ${meal.strInstructions}
   </p>
   <p>Area : ${meal.strArea}</p>
   <p>Category : ${meal.strCategory}</p>
   <p>Recipes :</p>
   <div class="recipesContainer">
   
     <div class="alert alert-info d-inline mx-1 py-1" role="alert">
     ${meal.strIngredient1}
     </div>
   
     <div class="alert alert-info d-inline mx-1 py-1" role="alert">
     ${meal.strIngredient2}
     </div>
   
     <div class="alert alert-info d-inline mx-1 py-1" role="alert">
     ${meal.strIngredient3}
     </div>
   
     <div class="alert alert-info d-inline mx-1 py-1" role="alert">
     ${meal.strIngredient4}
     </div>
     
   </div>
   <p>Tags :</p>
   <div class="tags">
     <div class="alert alert-danger d-inline mx-1 py-1" role="alert">
     ${meal.strTags}
     </div>
   
   </div>
   <div class="p-3">
       <button type="button" class="btn btn-success"> 
            <a class="text-decoration-none" href="${meal.strSource}">Source</a>
       </button>
       <button type="button" class="btn btn-danger">
            <a class="text-decoration-none" href="${meal.strYoutube}">Youtube</a>
       </button>
   </div>
 </div>
   
   `;
  $(".displayContainer")[0].innerHTML = mealCon;
}

async function getAllCategories() {
  try {
    spinnerStart();
    const res = await fetch(category_API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const allCategories = data.categories;
    spinnerStop();
    displayAllCategories(allCategories);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    closeHeader();
  }
}

function displayAllCategories(Categories) {
  const allCategories = just20Item(Categories);
  cartona = ``;
  allCategories.forEach((category) => {
    let desc = "";
    if (category.strCategoryDescription.length > 50) {
      desc = category.strCategoryDescription.substring(0, 50);
    } else {
      desc = category.strCategoryDescription;
    }
    cartona += `
        <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
        <div onclick=getCategory('${category.strCategory}') class="card">
          <div class="imgContainer">
            <img class="w-100 bg-black" src="${category.strCategoryThumb}" alt="" />
          </div>
          <div class="imgTitle text-black">
            <div class="">${category.strCategory}</div> 
            <div class="fs-5 text-center text-muted fw-normal">${desc}</div> 
          </div>
        </div>
      </div>
        `;
  });
  $(".displayContainer")[0].innerHTML = cartona;
}

async function getCategory(name) {
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
  try {
    spinnerStart();
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const categoryMeals = data.meals;
    console.log(categoryMeals);
    spinnerStop();

    displayMeals(categoryMeals);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
  }
}

async function getAllAreas() {
  try {
    spinnerStart();
    const res = await fetch(Areas_API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const allAreas = data.meals;
    console.log(allAreas);
    spinnerStop();
    displayAreas(allAreas);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    closeHeader();
  }
}

function displayAreas(Areas) {
  const allAreas = just20Item(Areas);
  cartona = ``;
  allAreas.forEach((area) => {
    cartona += `
        <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
        <div onclick="getArea('${area.strArea}')" class="areaCard text-center fs-1">
          <div class="icon"><i class="fa-solid fa-globe"></i></div>
          <div class="text-light fw-bold">${area.strArea}</div>
        </div>
      </div>
        
        `;

    $(".displayContainer")[0].innerHTML = cartona;
  });
}

async function getArea(areaName) {
  let name = "";
  if (areaName.includes(" ")) {
    name = areaName.replace(" ", "_");
  } else {
    name = areaName;
  }
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`;
  try {
    spinnerStart();
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const areaMeals = data.meals;

    spinnerStop();

    displayMeals(areaMeals);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
  }
}

async function getAllIng() {
  try {
    spinnerStart();
    const res = await fetch(Ingrediant_API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const allIng = data.meals;
    spinnerStop();

    displIngredients(allIng);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
    closeHeader();
  }
}

async function getIng(ingName) {
  const API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`;
  try {
    spinnerStart();
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error("Error");
    }
    const data = await res.json();
    const ingMeals = data.meals;
    console.log(ingMeals);
    spinnerStop();
    displayMeals(ingMeals);
  } catch (error) {
    console.error(error);
    displayError(error);
  } finally {
  }
}

function displIngredients(Ingredients) {
  const allIngredients = just20Item(Ingredients);
  console.log(allIngredients.length);
  cartona = ``;
  allIngredients.forEach((ing) => {
    let desc = "";
    if (ing.strDescription.length > 50) {
      desc = ing.strDescription.substring(0, 50);
    } else {
      desc = ing.strDescription;
    }
    cartona += `
      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
      <div onclick="getIng('${ing.strIngredient}')" class="ingCard text-center fs-2">
        <div class="icon"><i class="fa-solid fa-utensils"></i></div>
        <div class="text-light fw-bold">${ing.strIngredient}</div>
        <div class="text-light fs-5">${desc}</div>
      </div>
    </div>
          
          `;

    $(".displayContainer")[0].innerHTML = cartona;
  });
}

function openSearchSection() {
  var content = `
  <div class="container w-75" id="searchContainer">
          <div class="row py-4 ">
              <div class="col-md-6 ">
                  <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
              </div>
              <div class="col-md-6">
                  <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
              </div>
          </div>
        </div>
        <div class="row " id="viewContainerSearch"></div>
  `;
  $(".displayContainer")[0].innerHTML = content;
  closeHeader();
}
function openContactUsSection() {
  var content = `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
            <div class="container w-75 text-center">
                <div class="row g-4">
                    <div class="col-md-6">
                        <input id="nameInput" onkeyup="inputsValidation(this)" type="text" class="form-control" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Special characters and numbers not allowed
                            <!-- ^[A-Za-z]*$ -->
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="emailInput" onkeyup="inputsValidation(this)" type="email" class="form-control " placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Email not valid *exemple@yyy.zzz 
                            <!-- ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ -->
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="phoneInput" onkeyup="inputsValidation(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid Phone Number
                            <!-- ^(?:\+20|0)(?:1\d{9}|[2-5]\d{7})$ -->
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="ageInput" onkeyup="inputsValidation(this)" type="number" class="form-control " placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid age
                            <!-- ^\d+$ -->
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="passwordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                            <!-- ^(?=.*[A-Za-z])(?=.*\d).{8,}$ -->
                        </div>
                    </div>
                    <div class="col-md-6">
                        <input id="repasswordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Repassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Enter valid repassword 
                        </div>
                    </div>
                </div>
                <button id="submitBtn" onclick ="submitContact()" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
            </div>
        </div>
  `;
  $(".displayContainer")[0].innerHTML = content;
  closeHeader();
}

async function searchByFLetter(name) {
  var API = "";
  const regex = /^[A-Za-z]$/;

  try {
    if (regex.test(name)) {
      API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
    } else {
      throw new Error("Error will This Input Ya User");
    }

    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Error will load the data");
    }
    const data = await res.json();
    const meals = await data.meals;
    displayMealsByFilter(meals);
  } catch (error) {
    console.log(error);
    displayError(error);
  } finally {
  }
}

async function searchByName(name) {
  var API = "";
  const regex = /^[A-Za-z]$/;

  try {
    if (regex.test(name)) {
      let rigthName = name;
      API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${rigthName}`;
    } else {
      throw new Error("Error will This Input Ya User");
    }

    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Error will load the data");
    }

    const data = await res.json();
    const meals = await data.meals;

    displayMealsByFilter(meals);
    console.log(meals);

    // console.log(meals[0]);
  } catch (error) {
    console.log(error);
    displayError(error);
  } finally {
  }
}

function displayMealsByFilter(Meals) {
  var someMeals = just20Item(Meals);
  var cartona = ``;
  someMeals.forEach((element) => {
    cartona += `
        <div  class="col-lg-3 col-md-6 col-sm-12 mt-4 cardContainer cursor-pointer">
            <div class="card" onClick="getMealById('${element.idMeal}')">
              <div class="imgContainer">
                <img class="w-100" src="${element.strMealThumb}" alt="" />
              </div>
              <div class="imgTitle cursor-pointer text-black">
                <span>${element.strMeal}</span>
              </div>
            </div>
          </div>
        `;
  });
  $("#viewContainerSearch")[0].innerHTML = cartona;
}

var nameInputStatus = false;
var emailInputStatus = false;
var phoneInputStatus = false;
var ageInputStatus = false;
var passwordInputStatus = false;
var repasswordInputStatus = false;

function inputsValidation(inputValue) {
  switch (inputValue.id) {
    case "nameInput":
      let nameInputRegex = /^[A-Za-z]*$/;
      if (nameInputRegex.test(inputValue.value)) {
        nameInputStatus = true;
        $("#nameAlert").addClass("d-none");
      } else {
        nameInputStatus = false;
        $("#nameAlert").removeClass("d-none");
      }
      break;
    case "emailInput":
      let emailInput = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailInput.test(inputValue.value)) {
        emailInputStatus = true;
        $("#emailAlert").addClass("d-none");
      } else {
        emailInputStatus = false;
        $("#emailAlert").removeClass("d-none");
      }

      break;
    case "phoneInput":
      let phoneInput = /^(?:\+20|0)(?:1\d{9}|[2-5]\d{7})$/;
      if (phoneInput.test(inputValue.value)) {
        $("#phoneAlert").addClass("d-none");
        phoneInputStatus = true;
      } else {
        phoneInputStatus = false;
        $("#phoneAlert").removeClass("d-none");
      }

      break;
    case "ageInput":
      if (inputValue.value > 0 && inputValue.value < 100) {
        ageInputStatus = true;
        $("#ageAlert").addClass("d-none");
      } else {
        ageInputStatus = false;
        $("#ageAlert").removeClass("d-none");
      }

      break;
    case "passwordInput":
      let passwordInput = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      if (passwordInput.test(inputValue.value)) {
        passwordInputStatus = true;
        $("#passwordAlert").addClass("d-none");
      } else {
        passwordInputStatus = false;
        $("#passwordAlert").removeClass("d-none");
      }

      break;
    case "repasswordInput":
      if (inputValue.value == $("#passwordInput").val()) {
        repasswordInputStatus = true;
        $("#repasswordAlert").addClass("d-none");
      } else {
        repasswordInputStatus = false;
        $("#repasswordAlert").removeClass("d-none");
      }

      break;

    default:
      console.log("error");
      break;
  }

  // console.log(
  //   nameInputStatus &&
  //     emailInputStatus &&
  //     phoneInputStatus &&
  //     ageInputStatus &&
  //     passwordInputStatus &&
  //     repasswordInputStatus
  // );
}

function showSubmit() {
  if (
    nameInputStatus &&
    emailInputStatus &&
    phoneInputStatus &&
    ageInputStatus &&
    passwordInputStatus &&
    repasswordInputStatus
  ) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", "");
  }
}

function submitContact() {
  $("#nameInput").val("");
  $("#emailInput").val("");
  $("#phoneInput").val("");
  $("#ageInput").val("");
  $("#passwordInput").val("");
  $("#repasswordInput").val("");
  nameInputStatus = false;
  emailInputStatus = false;
  phoneInputStatus = false;
  ageInputStatus = false;
  passwordInputStatus = false;
  repasswordInputStatus = false;
}
setInterval(showSubmit, 500);
